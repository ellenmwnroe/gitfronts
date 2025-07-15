# 🧠 Wiki da Plataforma Docsy

Bem-vindo à Wiki oficial da **Docsy**, um sistema SaaS de automação documental, inicialmente focado no setor jurídico, com escalabilidade para outras áreas. Este espaço centraliza toda a documentação funcional, técnica e estratégica do projeto.

---

## 📁 Índice Geral

- [Visão Geral](#visao-geral)
- [Funcionalidades por Página](#funcionalidades-por-pagina)
- [Integração com Backend (API)](#integracao-com-backend-api)
- [Gerenciamento e Equipe](#gerenciamento-e-equipe)
- [Sugestões de Melhorias e Expansões](#sugestoes-de-melhorias-e-expansoes)

---

## 🧭 Visão Geral

**Docsy** (Document System) é uma aplicação web que permite ao usuário:
- Fazer upload de documentos (como contracheques)
- Extrair e analisar dados salariais
- Gerar automaticamente peças jurídicas
- Gerenciar casos e equipes de forma centralizada

A aplicação está sendo desenvolvida com foco em MVP para integração posterior com backend em **Django REST Framework**.

---

## 🧩 Funcionalidades por Página

### 🔐 LoginPage
- Formulário de login (e-mail + senha)
- Integração futura com autenticação JWT

### 📊 DashboardPage
- Seleção de caso e trabalhador
- KPIs gerais: Casos, Documentos, Precisão
- Tabela de análise de contracheques por mês
- Alertas visuais de inconsistência
- Gráfico de atividades

### 📁 UploadPage
- Upload múltiplo (PDF, JPG, PNG)
- Progresso de upload e simulação
- Aplicação futura de OCR real via API

### 📂 CasesPage
- Lista de casos existentes com status
- Integração futura com criação/edição de casos

### 📑 TemplatesPage
- Galeria de templates prontos
- Cada template tem nome, categoria e descrição
- Aplicação de dados extraídos sobre o modelo

### 🧾 Geração de Documento
- Revisão dos dados extraídos (mock)
- Geração de petições `.docx`
- Preview e exportação

---

## 🔧 Integração com Backend (API)

| Recurso               | Endpoint previsto                  |
|----------------------|------------------------------------|
| Login/Auth           | `POST /api/token/`                 |
| Casos                | `GET/POST /api/casos/`             |
| Trabalhadores        | `GET/POST /api/trabalhadores/`     |
| Upload Documentos    | `POST /api/upload/`                |
| Extração de Dados    | `POST /api/extrair/`               |
| Templates            | `GET/POST /api/templates/`         |
| Geração de Documento | `POST /api/documento/gerar/`       |
| Equipe               | `GET/POST /api/usuarios/`          |
| Permissões           | `PATCH /api/usuarios/permissoes/`  |

---

## 👥 Gerenciamento e Equipe

### 📌 Funções de usuário (planejado):
- Administrador (acesso total)
- Advogado (upload, análise, geração de peça)
- Revisor (leitura e edição de dados extraídos)

### 📌 Sessão de Equipe:
- Adicionar novo membro via e-mail
- Atribuir cargos e permissões
- Reset de senha e edição de perfil

### 📌 Sessão de Escritório:
- Nome, logo, e-mail, CNPJ, endereço
- Personalização da conta do escritório

---

## 🚀 Sugestões de Melhorias e Expansões

> Para alinhar melhor com a estrutura administrativa do Django e preparar o front-end para recursos CRUD completos.

### 1. 🧭 Interface Administrativa Integrada
- Criar uma tela para o administrador do sistema:
  - Gerenciar todos os casos
  - Gerenciar templates (criar, editar, remover)
  - Gerenciar equipe com painel de permissões

### 2. 🔧 Prototipar Telas CRUD
- Front-end de:
  - Cadastro de novo caso
  - Cadastro de novo trabalhador
  - Edição e visualização de templates (WYSIWYG ou editor de texto)
  - Cadastro e edição de empresas clientes

### 3. 🎨 Melhorar o layout geral
- Transições entre páginas
- Alertas mais contextuais (snackbars, toast, etc.)
- Agrupamento visual mais claro nos formulários

### 4. 📚 Documentação de suporte
- Adicionar tela “Ajuda” com tutoriais
- Página de changelog interno
- Modo escuro e acessibilidade

---

## ✅ Conclusão

O front-end da Docsy está preparado para expandir com flexibilidade e integrar todas as necessidades de uma API Django REST moderna. Essa Wiki deve ser mantida atualizada a cada sprint para garantir o alinhamento entre design, front e back.

> Última atualização: Julho de 2025 – Ellen Monroe
