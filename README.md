# 🚀 Mentora-Tech - Sistema de Mentoria Profissional

Bem-vindos ao projeto **Mentora-Tech**! Este é o nosso MVP, focado em conectar mentores e alunos. O projeto utiliza **Next.js**, **Drizzle ORM**, **Supabase** e o agente de IA **Antigravity**.

---

## 👥 Divisão de Funções (Sprints Iniciais)

Para mantermos o código organizado e evitarmos conflitos, trabalharemos com as seguintes frentes:

### 1. Arquiteto de Dados / DBA (Clebson)
* **Responsabilidade:** Gerenciar a pasta `db/`, definir esquemas no `schema.ts` e realizar a migração para a nuvem.
* **Ação:** Único responsável por rodar comandos de alteração de estrutura (`push`) no Supabase.

### 2. Desenvolvedores Front-end / UI
* **Responsabilidade:** Criar a interface visual na pasta `app/` utilizando Tailwind CSS e componentes React.
* **Ação:** Utilizar o Antigravity Agent para transformar protótipos em código funcional e garantir a responsividade.

### 3. Desenvolvedores Full-Stack / Integração
* **Responsabilidade:** Conectar as telas ao banco de dados.
* **Ação:** Criar Server Actions e funções de leitura/escrita usando Drizzle para buscar mentores, agendar sessões e salvar avaliações.

---

## 🛠️ Pré-requisitos e Instalação

### 1. Ferramentas Necessárias
* **Node.js** (Versão LTS)
* **Git**
* **Yarn** (`npm install -g yarn`)
* **Antigravity IDE** (Opcional, mas recomendado para usar o Agente de IA)

> **Nota para Computadores do Lab (FICR):** Caso o instalador do Antigravity seja bloqueado por falta de permissão de admin, utilizem o **VS Code** padrão para editar o código e rodem os comandos via terminal.

### 2. Clonando e Instalando
No terminal, rodem os seguintes comandos:

    git clone [LINK_DO_REPOSITORIO]
    cd mentora-tech
    yarn install

---

## 🔐 Configuração do Banco de Dados (.env)

Como o arquivo de configuração é ignorado por segurança, cada um deve criar o seu manualmente:

1. Na raiz do projeto, crie um novo arquivo chamado `.env.local`.
2. Cole a seguinte linha dentro dele (solicite a **Senha Real** a quem controla o banco de dados):

    DATABASE_URL="postgresql://postgres:SENHA_REAL_AQUI@db.logxitgjbamrfutgoebb.supabase.co:5432/postgres"

---

## 🚀 Como Rodar o Projeto

Após a instalação e configuração do `.env.local`, inicie o servidor de desenvolvimento:

    yarn dev

O projeto estará disponível em `http://localhost:3000`.

---

## 📖 Regras do Repositório
* **Nunca** remova o `.env.local` do `.gitignore`.
* **Recomendado** crie uma nova branch para suas alterações (`git checkout -b minha-feature`).
* **Sempre** rode o `yarn install` após dar um `git pull` caso novas bibliotecas tenham sido adicionadas.