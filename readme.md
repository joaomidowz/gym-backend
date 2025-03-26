# 🏋️ Gym App - Backend

Este é o backend da aplicação **Gym App**, feita para gerenciar usuários, treinos, streaks e tudo o que envolve um ambiente de academia moderna 💪

---

## 🔧 Tecnologias utilizadas

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL (Railway)
- Nodemon (dev)
- Sequelize CLI

---

## 🌐 Variáveis de Ambiente (produção)

Configure essas variáveis no painel do Railway (ou serviço de deploy):

- `DB_USER`
- `DB_PASS`
- `DB_NAME`
- `DB_HOST`
- `DB_PORT`
- `JWT_SECRET`

Ou use `DATABASE_URL` para produção.

---

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
bash
Copiar
Editar
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