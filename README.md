🤖# HighCapital Chatbot

Este é um projeto de aplicação web para criar e gerenciar chatbots personalizados. Ele é composto por um **frontend** e um **backend**, que se comunicam para proporcionar uma experiência fluida de criação e interação com chatbots.

---

## 🛠️ Tecnologias

### Backend (.NET 8.0)

- **Linguagem:** C#
- **Framework:** ASP.NET Core Web API
- **Banco de Dados:** MySQL
- **ORM:** Entity Framework Core
- **Contêiner:** Docker (com Docker Compose)
- **Automação:** AutoMapper, FluentValidation
- **Outros:** Integração com APIs de IA (OpenAI)

### Frontend (Vite.js)

- **Framework:** React.js com TypeScript
- **Ferramenta de Build:** Vite
- **Componentes UI:** Shadcn/UI (baseado em Tailwind CSS)
- **Gerenciamento de Estado:** TanStack Query (para requisições e cache)

---

## 🚀 Como Usar

### 1. Pré-requisitos

Para rodar este projeto, você precisará ter instalado:

- [.NET SDK 8.0](https://dotnet.microsoft.com)
- [Node.js e npm](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (com Docker Compose)
- [Git](https://git-scm.com/)

---

### 2. Configuração do Backend

**Clone o repositório:**

```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd [pasta_do_projeto]


Configure a Chave da API da OpenAI:

Abra o arquivo BackEnd/src/HighCapital.API/appsettings.Development.json e adicione sua chave de API da OpenAI:


"OpenAISettings": {
    "OPENAI_API_KEY": "sua_chave_de_api_aqui"
}


⚠️ ATENÇÃO: Mantenha sua chave de API em segredo. Não a envie para o Git. Use um arquivo .gitignore adequado para ignorar arquivos de configuração sensíveis.

Inicie o Banco de Dados MySQL com Docker:

O projeto já vem com um arquivo docker-compose.yml que configura e inicia um banco de dados MySQL.

cd BackEnd/src/HighCapital.API
docker compose up -d

Isso vai iniciar o contêiner do MySQL na porta 3306.

Crie e Aplique as Migrações do Banco de Dados:

As migrações do Entity Framework Core criam as tabelas bots e messages automaticamente. Certifique-se de que o Docker esteja em execução antes de rodar os comandos.


dotnet ef migrations add InitialCreate --project ../HighCapital.Infrastructure/HighCapital.Infrastructure.csproj
dotnet ef database update --project ../HighCapital.Infrastructure/HighCapital.Infrastructure.csproj


Inicie o Backend:

dotnet run --project ../HighCapital.API/HighCapital.API.csproj

A API será iniciada em: https://localhost:7185

3. Configuração do Frontend
Instale as Dependências:

cd front
npm install

npm run dev

O frontend será iniciado em: http://localhost:5173



💻 Estrutura do Projeto
Backend
O backend é organizado em camadas para separar responsabilidades:

HighCapital.API: Lida com as requisições HTTP e a injeção de dependência.

HighCapital.Application: Contém a lógica de negócio (UseCases), validações e mapeamentos do AutoMapper.

HighCapital.Domain: Define as entidades do banco de dados, interfaces de repositório e serviços de domínio.

HighCapital.Infrastructure: Implementa os repositórios (acesso ao banco de dados com EF Core) e a lógica de comunicação com serviços externos (como a OpenAI).

Frontend
O frontend utiliza uma abordagem modular, com cada recurso organizado em sua própria pasta, seguindo o padrão de Domain-Driven Design:

src/domain/bot: Lógica de requisições, tipos e hooks para o recurso de bots.

src/domain/message: Lógica de requisições, tipos e hooks para o recurso de mensagens.

src/components: Componentes reutilizáveis da interface de usuário.

src/pages: As páginas principais da aplicação


