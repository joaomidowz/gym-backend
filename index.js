import cors from 'cors'
const express = require('express')
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes')
const exerciseRoutes = require('./routes/exerciseRoutes')
const workoutSessionRoutes = require('./routes/workoutSessionRoutes')
const workoutExercisesRoutes = require('./routes/workoutExerciseRoutes')
const likeRoutes = require('./routes/likeRoutes')
const commentRoutes = require('./routes/commentRoutes')
const feedRoutes = require('./routes/feedRoutes')
const followRoutes = require('./routes/followRoutes')
const workoutSetRoutes = require('./routes/workoutSetRoutes')

const app = express()
const PORT = 3001;

// Middlewares
// Allowed frontends
const allowedOrigins = ['http://localhost:3000', 'https://gym-app.vercel.app']

app.use(cors({
    origin: allowedOrigins,
    credentials: true // se for trabalhar com cookies no futuro
  }))
 
app.use(express.json());

// Fast Test
app.get('/', (req, res) => res.send('API Gym App is running'));

// Routes 
app.use('/user', userRoutes)
app.use('/follow', followRoutes)
app.use('/exercises', exerciseRoutes)
app.use('/workout-session', workoutSessionRoutes)
app.use('/workout-exercise', workoutExercisesRoutes)
app.use('/workout-set', workoutSetRoutes)
app.use('/likes', likeRoutes)
app.use('/comments', commentRoutes)
app.use('/feed', feedRoutes)


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