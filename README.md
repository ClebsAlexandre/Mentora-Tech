# 🚀 Mentora-Tech - Simulador de Entrevistas Técnicas

Bem-vindos ao projeto **Mentora-Tech**! Mais do que uma plataforma de encontros, somos um **Simulador de Entrevistas Técnicas** focado em preparar profissionais de TI para o mercado de trabalho. 

Alunos podem agendar simulações com Tech Leads, realizar sabatinas técnicas e receber um "Relatório de Desempenho" completo com o veredito (Contrataria ou Não Contrataria).

---

## 💻 Stack Tecnológica
* **Frontend:** Next.js (App Router), React 19, Tailwind CSS v4
* **Backend:** Next.js Server Actions
* **Banco de Dados:** PostgreSQL (nuvem via Supabase)
* **ORM:** Drizzle ORM (tipagem e migrações SQL)
* **Integrações:** DiceBear API (geração dinâmica de avatares)

---

## 📁 Arquitetura do Projeto

Para suportar o crescimento da plataforma, adotamos a seguinte divisão de pastas (Separation of Concerns):

* `app/`: Apenas as páginas, layouts e rotas de API (Frontend).
* `components/`: Componentes visuais isolados (`/ui`, `/layout`, `/forms`).
* `actions/`: Lógica pesada de servidor e banco de dados (Backend).
* `lib/`: Utilitários gerais do sistema (ex: `utils.ts`).
* `hooks/`: Hooks customizados do React.
* `types/`: Interfaces TypeScript para tipagem global.
* `db/`: Configuração do Supabase e definição do esquema de dados (`schema.ts`).

---

## 👥 Divisão de Funções na Equipe

### 1. Arquiteto de Dados / DBA (Clebson)
* **Responsabilidade:** Dono da pasta `db/`. Modela o `schema.ts` (que hoje possui 7 tabelas estruturadas, incluindo `agendamentos`, `pagamentos` e `relatorio_entrevista`).
* **Ação:** Único responsável por rodar comandos de alteração de estrutura (`push`) no Supabase.

### 2. Desenvolvedores Front-end / UI
* **Responsabilidade:** Trabalhar dentro de `app/` e `components/` criando a interface visual com Tailwind CSS.
* **Ação:** Criar telas bonitas e responsivas sem se preocupar com lógica de banco de dados.

### 3. Desenvolvedores Full-Stack / Integração
* **Responsabilidade:** Fazer a ponte criando funções na pasta `actions/`.
* **Ação:** Desenvolver as Server Actions (leitura/escrita usando Drizzle) que o Front-end vai chamar ao clicar em um botão.

---

## 🛠️ Pré-requisitos e Instalação

### 1. Ferramentas Necessárias
* **Node.js** (Versão LTS)
* **Git**
* **Yarn** (`npm install -g yarn`)

> **Nota para Computadores do Lab (FICR):** Usem o **VS Code** padrão para editar o código e rodem os comandos via terminal interno.

### 2. Clonando e Instalando
No terminal, rodem os seguintes comandos:

    git clone [LINK_DO_REPOSITORIO]
    cd mentora-tech
    yarn install

---

## 🔐 Configuração do Banco de Dados (.env)

Como o arquivo de configuração é ignorado por segurança, cada um deve criar o seu manualmente:

1. Na raiz do projeto, crie um novo arquivo chamado `.env.local`.
2. Cole a seguinte linha dentro dele (solicite a **Senha Real** ao Clebson via chat privado):

    DATABASE_URL="postgresql://postgres:SENHA_REAL_AQUI@db.logxitgjbamrfutgoebb.supabase.co:5432/postgres"

---

## 🚀 Como Rodar o Projeto

Após a instalação e configuração do `.env.local`, inicie o servidor de desenvolvimento:

    yarn dev

O projeto estará disponível em `http://localhost:3000`.

**Dica de Debug:** Caso o Next.js apresente algum travamento inexplicável durante o desenvolvimento, delete a pasta oculta `.next` e rode `yarn dev` novamente para limpar o cache.

---

## 📖 Dicas do Repositório
* **Nunca** remova o `.env.local` do `.gitignore`.
* **Recomendado** crie uma nova branch para suas alterações visuais ou lógicas (`git checkout -b minha-feature`).
* **Sempre** rode o `yarn install` após dar um `git pull` caso novas bibliotecas tenham sido adicionadas.