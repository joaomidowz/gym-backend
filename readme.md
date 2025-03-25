# 🏋️ Gym App - Backend

Este é o backend da aplicação **Gym App**, feita para gerenciar usuários, treinos, streaks e tudo o que envolve um ambiente de academia moderna 💪

## 🔧 Tecnologias utilizadas

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL (Railway)
- Nodemon (dev)
- Sequelize CLI

## 📁 Estrutura do projeto

``

## 🚀 Como rodar localmente

```bash
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
