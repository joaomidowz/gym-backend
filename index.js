const express = require('express')
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes')
const app = express()
const PORT = 3001;

// Middlewares
app.use(express.json());

// Fast test
app.get('/', (req, res) => {
    res.send('API Gym App is running');
});

// Routes
app.get('/', (req, res) => res.send('API Gym App is running'));

// Routes -> User
app.use('/user', userRoutes)

// Initiate
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('🟢 connection is successful')
        console.log(`🚀 Server running in: http://localhost:${PORT}`);
    } catch (error) {
        rconsole.log('🔴 connection error', error)
    }
})