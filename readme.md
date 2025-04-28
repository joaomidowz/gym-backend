# 🏋️ Gym App - Backend

Este é o backend oficial do **Gym App**, uma aplicação para gerenciamento de treinos com funcionalidades sociais como curtidas, comentários, feed e sistema de seguidores. Desenvolvido para motivar a galera da maromba a treinar pesado e interagir! 💪🔥

---

## 🔧 Tecnologias Utilizadas

- Node.js + Express
- Sequelize ORM
- PostgreSQL (local ou Railway)
- JWT + Bcrypt para autenticação segura
- Sequelize CLI para migrations e seeders
- Dotenv para variáveis de ambiente

---

## 🌐 Variáveis de Ambiente

```env
DB_USER=
DB_PASS=
DB_NAME=
DB_HOST=
DB_PORT=
JWT_SECRET=
```

---

## 🧐 Funcionalidades

### 🔐 Autenticação
- Registro e login de usuário com senha criptografada (bcrypt)
- JWT emitido e validado em cada rota privada
- Middleware `authMiddleware` implementado

### 👤 Usuários
- CRUD completo com campos `is_admin` e `is_public`
- Atualização e exclusão protegidas
- Middleware `isUserOwnerOrAdmin` para garantir propriedade
- Middleware `checkProfileVisibility` para proteger perfis privados

### 🏋️ Exercícios
- CRUD de exercícios
- Campos `is_global`, `muscle_group`, `user_id`
- Proteção contra edição/deleção de exercícios globais ou em uso
- Middleware `isExerciseOwnerOrAdmin`, `isExerciseGlobal`, `isExerciseInUse`

### 🗓️ Sessões de Treino (`WorkoutSession`)
- Campos: `title`, `date`, `is_public`, `duration_seconds`, `notes`
- CRUD completo vinculado a usuário
- Proteção de propriedade com `isSessionOwnerOrAdmin` e visibilidade com `checkSessionVisibility`

### 🏋️‍♂️ Execuções de Exercício (`WorkoutExercise`)
- Representa um exercício dentro da sessão
- Campos: `exercise_id`, `name`
- Atualiza automaticamente resumos (último peso, sets, reps)
- Middleware `isWorkoutExerciseOwnerOrAdmin`

### 🔄 Séries (`WorkoutSet`)
- Cada set representa uma série de exercício
- Campos: `set_type`, `weight`, `reps`, `order`, `done`
- Proteção por `isSetOwnerOrAdmin`

### 🔥 Streak de Treino (`UserStreak`)
- Rastreia sequência de dias treinados
- Sistema de "salvamento" para não perder streak
- Middleware para gestão de saves e atualizações automáticas

### 🔋 PRs - Personal Records (`WorkoutPR`)
- Registro automático dos melhores resultados de peso e reps
- Vinculado ao usuário, exercício e sessão

### ❤️ Likes
- `POST /likes` para curtir sessão
- `DELETE /likes` para descurtir
- Protegido com middleware de autor/autenticado

### 💬 Comentários
- `POST /comments` para comentar em sessões
- `GET /comments/:sessionId` para listar
- `DELETE /comments/:id` para deletar (dono/admin)

### 📰 Feed Social
- `GET /feed`
- Lista sessões públicas recentes com curtidas e comentários
- Paginado: `?limit=10&offset=0`

### 👥 Seguidores
- `POST /follow/:userId` para seguir
- `DELETE /follow/:userId` para deixar de seguir
- Listagem de followers/following

---

## 📁 Estrutura de Pastas

```bash
backend/
├── config/
│   └── config.js
├── controllers/
├── middlewares/
├── migrations/
├── models/
├── routes/
├── seeders/
├── utils/
├── index.js
├── package.json
├── .env
├── README.md
└── plano.md
```

**Destaques:**
- `controllers/` - Toda lógica de negócio
- `models/` - Models do Sequelize
- `middlewares/` - Proteção de rotas e checagens
- `routes/` - Organização de endpoints REST

---

## 🚀 Como Rodar Localmente

```bash
# Clone o repositório
$ git clone https://github.com/seu-usuario/gym-backend.git

# Acesse a pasta
$ cd gym-backend

# Instale as dependências
$ npm install

# Configure o arquivo .env com seu banco

# Rode as migrations
$ npx sequelize-cli db:migrate

# Inicie o servidor
$ npx nodemon index.js
```

---

## 🛠️ Status do Backend

| Módulo                   | Status            |
|----------------------------|-------------------|
| Autenticação             | ✅ Finalizado     |
| Usuários                   | ✅ Finalizado     |
| Exercícios                 | ✅ Finalizado     |
| Sessões                   | ✅ Finalizado     |
| Execuções de Exercício     | ✅ Finalizado     |
| Sets                       | ✅ Finalizado     |
| Streak                     | ✅ Finalizado     |
| PRs                        | ✅ Finalizado     |
| Comentários                | ✅ Finalizado     |
| Likes                      | ✅ Finalizado     |
| Feed Social                | ✅ Finalizado     |
| Seguidores                 | ✅ Finalizado     |

---

## 🧪 Próximos Passos

- 📊 Gráfico de Progresso do Usuário
- 📲 Notificações Push para Likes/Comments/Follows
- 💡 Sistema de Medalhas por Streak/PR
- 👨‍💻 Painel Admin para gerenciamento de usuários
- 📱 Versão Mobile (React Native)

---

🔥 Gym App: treino e motivação conectados!

