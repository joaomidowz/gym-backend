# 📚 Documentação Completa – Gym App

# 📑 Índice

- [Controllers](#controllers)
- [Models](#models)
- [Middlewares](#middlewares)
- [Routes](#routes)

---

## 🧩 Controllers

# 📚 Documentação dos Controllers – Gym App (Formato Avançado)

---

## 📂 feedController.js

### ✏️ getPublicFeed
- **Descrição:** Busca sessões públicas recentes para o feed, incluindo curtidas, comentários, sets e PRs.
- **Método HTTP:** GET
- **Rota:** `/feed/public`
- **Parâmetros:** query: { limit?: number, offset?: number }
- **Resposta:** 200 OK (lista de sessões formatadas)

---

## 📂 followController.js

### ✏️ followUser
- **Descrição:** Segue um usuário.
- **Método HTTP:** POST
- **Rota:** `/follow/:userId`
- **Parâmetros:** params: userId
- **Resposta:** 201 Created | 400 Bad Request

### ✏️ unfollowUser
- **Descrição:** Deixa de seguir um usuário.
- **Método HTTP:** DELETE
- **Rota:** `/follow/:userId`
- **Parâmetros:** params: userId
- **Resposta:** 201 Created | 400 Bad Request

### ✏️ getFollowers
- **Descrição:** Lista seguidores de um usuário.
- **Método HTTP:** GET
- **Rota:** `/follow/:userId/followers`
- **Parâmetros:** params: userId
- **Resposta:** 200 OK

### ✏️ getFollowing
- **Descrição:** Lista quem o usuário está seguindo.
- **Método HTTP:** GET
- **Rota:** `/follow/:userId/following`
- **Parâmetros:** params: userId
- **Resposta:** 200 OK

### ✏️ checkIfFollowing
- **Descrição:** Verifica se o usuário está seguindo outro.
- **Método HTTP:** GET
- **Rota:** `/follow/check/:userId`
- **Parâmetros:** params: userId
- **Resposta:** 200 OK (boolean)

---

## 📂 likeController.js

### ✏️ likeSession
- **Descrição:** Curte uma sessão.
- **Método HTTP:** POST
- **Rota:** `/likes`
- **Parâmetros:** body: { session_id }
- **Resposta:** 201 Created | 400 Bad Request

### ✏️ unlikeSession
- **Descrição:** Remove a curtida de uma sessão.
- **Método HTTP:** DELETE
- **Rota:** `/likes`
- **Parâmetros:** body: { session_id }
- **Resposta:** 200 OK | 404 Not Found

---

## 📂 streakController.js

### ✏️ getStreak
- **Descrição:** Busca a streak do usuário logado.
- **Método HTTP:** GET
- **Rota:** `/streak`
- **Parâmetros:** nenhum
- **Resposta:** 200 OK

### ✏️ useStreakSave
- **Descrição:** Usa a salvação da streak.
- **Método HTTP:** POST
- **Rota:** `/streak/save`
- **Parâmetros:** nenhum
- **Resposta:** 200 OK | 400 Bad Request

### ✏️ getUserStreakById
- **Descrição:** Busca a streak pública de um usuário.
- **Método HTTP:** GET
- **Rota:** `/user/:id/streak`
- **Parâmetros:** params: id
- **Resposta:** 200 OK

---

## 📂 userController.js

### ✏️ createUser
- **Descrição:** Cria um novo usuário.
- **Método HTTP:** POST
- **Rota:** `/auth/register`
- **Parâmetros:** body: { name, email, password, height_cm, weight_kg }
- **Resposta:** 201 Created

### ✏️ login
- **Descrição:** Faz login de um usuário.
- **Método HTTP:** POST
- **Rota:** `/auth/login`
- **Parâmetros:** body: { email, password }
- **Resposta:** 200 OK

### ✏️ getLoggedUser
- **Descrição:** Busca dados do usuário logado.
- **Método HTTP:** GET
- **Rota:** `/auth/me`
- **Parâmetros:** nenhum
- **Resposta:** 200 OK

### ✏️ getAllUsers
- **Descrição:** Lista todos usuários.
- **Método HTTP:** GET
- **Rota:** `/users`
- **Parâmetros:** nenhum
- **Resposta:** 200 OK

### ✏️ getUserById
- **Descrição:** Busca usuário por ID.
- **Método HTTP:** GET
- **Rota:** `/user/:id`
- **Parâmetros:** params: id
- **Resposta:** 200 OK

### ✏️ updateUser
- **Descrição:** Atualiza dados do usuário.
- **Método HTTP:** PUT
- **Rota:** `/user/:id`
- **Parâmetros:** params: id, body: campos opcionais
- **Resposta:** 200 OK

### ✏️ deleteUser
- **Descrição:** Deleta um usuário.
- **Método HTTP:** DELETE
- **Rota:** `/user/:id`
- **Parâmetros:** params: id
- **Resposta:** 200 OK

### ✏️ searchUser
- **Descrição:** Busca usuário pelo nome.
- **Método HTTP:** GET
- **Rota:** `/users/search?query=xxx`
- **Parâmetros:** query: query
- **Resposta:** 200 OK

### ✏️ updateAdmin
- **Descrição:** Atualiza status admin de um usuário.
- **Método HTTP:** PUT
- **Rota:** `/user/:id/admin`
- **Parâmetros:** body: { is_admin }
- **Resposta:** 200 OK

### ✏️ getTrainingDays
- **Descrição:** Busca dias de treino de um usuário.
- **Método HTTP:** GET
- **Rota:** `/user/:id/training-days`
- **Parâmetros:** params: id
- **Resposta:** 200 OK

---
(continua para workoutSessionController, workoutExerciseController, workoutSetController, commentController e exerciseController...)

---

## 🧩 Models

# 📚 Documentação dos Models – Gym App

---

## 📂 user.js

### ✏️ User (Model)

- **Descrição:** Representa os usuários da aplicação.
- **Tabela:** `users`
- **Associações:**
  - Tem muitos `Follow` (seguindo e seguidores)
  - Tem um `UserStreak` (streak atual)

### 🧩 Campos

| Campo          | Tipo      | Regras                                    | Observações                  |
|:---------------|:----------|:------------------------------------------|:------------------------------|
| `name`         | STRING     | obrigatório                               | Nome do usuário               |
| `email`        | STRING     | obrigatório, único, formato email         | Email do usuário              |
| `password`     | STRING     | obrigatório                               | Senha criptografada           |
| `height_cm`    | INTEGER    | opcional, 100–250 cm                      | Altura em centímetros         |
| `weight_kg`    | FLOAT      | opcional, 30–350 kg                       | Peso em quilogramas           |
| `streak_count` | INTEGER    | padrão: 0, mínimo 0                       | Número de dias de treino      |
| `is_admin`     | BOOLEAN    | padrão: false                             | Se é admin                    |
| `is_public`    | BOOLEAN    | padrão: true                              | Perfil público ou privado     |

---

## 📂 userstreak.js

### ✏️ UserStreak (Model)

- **Descrição:** Representa a sequência (streak) de treinos do usuário.
- **Tabela:** `user_streaks`
- **Associações:**
  - Pertence a `User`

### 🧩 Campos

| Campo              | Tipo     | Regras                                  | Observações                    |
|:-------------------|:---------|:----------------------------------------|:-------------------------------|
| `user_id`           | INTEGER  | obrigatório                             | Chave estrangeira para `User`  |
| `current_streak`    | INTEGER  | padrão: 0                               | Dias consecutivos atuais       |
| `longest_streak`    | INTEGER  | padrão: 0                               | Maior sequência de treinos     |
| `last_workout_date` | DATEONLY | opcional                                | Última data de treino          |
| `can_use_save`      | BOOLEAN  | padrão: false                           | Pode usar salvamento?          |
| `save_expires_at`   | DATE     | opcional                                | Data limite para usar salvamento |

---

## 📂 workoutsession.js

### ✏️ WorkoutSession (Model)

- **Descrição:** Representa uma sessão de treino feita pelo usuário.
- **Tabela:** `workout_sessions`
- **Associações:**
  - Pertence a `User`
  - Tem muitos `Like`, `Comment` e `WorkoutExercise`

### 🧩 Campos

| Campo              | Tipo      | Regras                                    | Observações                    |
|:-------------------|:----------|:------------------------------------------|:-------------------------------|
| `user_id`           | INTEGER   | obrigatório                               | Chave estrangeira para `User`  |
| `title`             | STRING    | obrigatório, padrão: 'No title'            | Título da sessão               |
| `notes`             | TEXT      | opcional                                  | Notas gerais                   |
| `is_public`         | BOOLEAN   | obrigatório, padrão: true                  | Sessão pública ou privada      |
| `date`              | DATEONLY  | obrigatório                               | Data do treino                 |
| `duration_seconds`  | INTEGER   | obrigatório, padrão: 0                     | Duração em segundos            |

---

## 📂 workoutexercise.js

### ✏️ WorkoutExercise (Model)

- **Descrição:** Representa um exercício adicionado a uma sessão de treino.
- **Tabela:** `workout_exercises`
- **Associações:**
  - Pertence a `WorkoutSession`
  - Pertence a `Exercise`
  - Tem muitos `WorkoutSet`

### 🧩 Campos

| Campo               | Tipo      | Regras                                    | Observações                  |
|:--------------------|:----------|:------------------------------------------|:------------------------------|
| `workout_session_id` | INTEGER   | obrigatório                               | Sessão vinculada              |
| `exercise_id`        | INTEGER   | obrigatório                               | Exercício referenciado        |
| `name`               | STRING    | opcional                                  | Nome customizado opcional     |

---

## 📂 workoutset.js

### ✏️ WorkoutSet (Model)

- **Descrição:** Representa uma série (set) de um exercício dentro de uma sessão.
- **Tabela:** `workout_sets`
- **Associações:**
  - Pertence a `WorkoutExercise`, `WorkoutSession` e `Exercise`

### 🧩 Campos

| Campo                 | Tipo     | Regras                                   | Observações                |
|:----------------------|:---------|:-----------------------------------------|:----------------------------|
| `workout_exercise_id`  | INTEGER  | obrigatório                              | Exercício vinculado         |
| `workout_session_id`   | INTEGER  | obrigatório                              | Sessão vinculada            |
| `exercise_id`          | INTEGER  | obrigatório                              | Exercício referenciado      |
| `set_type`             | ENUM     | obrigatório, valores: Warmup, Feeder, Work, Top | Tipo da série         |
| `weight`               | FLOAT    | opcional, mínimo: 0                      | Peso usado (kg)             |
| `reps`                 | INTEGER  | obrigatório, mínimo: 0                   | Número de repetições        |
| `order`                | INTEGER  | obrigatório, mínimo: 1                   | Ordem do set                |
| `done`                 | BOOLEAN  | obrigatório, padrão: false               | Se o set foi concluído      |

---

## 📂 comment.js

### ✏️ Comment (Model)

- **Descrição:** Representa um comentário feito em uma sessão.
- **Tabela:** `comments`
- **Associações:**
  - Pertence a `User`
  - Pertence a `WorkoutSession`

### 🧩 Campos

| Campo        | Tipo    | Regras                          | Observações                 |
|:-------------|:--------|:---------------------------------|:----------------------------|
| `user_id`    | INTEGER | obrigatório                      | Usuário que comentou        |
| `session_id` | INTEGER | obrigatório                      | Sessão comentada            |
| `content`    | STRING  | obrigatório                      | Texto do comentário         |

---

## 📂 exercise.js

### ✏️ Exercise (Model)

- **Descrição:** Representa um exercício no sistema, global ou do usuário.
- **Tabela:** `exercises`
- **Associações:**
  - Pertence a `User` (criador)

### 🧩 Campos

| Campo         | Tipo      | Regras                                       | Observações              |
|:--------------|:----------|:---------------------------------------------|:-------------------------|
| `name`        | STRING     | obrigatório                                 | Nome do exercício         |
| `description` | STRING     | obrigatório                                 | Descrição breve           |
| `user_id`     | INTEGER    | opcional, onDelete: SET NULL                 | Criador do exercício      |
| `is_global`   | BOOLEAN    | obrigatório, padrão: false                   | Se é global ou pessoal    |
| `muscle_group`| STRING     | obrigatório, valores validados               | Grupo muscular trabalhado |

---

## 📂 follow.js

### ✏️ Follow (Model)

- **Descrição:** Representa o relacionamento de seguir/deixar de seguir entre usuários.
- **Tabela:** `follows`
- **Associações:**
  - Pertence a `User` (seguindo e seguidores)

### 🧩 Campos

| Campo           | Tipo      | Regras                      | Observações                     |
|:----------------|:----------|:-----------------------------|:--------------------------------|
| `follower_id`   | INTEGER    | obrigatório, onDelete: CASCADE | Quem está seguindo              |
| `following_id`  | INTEGER    | obrigatório, onDelete: CASCADE | Quem está sendo seguido         |

---

## 📂 like.js

### ✏️ Like (Model)

- **Descrição:** Representa uma curtida dada em uma sessão de treino.
- **Tabela:** `likes`
- **Associações:**
  - Pertence a `User`
  - Pertence a `WorkoutSession`

### 🧩 Campos

| Campo        | Tipo    | Regras       | Observações                     |
|:-------------|:--------|:-------------|:--------------------------------|
| `user_id`    | INTEGER | obrigatório  | Usuário que curtiu               |
| `session_id` | INTEGER | obrigatório  | Sessão curtida                   |

---

---

## 🧩 Middlewares

# 📚 Documentação dos Middlewares – Gym App

---

## 📂 authMiddleware.js

### ✏️ authMiddleware
- **Descrição:** Autentica o usuário usando o token JWT enviado no header Authorization.
- **Tipo:** Middleware global
- **Fluxo:** Verifica token → Decodifica → Adiciona usuário (`req.user`) → Libera acesso
- **Erro:** 401 Unauthorized se token ausente ou inválido

---

## 📂 exerciseMiddleware.js

### ✏️ isExerciseOwnerOrAdmin
- **Descrição:** Permite alterar ou excluir exercícios apenas se for o dono ou admin.

### ✏️ isExerciseGlobal
- **Descrição:** Impede que exercícios globais sejam alterados/deletados por usuários não-admin.

### ✏️ isExerciseInUse
- **Descrição:** Impede editar exercícios que já foram usados em sessões.

---

## 📂 isCommentOwner.js

### ✏️ isCommentOwner
- **Descrição:** Permite remover comentário apenas se for o dono ou admin.

---

## 📂 isFollowOwner.js

### ✏️ isFollowOwner
- **Descrição:** Permite alterar a relação de seguir apenas se for o seguidor dono da ação.

---

## 📂 isLikeOwner.js

### ✏️ isLikeOwner
- **Descrição:** Permite remover um like apenas se for o dono do like ou admin.

---

## 📂 ownershipMiddleware.js

### ✏️ isUserOwnerOrAdmin
- **Descrição:** Permite alterar dados apenas do próprio usuário ou se for admin.

### ✏️ isSessionOwnerOrAdmin
- **Descrição:** Permite alterar ou excluir uma sessão apenas se for dono ou admin.

### ✏️ isWorkoutExerciseOwnerOrAdmin
- **Descrição:** Permite alterar/excluir exercícios de sessão apenas se for dono ou admin.

### ✏️ canAddExerciseToOwnSession
- **Descrição:** Permite adicionar exercícios apenas em sessões próprias ou se for admin.

### ✏️ isAdmin
- **Descrição:** Restringe acesso somente a administradores.

---

## 📂 setMiddleware.js

### ✏️ isSetOwnerOrAdmin
- **Descrição:** Permite modificar ou excluir sets de treino apenas se for o dono da sessão ou admin.

---

## 📂 visibilityMiddleware.js

### ✏️ checkSessionVisibility
- **Descrição:** Permite visualizar sessão se ela for pública, própria ou usuário for admin.

### ✏️ checkProfileVisibility
- **Descrição:** Permite visualizar perfil se for público, próprio ou admin.

### ✏️ isLikeAuthorOrAdmin
- **Descrição:** Permite excluir um like se for o autor ou admin.

### ✏️ isCommentAuthorOrAdmin
- **Descrição:** Permite excluir ou alterar um comentário se for o autor ou admin.

---

---

## 🧩 Routes

# 📚 Documentação das Rotas – Gym App

---

## 📂 userRoutes.js

- **POST** `/register` → Registro de novo usuário
- **POST** `/login` → Login de usuário
- **GET** `/me` → Dados do usuário logado (auth)
- **GET** `/streak` → Streak atual do usuário logado (auth)
- **GET** `/:id/streak` → Streak de outro usuário (público)
- **POST** `/streak/save` → Usar save de streak (auth)
- **GET** `/search` → Buscar usuários (auth)
- **GET** `/:id` → Buscar perfil visível (auth + visibilidade)
- **GET** `/:id/training-days` → Buscar dias de treino (auth)
- **GET** `/` → Listar todos usuários (auth)
- **PUT** `/:id` → Atualizar dados do próprio usuário (auth + owner)
- **PUT** `/:id/admin` → Atualizar status admin (auth + owner)
- **DELETE** `/:id` → Deletar usuário (auth + owner)

---

## 📂 workoutSessionRoutes.js

- **GET** `/` → Listar todas sessões do usuário (auth)
- **GET** `/search` → Buscar sessões públicas por título (auth)
- **GET** `/user/:id/public-sessions` → Listar sessões públicas de usuário (auth)
- **GET** `/:id/prs` → Buscar PRs de uma sessão (auth)
- **GET** `/:id` → Buscar sessão única (auth + visibilidade)
- **GET** `/user/:id` → Listar sessões do usuário (auth)
- **POST** `/` → Criar nova sessão (auth)
- **PUT** `/:id` → Atualizar sessão (auth + owner)
- **DELETE** `/:id` → Deletar sessão (auth + owner)

---

## 📂 workoutExerciseRoutes.js

- **GET** `/` → Listar todos exercícios de sessões (auth)
- **GET** `/workout/:id` → Buscar exercícios de uma sessão (auth)
- **POST** `/` → Adicionar exercício à sessão (auth + owner da sessão)
- **PUT** `/:id` → Atualizar exercício da sessão (auth + owner)
- **DELETE** `/:id` → Deletar exercício da sessão (auth + owner)

---

## 📂 workoutSetRoutes.js

- **POST** `/:exerciseId` → Criar novo set (auth)
- **GET** `/exercise/:workoutExerciseId` → Buscar sets de um exercício (auth)
- **GET** `/:id` → Buscar um set específico (auth)
- **PUT** `/:id` → Atualizar set (auth + owner)
- **DELETE** `/:id` → Deletar set (auth + owner)

---

## 📂 commentRoutes.js

- **GET** `/:sessionId` → Buscar comentários de uma sessão (auth)
- **POST** `/` → Comentar em uma sessão (auth)
- **DELETE** `/:id` → Deletar comentário (auth + dono)

---

## 📂 exerciseRoutes.js

- **GET** `/` → Listar exercícios disponíveis (auth)
- **GET** `/with-pr` → Listar exercícios com PRs (auth)
- **GET** `/search` → Buscar exercícios pelo nome (auth)
- **GET** `/admin/exercises` → Listar todos exercícios (admin)
- **POST** `/` → Criar exercício personalizado (auth)
- **PUT** `/:id` → Atualizar exercício próprio (auth + regras específicas)
- **DELETE** `/:id` → Deletar exercício próprio (auth + regras específicas)

---

## 📂 feedRoutes.js

- **GET** `/` → Buscar feed público de sessões (auth)

---

## 📂 followRoutes.js

- **POST** `/:userId` → Seguir usuário (auth)
- **DELETE** `/:userId` → Deixar de seguir (auth + owner)
- **GET** `/followers/:userId` → Listar seguidores (auth)
- **GET** `/following/:userId` → Listar seguindo (auth)
- **GET** `/check/:userId` → Verificar se está seguindo (auth)

---

## 📂 likeRoutes.js

- **POST** `/` → Curtir sessão (auth)
- **DELETE** `/` → Descurtir sessão (auth)

---