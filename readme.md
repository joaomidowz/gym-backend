# 🏋️ Gym App - Backend

Este é o backend da aplicação **Gym App**, feita para gerenciar usuários, treinos, streaks e agora também **ações sociais como curtidas, comentários e feed**.  
Ideal pra quem quer manter o foco nos treinos e ainda socializar com a galera da maromba digital 💪🔥

---

## 🔧 Tecnologias utilizadas

- Node.js + Express
- Sequelize (ORM)
- PostgreSQL (Railway)
- JWT + Bcrypt (Auth segura)
- Sequelize CLI
- Dotenv

---

## 🌐 Variáveis de Ambiente (produção)

```env
DB_USER=
DB_PASS=
DB_NAME=
DB_HOST=
DB_PORT=
JWT_SECRET=
```

Ou use `DATABASE_URL` para produção.

---

## 🧠 Funcionalidades

### 🔐 Autenticação

- Registro e login com hash seguro
- JWT na resposta e verificação via middleware
- Auto-login ao se registrar
- Rota `GET /user/me` para pegar perfil logado

---

### 👤 Usuários

- CRUD completo com `is_admin` e `is_public`
- Rota protegida para atualização e deleção
- Middlewares: `authMiddleware`, `isUserOwnerOrAdmin`

---

### 🏋️ Exercícios

- CRUD de exercícios
- Exercícios globais (`is_global: true`)
- Proteções: só o dono ou admin pode editar/deletar

---

### 📅 Sessões de treino

- Campos: `title`, `date`, `is_public`
- CRUD completo
- Apenas o dono ou admin pode alterar/deletar
- Dashboard do usuário logado: `GET /workout-session`

---

### 🏋️‍♀️ Execuções de treino

- Vincula exercícios às sessões de treino
- Proteções ativas: apenas dono ou admin pode modificar

---

### ❤️ Likes

- `POST /likes` para curtir
- `DELETE /likes/:id` para descurtir
- Apenas o autor ou admin pode descurtir
- Válido apenas para sessões públicas

---

### 💬 Comentários

- `POST /comments` para comentar sessão pública
- `GET /comments/:sessionId` para listar comentários
- `DELETE /comments/:id` apenas pelo autor ou admin

---

### 📰 Feed

- Rota: `GET /feed`
- Retorna sessões públicas com:
  - Usuário dono da sessão
  - Quantidade de likes
  - Comentários (com nome de quem comentou)
- Suporta paginação com `?limit=10&offset=0`


## 📁 Estrutura de Pastas

```bash
backend/
├── config/
│   └── config.js                 # Configuração do Sequelize com suporte a .env
├── controllers/                 # Lógica de cada rota (CRUDs)
│   ├── exerciseController.js
│   ├── userController.js
│   ├── workoutExerciseController.js
│   └── workoutSessionController.js
├── migrations/                  # Migrations geradas pelo Sequelize CLI
│   ├── xxxx-create-user.js
│   ├── xxxx-create-exercises.js
│   ├── xxxx-create-workout-session.js
│   └── xxxx-create-workout-exercise.js
├── models/                      # Models do Sequelize + index.js de boot
│   ├── exercises.js
│   ├── index.js
│   ├── user.js
│   ├── workoutexercise.js
│   └── workoutsession.js
├── routes/                      # Definição das rotas (Express)
│   ├── exerciseRoutes.js
│   ├── userRoutes.js
│   ├── workoutExerciseRoutes.js
│   └── workoutSessionRoutes.js
├── seeders/                     # (Vazio) - pode usar no futuro p/ dados fake
├── .env                         # Variáveis de ambiente (IGNORADO no Git)
├── .gitignore                   # Ignora node_modules, .env, etc.
├── index.js                     # Entry point da API (Express)
├── package.json                 # Dependências e scripts do projeto
├── package-lock.json
├── readme.md                    # Documentação do projeto
├── plano.md                     # Ideias e planejamento
└── script.md                    # Scripts de uso interno ou anotações
```
🚀 Como rodar localmente

# Clone o projeto
git clone https://github.com/seu-usuario/gym-backend.git

# Acesse a pasta
cd gym-backend

# Instale as dependências
npm install

# Rode as migrations (aplica as tabelas no banco)
npx sequelize-cli db:migrate

# Inicie o servidor
npx nodemon index.js