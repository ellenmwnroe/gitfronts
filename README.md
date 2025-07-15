# 📄 Docsy – Plataforma de Automação Jurídica

**Docsy** é um sistema web com foco em automação de contracheques e geração de peças processuais para escritórios jurídicos. Idealizado como um produto SaaS, o front-end está em desenvolvimento com foco em usabilidade, escalabilidade e integração futura com back-end completo.

Desenvolvido por **Ellen Monroe** e **Alysson Rodrigues**.

📚 [Acesse a documentação completa da Docsy](https://github.com/ellenmwnroe/gitfronts/wiki)

---

## 🚧 Status Atual
- ✅ Interface em React já funcional com dashboard, upload e extração
- 🔄 MVP em construção com base no planejamento da equipe
- 🧠 Interface considera lógica adaptável para múltiplos casos e trabalhadores

---

## 📦 Funcionalidades Implementadas (Front-end)

### 📂 Upload de Documentos
- Upload de múltiplos arquivos PDF ou imagem
- Simulação de OCR com checkbox opcional
- Fila de upload com status, animações e progresso
- Exibição da lista de arquivos com possibilidade de ação posterior

### 📊 Dashboard com Análise por Trabalhador
- Seleção dinâmica de caso e trabalhador
- Tabela com contracheques organizados por mês
- Destaque visual para variações salariais e inconsistências detectadas
- Tooltip explicativo para campos com alertas
- Gráficos de barras de atividade e análise comparativa

### 📁 Casos e Documentos
- Listagem geral de todos os casos ativos e finalizados
- Exibição de cliente, status, quantidade de documentos e última atividade
- Organização por nome e logo do cliente

### 🧾 Templates de Peças Jurídicas
- Galeria com templates mockados por categoria
- Cada template possui nome, categoria e descrição
- Integração com extração de dados para preenchimento automático de peças

### 🔍 Validação de Dados Extraídos
- Tela de revisão dos campos extraídos do contracheque
- Dados estruturados por nome, salário base, adicionais, descontos etc.
- Botão de geração de peça jurídica a partir dos dados validados

### 📄 Geração e Download de Peças Jurídicas
- Geração automática de `.docx` utilizando a biblioteca `docx`
- Exportação do documento via `file-saver`
- Estrutura padrão de petição já incluída no mock

---

## 💡 Funcionalidades Planejadas para MVP Final

### 👥 Gestão de Escritório e Equipe
- Cadastro institucional do escritório:
  - Nome, logo, e-mail, CNPJ, endereço
- Gestão de membros da equipe:
  - Adição e remoção de usuários internos
  - Atribuição de cargos e funções (advogado, editor, administrador)
  - Controle de permissões (upload, edição, geração, exclusão)
  - Edição de e-mails e redefinição de senhas
- Sessão localizada nas abas "Equipe" e "Configurações"

---

## ⚙️ Tecnologias Usadas

- **React.js** – Front-end SPA
- **Lucide Icons** – Ícones SVG modernos e leves
- **docx** – Geração de arquivos Word (.docx)
- **file-saver** – Download de arquivos client-side
- **Recharts** – Gráficos dinâmicos para visualização de dados
- **Estilo manual (CSS-in-JS)** – Sem uso de Tailwind ou bibliotecas externas de CSS

---

## 📁 Estrutura de Dados (Mocks)

- `mockCases` → Lista de casos e clientes
- `mockAnalysisData` → Dados mensais do contracheque por trabalhador
- `mockExtractedData` → Resultado da extração de campos do contracheque
- `mockTemplates` → Templates de peças jurídicas por categoria
- `dashboardData` → KPIs, gráficos e atividades recentes

> Toda a estrutura de dados mock está organizada para fácil transição para uma API REST futura.

---

## 🧪 Como Rodar (Desenvolvimento)

```bash
npm install
npm start
```

---

## 🔍 Organização do Código (src/)

```
src/
├── assets/            # Logos e imagens do sistema
├── components/        # Componentes reutilizáveis: tabela, gráfico, avatar, etc.
├── pages/             # Páginas principais: Dashboard, Upload, Templates, Equipe
├── styles/            # Estilo geral (JS objects)
├── App.jsx            # Lógica de navegação e estado global
├── index.js           # Entrada principal do React
```

---

## 🙋 Autores
- **Ellen Monroe** – Design e Estrutura geral
- **Alysson Rodrigues** – Apoio na Estruturação React e definição de layout base

---

## 🚀 Possíveis Expansões Futuras
- Painel do cliente externo com visualização de documentos e andamento do processo
- Editor visual de templates com drag & drop
- Integração com ERP jurídico ou contábil
- Emissão automática de fatura e assinatura via API de pagamentos

---

## 📄 Licença
Projeto em fase de desenvolvimento. Licença será definida ao final do MVP.
