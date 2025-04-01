# 🏋️ Gym App - Backend

Este é o backend da aplicação **Gym App**, feita para gerenciar usuários, treinos, execuções, e agora também **ações sociais como curtidas, comentários, feed e seguidores**.  
Ideal pra quem quer manter o foco nos treinos e ainda socializar com a galera da maromba digital 💪🔥

---

## 🔧 Tecnologias utilizadas

- Node.js + Express
- Sequelize ORM
- PostgreSQL (Railway ou local)
- JWT + Bcrypt para autenticação segura
- Sequelize CLI para migrations
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
## 🧠 Funcionalidades

### 🔐 Autenticação
- Registro e login com hash seguro (bcrypt)
- JWT gerado e validado em cada rota protegida
- Middleware `authMiddleware` ativo
- Rota `GET /user/me` para pegar perfil logado

---

### 👤 Usuários
- CRUD completo com campos `is_admin` e `is_public`
- Atualização e deleção protegida
- Middleware `isUserOwnerOrAdmin` e verificação de perfil público

---

### 🏋️ Exercícios
- CRUD completo de exercícios
- Campos `is_global` e `user_id`
- Proteção: apenas o criador ou admin pode editar/deletar
- Exercícios globais ou já usados não podem ser alterados

---

### 📅 Sessões de treino (`WorkoutSession`)
- Campos: `title`, `date`, `is_public`
- CRUD completo vinculado ao usuário
- Proteção: somente dono ou admin pode editar/deletar
- Middleware `isSessionOwnerOrAdmin` e `checkSessionVisibility`

---

### 🏋️‍♀️ Execuções (`WorkoutExercise`)
- Cada execução representa um exercício dentro de uma sessão
- Campos: `exercise_id`, `weight`, `reps`, `sets`, `notes`
- Middleware `isWorkoutExerciseOwnerOrAdmin`
- Resumo automático atualizado com base nos `WorkoutSet`

---

### 🔥 Sistema de Streak (Sequência de Treinos)
- Rastreia automaticamente os dias consecutivos de treino
- A streak é reiniciada se o usuário ficar mais de 2 dias sem treinar
- Se quebrar, o usuário tem 24h para usar um "salve" e manter a streak
- Rotas:
  - `GET /user/streak`: visualiza a streak atual
  - `POST /user/streak/save`: usa o salve se estiver disponível

---

### 🔂 Séries (`WorkoutSet`)
- Série individual (set) de um exercício
- Campos: `set_type`, `weight`, `reps`, `order`
- CRUD completo: criar, listar, atualizar e remover
- Proteção com `isSetOwnerOrAdmin` (dono da sessão ou admin)
- Atualiza automaticamente o resumo (`sets`, `reps`, `weight`) na `WorkoutExercise`

---

### ❤️ Likes
- `POST /likes` para curtir sessões públicas
- `DELETE /likes/:id` para descurtir
- Protegido: apenas o autor do like ou admin pode deletar

---

### 💬 Comentários
- `POST /comments` para comentar sessões públicas
- `GET /comments/:sessionId` para listar todos os comentários
- `DELETE /comments/:id` com middleware `isCommentOwner`

---

### 📰 Feed Social
- Rota `GET /feed`
- Lista sessões públicas ordenadas por data (mais recentes primeiro)
- Inclui:
  - Dados do dono da sessão
  - Total de likes
  - Comentários (com autor)
- Suporta paginação: `?limit=10&offset=0`

---

### 👥 Seguidores
- `POST /follow/:id` para seguir um usuário
- `DELETE /follow/:id` para deixar de seguir
- Middleware `isFollowOwner` protege as ações

### 📁 Estrutura de Pastas

```bash
backend/
├── config/
│   └── config.js
├── controllers/
│   ├── commentController.js
│   ├── exerciseController.js
│   ├── followController.js
│   ├── likeController.js
│   ├── streakController.js      
│   ├── userController.js
│   ├── workoutExerciseController.js
│   ├── workoutSessionController.js
│   └── workoutSetController.js
├── routes/
│   ├── commentRoutes.js
│   ├── exerciseRoutes.js
│   ├── feedRoutes.js
│   ├── followRoutes.js
│   ├── likeRoutes.js
│   ├── userRoutes.js             
│   ├── workoutExerciseRoutes.js
│   ├── workoutSessionRoutes.js
│   └── workoutSetRoutes.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── isCommentOwner.js
│   ├── isFollowOwner.js
│   ├── isLikeOwner.js
│   ├── ownershipMiddleware.js
│   ├── setMiddleware.js
│   └── visibilityMiddleware.js
├── migrations/ #
├── models/
│   ├── Comment.js
│   ├── Exercise.js
│   ├── Follow.js
│   ├── index.js
│   ├── Like.js
│   ├── User.js
│   ├── UserStreak.js             
│   ├── WorkoutExercise.js
│   ├── WorkoutSession.js
│   └── WorkoutSet.js
├── utils/
│   └── streakUtils.js            
├── seeders/
├── .env
├── .gitignore
├── index.js
├── package.json
├── README.md
├── plano.md
└── script.md
```

## 🚀 Como rodar localmente

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/gym-backend.git

# Acesse a pasta
cd gym-backend

# Instale as dependências
npm install

# Configure seu .env com os dados do banco

# Rode as migrations
npx sequelize-cli db:migrate

# Inicie o servidor
npx nodemon index.js

---

## 🧱 Status do Backend

| Módulo                   | Status              |
|--------------------------|---------------------|
| Autenticação             | ✅ Pronto           |
| Usuários                 | ✅ Pronto           |
| Exercícios               | ✅ Pronto           |
| Sessões                  | ✅ Pronto           |
| Execuções                | ✅ Pronto           |
| Séries                   | ✅ Finalizado       |
| Comentários              | ✅ Pronto           |
| Likes                    | ✅ Pronto           |
| Streak                   | ✅ pronto           |
| Feed                     | ✅ Pronto           |
| Seguidores               | ✅ Pronto           |
| Segurança e Middleware   | ✅ Ativo e testado  |

---

## 🧠 Próximos passos (ideias)

- 📊 Histórico de recordes (PRs)
- 📈 Gráfico de progresso
- 🔔 Notificações sociais (likes, follows, comentários)
- 📲 Iniciar frontend (React Native, Next...)
