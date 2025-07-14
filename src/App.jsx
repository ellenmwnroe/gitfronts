import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, UploadCloud, Files, FileText, Users, Cog, LogOut, ChevronDown, Loader2, FileCheck2, AlertCircle, CheckCircle, XCircle, Clock, Download, PlusCircle, FileSignature } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import logo from './assets/docsyfundoclaro.png'; 
import favicon from './assets/docsyfavicon.png'; 
import logoCliente from './assets/logocliente.png'; 

// --- estilos  ---
const styles = {
  // geral
  body: { fontFamily: "'Inter', sans-serif", backgroundColor: '#F7F8FC', color: '#070034' },
  // página de login
  loginContainer: { fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#F3F4F6' },
  loginBox: { width: '100%', maxWidth: '400px', padding: '40px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' },
  logoImg: { height: '100px', margin: '0 auto', display: 'block' },
  form: { marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' },
  inputLabel: { fontSize: '0.875rem', fontWeight: '500', color: '#070034' },
  input: { boxSizing: 'border-box', marginTop: '4px', display: 'block', width: '100%', padding: '12px 16px', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB', borderRadius: '8px', color: '#111827', transition: 'all 0.2s', fontFamily: "'Inter', sans-serif" },
  button: { marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', border: '1px solid transparent', fontSize: '0.875rem', fontWeight: '600', borderRadius: '8px', color: 'white', backgroundColor: '#070034', cursor: 'pointer', transition: 'background-color 0.2s', fontFamily: "'Inter', sans-serif" },
  // layout principal
  mainLayout: { display: 'flex', height: '100vh', backgroundColor: '#F7F8FC' },
  sidebar: { width: '256px', backgroundColor: 'white', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px', padding: '16px', borderBottom: '1px solid #E5E7EB', paddingTop: '50px', paddingBottom: '30px' },
  sidebarLogo: { maxHeight: '100%', maxWidth: '100%' },
  nav: { flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' },
  navItem: (isActive) => ({
    display: 'flex', alignItems: 'center', padding: '12px 16px', fontSize: '0.875rem', fontWeight: '500', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s',
    backgroundColor: isActive ? 'rgba(255, 189, 89, 0.2)' : 'transparent',
    color: isActive ? '#070034' : '#4B5563',
    cursor: 'pointer'
  }),
  mainContent: { flex: 1, overflowY: 'auto', padding: '32px' },
  // perfil do usuário
  profileWrapper: { padding: '16px', borderTop: '1px solid #E5E7EB', position: 'relative' },
  profileContainer: { display: 'flex', alignItems: 'center', padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s' },
  profileAvatar: { height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' },
  profileInfo: { marginLeft: '12px', flex: 1 },
  profileName: { fontSize: '0.875rem', fontWeight: '600', color: '#070034', margin: 0, lineHeight: 1.2 },
  profileRole: { fontSize: '0.75rem', color: '#6B7280', margin: 0, lineHeight: 1.2 },
  profileChevron: { color: '#6B7280', transition: 'transform 0.2s' },
  profileDropdown: { position: 'absolute', bottom: '100%', left: '16px', right: '16px', marginBottom: '8px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', padding: '8px 0', zIndex: 10 },
  profileDropdownItem: { display: 'flex', alignItems: 'center', padding: '8px 16px', fontSize: '0.875rem', color: '#374151', textDecoration: 'none' },
  profileDropdownItemDanger: { color: '#DC2626' },
  // dashboard
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' },
  pageTitle: { fontSize: '1.875rem', fontWeight: 'bold', color: '#070034', marginTop: '5px', margin: 0, lineHeight: 1.5 },
  pageSubtitle: { marginTop: '4px', color: '#4B5563', margin: 0, lineHeight: 1.5 },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '32px' },
  kpiCard: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)', transition: 'all 0.2s' },
  kpiTitle: { fontSize: '0.875rem', fontWeight: '500', color: '#6B7280' },
  kpiValue: { fontSize: '1.875rem', fontWeight: 'bold', color: '#070034', marginTop: '8px' },
  kpiChange: (type) => ({ fontSize: '0.75rem', marginTop: '8px', display: 'flex', alignItems: 'center', color: type === 'increase' ? '#059669' : '#DC2626' }),
  // tabela de análise e casos
  tableWrapper: { width: '100%', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', textAlign: 'left', fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' },
  td: { padding: '12px 16px', fontSize: '0.875rem', borderBottom: '1px solid #E5E7EB' },
  // página de upload
  uploadOptions: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '16px' },
  checkboxContainer: { display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '30px' },
  dropzone: { border: '2px dashed #D1D5DB', borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer', backgroundColor: 'white', transition: 'all 0.2s' },
  fileListContainer: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB', marginTop: '32px' },
  fileListItem: { padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  progressBar: (progress, status) => ({
    base: { marginTop: '8px', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '99px', overflow: 'hidden' },
    children: { height: '100%', borderRadius: '99px', transition: 'all 0.3s', width: `${progress}%`, backgroundColor: status === 'uploading' ? '#3B82F6' : '#8B5CF6' }
  }),
};

// --- dados fakes/mock ---
const mockCases = [
    { id: 1, nome: "Silva vs. Empresa X", cliente: "João da Silva", status: "Em Análise", logo: logoCliente, contracheques: 15, ultimaAtividade: "2024-07-12" },
    { id: 2, nome: "Pereira & Filhos", cliente: "Maria Pereira", status: "Concluído", logo: "https://placehold.co/60x60/070034/ffbd59?text=P", contracheques: 32, ultimaAtividade: "2024-07-10" },
    { id: 3, nome: "Costa Ltda", cliente: "Carlos Costa", status: "Aguardando Documentos", logo: "https://placehold.co/60x60/ffbd59/070034?text=C", contracheques: 5, ultimaAtividade: "2024-07-11" },
];
const mockAnalysisData = [
    { mes: 'Jan/24', salarioBase: 4500, horasExtras: 850, adicionalNoturno: 320, inss: 512.50, irrf: 289.70, liquido: 4717.80, inconsistencia: false },
    { mes: 'Fev/24', salarioBase: 4500, horasExtras: 720, adicionalNoturno: 280, inss: 512.50, irrf: 260.10, liquido: 4617.40, inconsistencia: false },
    { mes: 'Mar/24', salarioBase: 4800, horasExtras: 950, adicionalNoturno: 410, inss: 540.00, irrf: 320.50, liquido: 5179.50, inconsistencia: true },
    { mes: 'Abr/24', salarioBase: 4800, horasExtras: 800, adicionalNoturno: 350, inss: 540.00, irrf: 295.30, liquido: 5004.70, inconsistencia: false },
];
const mockTemplates = [
    { id: 1, nome: "Petição Inicial (Rito Ordinário)", categoria: "Trabalhista", descricao: "Modelo padrão para ajuizamento de ações trabalhistas." },
    { id: 2, nome: "Recurso Ordinário", categoria: "Trabalhista", descricao: "Para recorrer de sentenças da Vara do Trabalho." },
    { id: 3, nome: "Notificação Extrajudicial", categoria: "Cível", descricao: "Para cobrança ou comunicação formal antes do processo." },
];
const mockCasosTrabalhadores = [
    { 
        id: 1, 
        nome: "Silva vs. Empresa X",
        trabalhadores: [
            { id: 101, nome: "João da Silva" },
            { id: 102, nome: "Pedro Martins" },
        ]
    },
    { 
        id: 2, 
        nome: "Pereira & Filhos",
        trabalhadores: [
            { id: 201, nome: "Maria Pereira" },
        ]
    },
];

// dados de contracheque para cada trabalhador (a chave é o ID do trabalhador)
const mockDadosPorTrabalhador = {
    101: [ // dados do joão da silva
        { mes: 'Jan/24', salarioBase: 4500, horasExtras: 850, adicionalNoturno: 320, inss: 512.50, irrf: 289.70, liquido: 4717.80, inconsistencia: false },
        { mes: 'Fev/24', salarioBase: 4500, horasExtras: 720, adicionalNoturno: 280, inss: 512.50, irrf: 260.10, liquido: 4617.40, inconsistencia: false },
        { mes: 'Mar/24', salarioBase: 4800, horasExtras: 950, adicionalNoturno: 410, inss: 540.00, irrf: 320.50, liquido: 5179.50, inconsistencia: true },
        { mes: 'Abr/24', salarioBase: 4800, horasExtras: 800, adicionalNoturno: 350, inss: 540.00, irrf: 295.30, liquido: 5004.70, inconsistencia: false },
    ],
    102: [ // dados do pedro martins
        { mes: 'Jan/24', salarioBase: 3200, horasExtras: 150, adicionalNoturno: 0, inss: 310.00, irrf: 150.50, liquido: 2889.50, inconsistencia: false },
        { mes: 'Fev/24', salarioBase: 3200, horasExtras: 200, adicionalNoturno: 0, inss: 310.00, irrf: 165.00, liquido: 2925.00, inconsistencia: false },
    ],
    201: [ // dados da maria pereira
        { mes: 'Mai/24', salarioBase: 6000, horasExtras: 1200, adicionalNoturno: 500, inss: 713.10, irrf: 869.55, liquido: 6117.35, inconsistencia: false },
    ],
};
const dashboardData = { kpis: [ { title: "Casos Ativos", value: "12", change: "+5.2%", changeType: "increase" }, { title: "Documentos Pendentes", value: "8", change: "+10%", changeType: "increase" }, { title: "Peças Geradas (Mês)", value: "73", change: "-1.5%", changeType: "decrease" }, { title: "Precisão da Extração", value: "98.7%", change: "+0.2%", changeType: "increase" }, ], activityChart: [ { name: 'Jan', "Documentos Processados": 400, "Peças Geradas": 240 }, { name: 'Fev', "Documentos Processados": 300, "Peças Geradas": 139 }, { name: 'Mar', "Documentos Processados": 200, "Peças Geradas": 980 }, { name: 'Abr', "Documentos Processados": 278, "Peças Geradas": 390 }, { name: 'Mai', "Documentos Processados": 189, "Peças Geradas": 480 }, { name: 'Jun', "Documentos Processados": 239, "Peças Geradas": 380 }, ], recentActivities: [ { id: 1, user: "Dr.ª Ana Silva", action: "fez upload de 15 contracheques para o caso 'Silva vs. Empresa X'.", time: "5 min atrás", status: "processing" }, { id: 2, user: "Sistema", action: "concluiu a extração de dados do caso 'Pereira & Filhos'.", time: "28 min atrás", status: "completed" }, { id: 3, user: "Dr. Carlos Mendes", action: "gerou a petição inicial para o caso 'Costa Ltda'.", time: "1 hora atrás", status: "completed" }, { id: 4, user: "Sistema", action: "identificou uma inconsistência no contracheque de 'João Alves'.", time: "2 horas atrás", status: "attention" }, { id: 5, user: "Dr.ª Ana Silva", action: "revisou e validou os dados do caso 'Souza & Cia'.", time: "4 horas atrás", status: "completed" }, ], };
const mockExtractedData = { "Nome": "João da Silva Pereira", "CPF": "123.456.789-00", "Endereço": "Rua das Flores, 123, São Paulo - SP", "Cargo": "Analista Financeiro", "Sindicato": "Sindicato dos Comerciários", "Data": "31/05/2024", "Período de Referência": "05/2024", "Salário Base": "R$ 4.500,00", "Horas Extras (100%)": "R$ 850,00", "Adicional Noturno": "R$ 320,00", "INSS": "R$ 512,50", "IRRF": "R$ 289,70", "Vale Transporte": "R$ 150,00", "Total Líquido": "R$ 4.717,80", };
const mockGeneratedDocument = ` EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA VARA DO TRABALHO DE SÃO PAULO - SP Processo nº: [Número do Processo] Reclamante: João da Silva Pereira CPF: 123.456.789-00 Endereço: Rua das Flores, 123, São Paulo - SP Reclamada: [Nome da Empresa] CNPJ: [CNPJ da Empresa] Endereço: [Endereço da Empresa] PETIÇÃO INICIAL João da Silva Pereira, já qualificado nos autos, por seu advogado que esta subscreve, vem, respeitosamente, à presença de Vossa Excelência, com fundamento nos artigos 840 da CLT e 319 do CPC, propor a presente RECLAMAÇÃO TRABALHISTA em face de [Nome da Empresa], pelos fatos e fundamentos a seguir expostos. I - DOS FATOS O Reclamante foi admitido pela Reclamada em [Data de Admissão] para exercer a função de Analista Financeiro, percebendo como último salário base o valor de R$ 4.500,00, conforme contracheque de referência 05/2024 em anexo. Durante o pacto laboral, o Reclamante realizou horas extras habituais que não foram devidamente quitadas, bem como o adicional noturno correspondente. II - DO DIREITO Com base nos documentos apresentados, verifica-se a existência de diferenças a serem pagas a título de horas extras, com adicional de 100%, no valor de R$ 850,00, e adicional noturno no valor de R$ 320,00, apenas no mês de referência. (...) III - DOS PEDIDOS Diante do exposto, requer: a) A citação da Reclamada para, querendo, apresentar defesa, sob pena de revelia e confissão; b) A procedência da presente reclamação para condenar a Reclamada ao pagamento das verbas rescisórias e diferenças salariais apontadas; c) A condenação da Reclamada ao pagamento de honorários advocatícios. Dá-se à causa o valor de [Valor da Causa]. Nestes termos, Pede deferimento. São Paulo, [Data Atual]. [Nome do Advogado] OAB/[UF] [Número da OAB] `;

// --- componentes de ui ---
const StatusIcon = ({ status }) => {
    const icons = {
        processing: <Loader2 size={20} color="#3B82F6" className="animate-spin" />,
        completed: <CheckCircle size={20} color="#10B981" />,
        attention: <AlertCircle size={20} color="#F59E0B" />,
        error: <XCircle size={20} color="#EF4444" />,
    };
    return icons[status] || <Clock size={20} color="#6B7280" />;
};

const LoginPage = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = (e) => { e.preventDefault(); setIsLoading(true); setTimeout(() => { setIsLoading(false); onLogin(); }, 1500); };
  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <img src={logo} alt="Logo da Docsy" style={styles.logoImg} />
        <form style={styles.form} onSubmit={handleLogin}>
          <div>
            <label htmlFor="email-address" style={styles.inputLabel}>E-mail</label>
            <input id="email-address" name="email" type="email" required defaultValue="advogado@email.com" style={styles.input} />
          </div>
          <div>
            <label htmlFor="password" style={styles.inputLabel}>Senha</label>
            <input id="password" name="password" type="password" required defaultValue="********" style={styles.input} />
          </div>
          <button type="submit" disabled={isLoading} style={{...styles.button, opacity: isLoading ? 0.7 : 1}}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

const MainLayout = ({ children, currentPage, onNavigate, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const NavItem = ({ icon: Icon, label, page }) => {
    const isActive = currentPage === page;
    return (
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(page); }} style={styles.navItem(isActive)}>
        <Icon size={20} style={{ marginRight: '12px', color: isActive ? '#070034' : '#6B7280' }} />
        <span>{label}</span>
      </a>
    );
  };
  return (
    <div style={styles.mainLayout}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logo} alt="Logo da Docsy" style={styles.sidebarLogo} />
         </a>  
        </div>
        <nav style={styles.nav}>
          <NavItem icon={LayoutDashboard} label="Dashboard" page="dashboard" />
          <NavItem icon={UploadCloud} label="Upload de Documentos" page="upload" />
          <NavItem icon={Files} label="Casos e Documentos" page="cases" />
          <NavItem icon={FileText} label="Templates de Peças" page="templates" />
          <NavItem icon={Users} label="Equipe" page="team" />
          <NavItem icon={Cog} label="Configurações" page="settings" />
        </nav>
        <div style={styles.profileWrapper}>
            <div 
                style={styles.profileContainer} 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
                <img style={styles.profileAvatar} src={`https://placehold.co/100x100/ffbd59/070034?text=A`} alt="Avatar do utilizador" />
                <div style={styles.profileInfo}>
                    <p style={styles.profileName}>Ana Silva</p>
                    <p style={styles.profileRole}>Advogada Senior</p>
                </div>
                <ChevronDown size={20} style={{...styles.profileChevron, transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)'}} />
            </div>
            {isProfileOpen && (
                <div style={styles.profileDropdown}>
                    <a href="#" style={styles.profileDropdownItem}>Meu Perfil</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} style={{...styles.profileDropdownItem, ...styles.profileDropdownItemDanger}}>
                        <LogOut size={16} style={{ marginRight: '8px' }} /> Sair
                    </a>
                </div>
            )}
        </div>
      </div>
      <main style={styles.mainContent}>{children}</main>
    </div>
  );
};

const DashboardPage = () => {
  const [selectedCasoId, setSelectedCasoId] = useState(mockCasosTrabalhadores[0].id);
    const [selectedTrabalhadorId, setSelectedTrabalhadorId] = useState('');
    const [trabalhadoresDoCaso, setTrabalhadoresDoCaso] = useState([]);
    const [dadosAnalise, setDadosAnalise] = useState([]); 

  // este hook atualiza a lista de trabalhadores quando um caso é selecionado
    useEffect(() => {
        const caso = mockCasosTrabalhadores.find(c => c.id === Number(selectedCasoId));
        if (caso) {
            setTrabalhadoresDoCaso(caso.trabalhadores);
            setSelectedTrabalhadorId(''); // limpa a seleção anterior de trabalhador
            setDadosAnalise([]); // limpa a tabela de análise
        }
    }, [selectedCasoId]);

    // este hook carrega os dados de análise quando um trabalhador é selecionado
    useEffect(() => {
        if (selectedTrabalhadorId) {
            setDadosAnalise(mockDadosPorTrabalhador[selectedTrabalhadorId] || []);
        } else {
            setDadosAnalise([]); // limpa a tabela se nenhum trabalhador for selecionado
        }
    }, [selectedTrabalhadorId]);  

  const clienteAtual = {
        nome: "Lobo De Azevedo Advogados",
        logo: logoCliente,
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
                <img src={clienteAtual.logo} alt={`Logo de ${clienteAtual.nome}`} style={{height: '60px', borderRadius: '8px'}} />
                <div>
                    <h2 style={styles.pageTitle}>Dashboard - {clienteAtual.nome}</h2>
                    <p style={styles.pageSubtitle}>Visão geral do cliente e atividades recentes.</p>
                </div>
            </div>
            <div style={styles.kpiGrid}>
            {dashboardData.kpis.map((kpi, index) => (
                <div key={index} style={styles.kpiCard}>
                <h3 style={styles.kpiTitle}>{kpi.title}</h3>
                <p style={styles.kpiValue}>{kpi.value}</p>
                <p style={styles.kpiChange(kpi.changeType)}>{kpi.change} em relação ao mês anterior</p>
                </div>
            ))}
            </div>
            <div style={styles.kpiCard}>
                <h3 style={{...styles.kpiTitle, fontSize: '1.125rem', fontWeight: '600', color: '#070034', marginBottom: '16px'}}>Análise Comparativa de Contracheques</h3>
                {/* selects para caso e trabalhador */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px'}}>
                    <div>
                        <label htmlFor="caso-select" style={styles.inputLabel}>Selecione o Caso</label>
                        <select 
                            id="caso-select"
                            style={styles.input}
                            value={selectedCasoId}
                            onChange={(e) => setSelectedCasoId(e.target.value)}
                        >
                            {mockCasosTrabalhadores.map(c => (
                                <option key={c.id} value={c.id}>{c.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="trabalhador-select" style={styles.inputLabel}>Selecione o Trabalhador</label>
                        <select 
                            id="trabalhador-select"
                            style={styles.input}
                            value={selectedTrabalhadorId}
                            onChange={(e) => setSelectedTrabalhadorId(e.target.value)}
                            disabled={trabalhadoresDoCaso.length === 0}
                        >
                            <option value=""> Escolha um trabalhador </option>
                            {trabalhadoresDoCaso.map(t => (
                                <option key={t.id} value={t.id}>{t.nome}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {selectedTrabalhadorId ? (
    <div style={styles.tableWrapper}>
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Mês</th>
                    <th style={styles.th}>Salário Base</th>
                    <th style={styles.th}>Horas Extras</th>
                    <th style={styles.th}>Adic. Noturno</th>
                    <th style={styles.th}>INSS</th>
                    <th style={styles.th}>IRRF</th>
                    <th style={styles.th}>Total Líquido</th>
                    <th style={styles.th}>Alerta</th>
                </tr>
            </thead>
            <tbody>
                {dadosAnalise.map(d => (
                    <tr key={d.mes} style={{backgroundColor: d.inconsistencia ? 'rgba(255, 189, 89, 0.1)' : 'transparent'}}>
                        <td style={styles.td}>{d.mes}</td>
                        <td style={styles.td}>R$ {d.salarioBase.toFixed(2)}</td>
                        <td style={styles.td}>R$ {d.horasExtras.toFixed(2)}</td>
                        <td style={styles.td}>R$ {d.adicionalNoturno.toFixed(2)}</td>
                        <td style={styles.td}>R$ {d.inss.toFixed(2)}</td>
                        <td style={styles.td}>R$ {d.irrf.toFixed(2)}</td>
                        <td style={{...styles.td, fontWeight: '600'}}>R$ {d.liquido.toFixed(2)}</td>
                        <td style={styles.td}>{d.inconsistencia && <AlertCircle size={20} color="#F59E0B" />}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
) : (
    <p style={{...styles.pageSubtitle, textAlign: 'center'}}>Selecione um caso e um trabalhador para ver a análise.</p>
)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                <div style={styles.kpiCard}>
                    <h3 style={{...styles.kpiTitle, fontSize: '1.125rem', fontWeight: '600', color: '#070034'}}>Atividade Mensal</h3>
                    <div style={{ width: '100%', height: 300, marginTop: '16px' }}>
                        <ResponsiveContainer>
                            <BarChart data={dashboardData.activityChart}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} />
                                <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
                                <Bar dataKey="Documentos Processados" fill="#ffbd59" name="Documentos Processados" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Peças Geradas" fill="#2c4e88ff" name="Peças Geradas" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div style={styles.kpiCard}>
                    <h3 style={{...styles.kpiTitle, fontSize: '1.125rem', fontWeight: '600', color: '#070034'}}>Atividades Recentes</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dashboardData.recentActivities.map(activity => (
                            <li key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div><StatusIcon status={activity.status} /></div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: '#070034' }}><span style={{fontWeight: '600'}}>{activity.user}</span> {activity.action}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>{activity.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const CaseListPage = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={styles.pageHeader}>
            <div>
                <h2 style={styles.pageTitle}>Casos e Documentos</h2>
                <p style={styles.pageSubtitle}>Gerencie todos os seus casos em um só lugar.</p>
            </div>
            <button style={styles.button}><PlusCircle size={16} style={{marginRight: '8px'}}/> Novo Caso</button>
        </div>
        <div style={{...styles.kpiCard, padding: 0}}>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Nome do Caso</th>
                            <th style={styles.th}>Cliente</th>
                            <th style={styles.th}>Contracheques</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Última Atividade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockCases.map(c => (
                            <tr key={c.id} style={{cursor: 'pointer'}}>
                                <td style={styles.td}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                        <img src={c.logo} alt={`Logo de ${c.cliente}`} style={{height: '40px', width: '40px', borderRadius: '8px', objectFit: 'cover'}} />
                                        <span style={{fontWeight: '600'}}>{c.nome}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>{c.cliente}</td>
                                <td style={styles.td}>{c.contracheques}</td>
                                <td style={styles.td}>{c.status}</td>
                                <td style={styles.td}>{c.ultimaAtividade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const TemplateLibraryPage = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
            <h2 style={styles.pageTitle}>Biblioteca de Templates</h2>
            <p style={styles.pageSubtitle}>Escolha um modelo para gerar sua peça processual.</p>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
            {mockTemplates.map(t => (
                <div key={t.id} style={{...styles.kpiCard, cursor: 'pointer'}}>
                    <FileSignature size={24} style={{color: '#ffbd59', marginBottom: '16px'}}/>
                    <h3 style={{...styles.pageTitle, fontSize: '1.125rem'}}>{t.nome}</h3>
                    <p style={{...styles.pageSubtitle, fontSize: '0.875rem'}}>{t.descricao}</p>
                </div>
            ))}
        </div>
    </div>
);

const UploadPage = ({ onUploadComplete }) => {
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedCase, setSelectedCase] = useState(mockCases[0].id);
    const [useOcr, setUseOcr] = useState(false);
    const fileInputRef = useRef(null);
    const addFiles = (newFiles) => { const filesWithStatus = Array.from(newFiles).filter(file => file.type === 'application/pdf' || file.type.startsWith('image/')).map(file => ({ file, id: `${file.name}-${file.lastModified}-${Math.random()}`, status: 'pending', progress: 0, processed: false })); setFiles(prev => [...prev, ...filesWithStatus]); };
    const handleRemoveFile = (fileId) => setFiles(prev => prev.filter(f => f.id !== fileId));
    const handleUpload = () => {
        console.log(`Iniciando upload para o caso ID: ${selectedCase}. OCR ativado: ${useOcr}`);
        const filesToProcess = files.filter(f => f.status === 'pending');
        if (filesToProcess.length === 0) return;
        setIsUploading(true);
        setFiles(prev => prev.map(f => (f.status === 'pending' ? { ...f, status: 'uploading' } : f)));
    };
    useEffect(() => { const uploadingFiles = files.filter(f => f.status === 'uploading'); if (uploadingFiles.length === 0) return; const interval = setInterval(() => { setFiles(prev => prev.map(f => { if (f.status === 'uploading') { const newProgress = f.progress + Math.random() * 25; if (newProgress >= 100) return { ...f, progress: 100, status: 'processing' }; return { ...f, progress: newProgress }; } return f; })); }, 200); return () => clearInterval(interval); }, [files.filter(f => f.status === 'uploading').length]);
    useEffect(() => { const filesToProcess = files.filter(f => f.status === 'processing' && !f.processed); if (filesToProcess.length === 0) return; filesToProcess.forEach(file => { setFiles(prev => prev.map(f => f.id === file.id ? {...f, processed: true} : f)); setTimeout(() => { setFiles(prev => { const finalFiles = prev.map(f => f.id === file.id ? { ...f, status: Math.random() > 0.1 ? 'completed' : 'error' } : f); const stillProcessing = finalFiles.some(f => ['uploading', 'processing'].includes(f.status)); if (!stillProcessing) setIsUploading(false); return finalFiles; }); }, 1500 + Math.random() * 1500); }); }, [files]);
    const getFileStatusUI = (status) => { const statusStyles = { pending: {c: "#6B7280", bg: "#F3F4F6"}, uploading: {c: "#2563EB", bg: "#DBEAFE"}, processing: {c: "#7C3AED", bg: "#EDE9FE"}, completed: {c: "#059669", bg: "#D1FAE5"}, error: {c: "#DC2626", bg: "#FEE2E2"} }; const text = { pending: "Aguardando", uploading: "A enviar...", processing: "A processar...", completed: "Concluído", error: "Erro" }; return <span style={{fontSize: '0.75rem', fontWeight: '500', padding: '4px 10px', borderRadius: '99px', color: statusStyles[status].c, backgroundColor: statusStyles[status].bg }}>{text[status]}</span>; };
    const allCompleted = files.length > 0 && files.every(f => f.status === 'completed' || f.status === 'error');
    const hasPending = files.some(f => f.status === 'pending');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div><h2 style={styles.pageTitle}>Upload de Contracheques</h2><p style={styles.pageSubtitle}>Selecione o caso, as opções de processamento e envie os documentos.</p></div>
            
            <div style={styles.uploadOptions}>
                <div>
                    <label htmlFor="case-select" style={styles.inputLabel}>Associar a um caso existente</label>
                    <select 
                        id="case-select" 
                        style={styles.input} 
                        value={selectedCase} 
                        onChange={(e) => setSelectedCase(e.target.value)}
                    >
                        {mockCases.map(c => (
                            <option key={c.id} value={c.id}>{c.nome}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={styles.dropzone} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }} onClick={() => fileInputRef.current.click()}>
                <input type="file" ref={fileInputRef} onChange={(e) => addFiles(e.target.files)} style={{display: 'none'}} multiple accept="application/pdf,image/*" />
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#6B7280'}}><UploadCloud size={48} style={{marginBottom: '16px'}} /><span style={{fontWeight: '600'}}>Clique para selecionar ou arraste e solte</span><span style={{fontSize: '0.875rem'}}>PDF ou Imagens (JPG, PNG)</span></div>
                <div style={styles.checkboxContainer} onClick={(e) => e.stopPropagation()}>
                    <input 
                        type="checkbox" 
                        id="ocr-checkbox" 
                        checked={useOcr} 
                        onChange={(e) => setUseOcr(e.target.checked)}
                    />
                    <label htmlFor="ocr-checkbox" style={{...styles.inputLabel, cursor: 'pointer'} }>Marque se o documento for uma imagem ou PDF escaneado</label>
                </div>
            </div>

            {files.length > 0 && (
                <div style={styles.fileListContainer}>
                    <h3 style={{...styles.kpiTitle, fontSize: '1.125rem', fontWeight: '600', color: '#070034', marginBottom: '16px'}}>Fila de Processamento</h3>
                    <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px'}}>
                        {files.map(f => (
                            <li key={f.id} style={{...styles.fileListItem, flexDirection: 'column', alignItems: 'stretch'}}>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden'}}><FileCheck2 size={24} color="#457B9D" /><p style={{fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{f.file.name}</p></div>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0}}><p style={{fontSize: '0.875rem', color: '#6B7280'}}>{Math.round(f.file.size / 1024)} KB</p>{getFileStatusUI(f.status)}{f.status === 'pending' && (<button onClick={() => handleRemoveFile(f.id)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF'}}><XCircle size={20} /></button>)}</div>
                                </div>
                                {(f.status === 'uploading' || f.status === 'processing') && (<div style={styles.progressBar(0).base}><div style={styles.progressBar(f.progress, f.status).children}></div></div>)}
                            </li>
                        ))}
                    </ul>
                    <div style={{marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '16px'}}>
                        {hasPending && !isUploading && (<button onClick={handleUpload} style={styles.button}>Iniciar Processamento</button>)}
                        {allCompleted && (<button onClick={onUploadComplete} style={{...styles.button, backgroundColor: '#10B981'}}>Validar Dados Extraídos</button>)}
                    </div>
                </div>
            )}
        </div>
    );
};

const PreviewPage = ({ onFinish }) => {
    const [isGenerating, setIsGenerating] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const editorRef = useRef(null);
    useEffect(() => { const timer = setTimeout(() => setIsGenerating(false), 1500); return () => clearTimeout(timer); }, []);
    
    const handleDownload = () => {
        setIsDownloading(true);
        const textContent = editorRef.current.value;
        const paragraphs = textContent.split('\n').map(text => new Paragraph({ children: [new TextRun(text)] }));
        const doc = new Document({ sections: [{ children: paragraphs }] });
        Packer.toBlob(doc).then(blob => { 
            saveAs(blob, "peticao.docx"); 
            setIsDownloading(false); 
        }).catch(err => { 
            console.error(err); 
            setIsDownloading(false); 
        });
    };

    if (isGenerating) { return ( <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh'}}><Loader2 size={48} className="animate-spin" style={{color: '#070034'}} /><h2 style={{...styles.pageTitle, marginTop: '24px'}}>A Gerar Peça Processual...</h2></div> ); }
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div><h2 style={styles.pageTitle}>Pré-visualização da Peça</h2><p style={styles.pageSubtitle}>Reveja o documento gerado.</p></div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                        onClick={handleDownload} 
                        disabled={isDownloading} 
                        style={{
                            ...styles.button, 
                            backgroundColor: '#4B5563', 
                            opacity: isDownloading ? 0.5 : 1,
                            cursor: isDownloading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isDownloading ? <Loader2 size={16} className="animate-spin" style={{marginRight: '8px'}} /> : <Download size={16} style={{marginRight: '8px'}} />}
                        {isDownloading ? "A Baixar..." : "Baixar como .DOCX"}
                    </button>
                    <button onClick={onFinish} style={styles.button}>Finalizar</button>
                </div>
            </div>
            <div style={styles.kpiCard}>
                <textarea ref={editorRef} defaultValue={mockGeneratedDocument} style={{width: '100%', height: '70vh', border: 'none', outline: 'none', resize: 'none', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: 1.6, color: '#070034'}} />
            </div>
        </div>
    );
};

const PlaceholderPage = ({ title }) => ( <div><h2 style={styles.pageTitle}>{title}</h2><div style={{...styles.kpiCard, marginTop: '32px', textAlign: 'center'}}><h3 style={{...styles.kpiTitle, fontSize: '1.25rem'}}>Página em Construção</h3><p style={styles.pageSubtitle}>Esta funcionalidade estará disponível em breve.</p></div></div> );

const ValidationPage = ({ onBack, onGenerate }) => {
    const [data, setData] = useState(mockExtractedData);
    const [selectedTemplate, setSelectedTemplate] = useState(mockTemplates[0].id);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h2 style={styles.pageTitle}>Validação de Dados</h2>
                <p style={styles.pageSubtitle}>Confirme ou ajuste os dados extraídos do contracheque.</p>
            </div>
            
            <div style={{...styles.kpiCard, marginTop: '0px'}}>
              <h3 style={{...styles.kpiTitle, fontSize: '1.125rem', fontWeight: '600', color: '#070034', marginTop:'1px'}}>
                  Gerar Peça Processual
              </h3>
              <div>
                  <label htmlFor="template-select" style={styles.inputLabel}>Selecione o Template</label>
                  <select 
                      id="template-select" 
                      style={styles.input} 
                      value={selectedTemplate} 
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                  >
                      {mockTemplates.map(t => (
                          <option key={t.id} value={t.id}>{t.nome}</option>
                      ))}
                  </select>
              </div>
          </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>                
                <div style={styles.kpiCard}>
                    <h3 style={{...styles.kpiTitle, fontSize: '1.125rem', fontWeight: '600', color: '#070034', marginBottom: '20px', marginTop: '1px'}}>Contracheque Original</h3>
                    <div style={{width: '100%', height: '600px', backgroundColor: '#F9FAFB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src="https://fiosaude.org.br/wp-content/uploads/2019/02/Contracheque_Fiocruz-300x240.jpg" alt="Exemplo de contracheque" style={{objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', borderRadius: '4px'}}
                           onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/e2e8f0/4a5568?text=Preview+Indisponível'; }} />
                    </div>
                </div>
                <div style={styles.kpiCard}>
                    <h3 style={{...styles.kpiTitle, fontSize: '1.125rem', fontWeight: '600', color: '#070034', marginBottom: '20px', marginTop: '1px'}}>Dados Extraídos</h3>
                    <form style={{maxHeight: '600px', overflowY: 'auto', paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key}>
                                <label style={styles.inputLabel}>{key}</label>
                                <input type="text" name={key} value={value} onChange={(e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))} style={styles.input} />
                            </div>
                        ))}
                    </form>
                     <div style={{marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: '16px'}}>
                        <button onClick={onBack} style={{...styles.button, backgroundColor: '#E5E7EB', color: '#070034'}}>Voltar</button>
                        <button onClick={() => {console.log(`Gerando peça com o template ID: ${selectedTemplate}`);onGenerate();}} style={styles.button}>Salvar e Gerar Peça</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- componente principal da aplicação ---
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    document.title = 'Docsy';
    const faviconLink = document.querySelector("link[rel~='icon']");
    if (faviconLink) {
        faviconLink.href = favicon;
    } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = favicon;
        document.head.appendChild(newFavicon);
    }
    const injectGlobalStyles = () => {
        const styleId = 'global-app-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        // adicionando a regra da animação aqui
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            .animate-spin {
              animation: spin 1s linear infinite;
            }
        `;
        document.head.appendChild(style);
    };
    injectGlobalStyles();
  }, []);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => { setIsAuthenticated(false); setCurrentPage('dashboard'); };
  const handleNavigate = (page) => setCurrentPage(page);
  const handleUploadComplete = () => setCurrentPage('validation');
  const handleGenerate = () => setCurrentPage('preview');
  const handleFinishPreview = () => setCurrentPage('dashboard');
  
  if (!isAuthenticated) return <LoginPage onLogin={handleLogin} />;
  
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'upload': return <UploadPage onUploadComplete={handleUploadComplete} />;
      case 'validation': return <ValidationPage onBack={() => setCurrentPage('upload')} onGenerate={handleGenerate} />;
      case 'preview': return <PreviewPage onFinish={handleFinishPreview} />;
      case 'cases': return <CaseListPage />;
      case 'templates': return <TemplateLibraryPage />;
      case 'team': return <PlaceholderPage title="Gestão da Equipe" />;
      case 'settings': return <PlaceholderPage title="Configurações" />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div style={styles.body}>
        <MainLayout currentPage={currentPage} onNavigate={handleNavigate} onLogout={handleLogout}>
            {renderPage()}
        </MainLayout>
    </div>
  );
}
