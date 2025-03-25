const express = require('express')
const { sequelize, User } = require('./models');
const app = express()
const PORT = 3001;

// Middlewares
app.use(express.json());

// Fast test
app.get('/', (req, res) => {
    res.send('API Gym App is running');
});

// Create user
app.post('/user', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.create({ name, email, password });
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// List user
app.get('/user', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// 
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('🟢 connection is successful')
        console.log(`🚀 Server running in: http://localhost:${PORT}`);
    } catch (error) {
        rconsole.log('🔴 connection error', error)
    }
})