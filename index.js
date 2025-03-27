const express = require('express')
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes')
const exerciseRoutes = require('./routes/exerciseRoutes')
const workoutSessionRoutes = require('./routes/workoutSessionRoutes')
const workoutExercisesRoutes = require('./routes/workoutExerciseRoutes')

const app = express()
const PORT = 3001;

// Middlewares
app.use(express.json());

// Fast Test
app.get('/', (req, res) => res.send('API Gym App is running'));

// Routes 
app.use('/user', userRoutes)
app.use('/exercises', exerciseRoutes)
app.use('/workout-session', workoutSessionRoutes)
app.use('/workout-exercise', workoutExercisesRoutes)

// Initiate
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('🟢 connection is successful')
        console.log(`🚀 Server running in: http://localhost:${PORT}`);
    } catch (error) {
        console.log('🔴 connection error', error)
    }
})