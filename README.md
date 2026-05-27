MyProfile — Plataforma de Avaliação de Filmes

Aplicação fullstack para descobrir, salvar e avaliar filmes. Integrada com a API do TMDB para busca e dados de filmes, com sistema completo de autenticação e reviews pessoais.

---

 ## Funcionalidades

-  Cadastro e login com senha criptografada (bcrypt)
-  Sessão persistida via localStorage
-  Busca de filmes pela API do TMDB
-  Página de detalhes com banner dinâmico
-  Salvar filmes com nota e review pessoal
-  Editar e remover reviews
-  Rotas protegidas por autenticação

---

## Tecnologias

### Frontend
| Tecnologia | Versão |
|---|---|
| React | 19 |
| TypeScript | 5+ |
| Vite | 6+ |
| Tailwind CSS | 4 |
| React Router DOM | 7 |

### Backend
| Tecnologia | Descrição |
|---|---|
| Node.js | Runtime JavaScript |
| Express | Framework web |
| TypeScript | Tipagem estática |
| MySQL2 | Driver do banco de dados |
| bcrypt | Criptografia de senhas |
| cors | Liberação de origens |
| ts-node | Execução de TypeScript |

---

##  Banco de Dados

MySQL com as seguintes tabelas:

```sql
CREATE TABLE usuarios (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(150) NOT NULL
);

CREATE TABLE filmes (
  id_filme INT AUTO_INCREMENT PRIMARY KEY,
  tmdb_id INT NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  poster_url VARCHAR(500) NOT NULL
);

CREATE TABLE reviews (
  id_review INT AUTO_INCREMENT PRIMARY KEY,
  nota INT NOT NULL,
  review TEXT,
  id_usuario INT NOT NULL,
  id_filme INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_user),
  FOREIGN KEY (id_filme) REFERENCES filmes(id_filme)
);
```

---

##  Como rodar

### Pré-requisitos
- Node.js 18+
- MySQL rodando localmente
- Conta no [TMDB](https://www.themoviedb.org/) para obter a chave da API

### Backend

```bash
# Entre na pasta do backend
cd myprofile-api

# Instale as dependências
npm install

# Configure o banco em src/database.ts
# Troque host, user, password e database pelas suas credenciais

# Rode o servidor
npx ts-node src/server.ts
```

O servidor sobe na porta `3333`.

### Frontend

```bash
# Entre na pasta do frontend
cd myprofile

# Instale as dependências
npm install

# Configure sua chave TMDB em src/services/tmdb.ts

# Rode o projeto
npm run dev
```

O frontend sobe em `http://localhost:5173`.

---

##  Estrutura do Projeto

### Frontend
src/
pages/          # Páginas da aplicação
components/     # Componentes reutilizáveis
contexts/       # Context API (Auth, Filmes)
services/       # Funções de chamada às APIs
routes/         # Configuração de rotas

### Backend
src/
routes/         # Rotas da API (usuarios, filmes, reviews)
database.ts     # Conexão com MySQL
server.ts       # Configuração do Express

---

## Variáveis necessárias

### Backend — `src/database.ts`
```ts
host: "localhost"
user: "seu_usuario_mysql"
password: "sua_senha_mysql"
database: "myprofile"
```

### Frontend — `src/services/tmdb.ts`
```ts
api_key: "sua_chave_tmdb"
```

---

##  Autor

Guilherme Paroti — desenvolvedor em evolução constante e que subiu as informações do database para github e que não fez a melhor modelagem de tabelas no banco, mas tudo bem que esse foi meu primeiro grande projeto full-stack ksksksksks.
