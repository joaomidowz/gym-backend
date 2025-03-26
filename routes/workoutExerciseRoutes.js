const express = require('express')
const router = express.Router()
const workoutExerciseController= require('../controllers/workoutExerciseController')
const authMiddleware = require('../middlewares/authMiddleware')

//GET
router.get('/', authMiddleware, workoutExerciseController.getAllWorkoutExercises)
router.get('/workout/:id', authMiddleware, workoutExerciseController.getWorkoutExerciseByWorkoutId)

//POST
router.post('/', authMiddleware, workoutExerciseController.createWorkoutExercise)

//PUT
router.put('/:id', authMiddleware, workoutExerciseController.updateWorkoutExercise)

//DELETE
router.delete('/:id', authMiddleware, workoutExerciseController.deleteWorkoutExercise)

module.exports = router