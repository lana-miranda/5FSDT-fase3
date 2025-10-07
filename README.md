# Tech Challenge Fase 3 - Implementação de fronted para o sistema de blog com gerenciamento de posts.

Esse sistema foi implementado para complementar o backend da fase anterior e entrega a interface completa de um blog onde permite o gerenciamento de posts. O sistema foi fdeito com React, Next.js e TypeScript. O projeto foca nas funcionalidade de: criar, editar, ler e gerenciar posts, além de autenticação e controle de acesso baseado em roles, conforme orientação exigida no tech challenge

## 🚀 Funcionalidades

### O que dá pra fazer

- **Gerenciar Posts**: Criar, ler, atualizar e deletar posts do blog
- **Autenticação**: Sistema de login seguro com controle de acesso por roles
- **Busca e Filtros**: Busca avançada com filtro por palavras-chave
- **Sistema de Comentários**: Leitores podem comentar nos posts
- **Design Responsivo**: Interface mobile-friendly que funciona em qualquer dispositivo
- **Painel Admin**: Dashboard completo pra gerenciar tudo

### Tipos de Usuário

- **Admin**: Acesso completo a todas as funcionalidades, incluindo o dashboard

### Páginas

- **Home**: Lista todos os posts com busca e filtros
- **Detalhe do Post**: Visualização completa do post com comentários
- **Criar Post**: Formulário pra criar novos posts
- **Editar Post**: Formulário pra editar posts existentes
- **Dashboard Admin**: Interface de gerenciamento de todos os posts
- **Login**: Tela de autenticação

## 🛠️ Stacks

- **Frontend**: React 19, Next.js 15, TypeScript
- **Estilização**: Styled Components
- **Gerenciamento de Estado**: React Context API
- **Cliente HTTP**: Fetch API nativa
- **Desenvolvimento**: Mock API integrada

## 📦 Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/lana-miranda/5FSDT-fase3
   cd 5FSDT-fase3
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Veja a seção [Configuração](#-configuração) abaixo pra configurar o arquivo `.env`

4. **Rode o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Acesse no navegador**

   Abra [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuração

### Arquivo .env

Você precisa criar um arquivo `.env` na raiz do projeto. Esse arquivo é onde você coloca as configurações do ambiente.

#### Passo a passo:

1. **Crie o arquivo `.env` na raiz do projeto:**

   ```bash
   touch .env
   ```

2. **Copie e cole as variáveis abaixo no arquivo `.env`:**

   ```env
   ADMIN_PASSWORD=admin
   ENCRYPTION_TOKEN=123456
   ```

   > **Nota**: O arquivo `.env` já está no `.gitignore`, então não será commitado no repositório.

#### Dica pro ambiente de produção:

Quando for fazer deploy (Vercel, Netlify, etc.), configure essas variáveis no painel do serviço de hospedagem.

## 🔐 Autenticação

O app tem um sistema de autenticação mock pra desenvolvimento. É útil pra testar sem precisar de backend.

### Credenciais de Demo

- **Admin**: usuário `admin` / senha `admin123`

### Features de Autenticação

Sessão persistente (usa localStorage)
Controle de acesso baseado em roles
Gerenciamento automático de tokens
Rotas protegidas

#### Autenticação

- `POST /auth` - Login do usuário
- `GET /auth` - Pegar usuário atual (precisa do header Authorization)

#### Posts

- `GET /posts` - Listar todos os posts
- `GET /posts/:id` - Buscar post por ID
- `POST /posts` - Criar novo post
- `PATCH /posts/:id` - Atualizar post
- `DELETE /posts/:id` - Deletar post

#### Comentários

- `GET /posts/:id/comments` - Listar comentários de um post
- `POST /posts/:id/comments` - Criar comentário
- `DELETE /comments/:id` - Deletar comentário

## 🚀 Deploy

### Vercel (Recomendado)

Utilizei a Vercel para fazer o deploy uma vez que é mais fácil na minha opinião quando se utiliza Next. A interface de deploy é intuítiva, mas segue o passo a passo de como realizar:

1. Suba seu código pro GitHub
2. Conecte o repositório na Vercel
3. Configure as variáveis de ambiente no dashboard
4. Deploy automático toda vez que você der push

## 📝 Scripts Disponíveis

```bash
npm run dev       # Roda o servidor de desenvolvimento
npm run build     # Cria build de produção
npm run start     # Roda o servidor de produção
npm run lint      # Roda o ESLint pra checar o código
```
