const express = require('express')
const router = express.Router()
const workoutExerciseController= require('../controllers/workoutExerciseController')

//GET
router.get('/', workoutExerciseController.getAllWorkoutExercises)
router.get('/workout/:id', workoutExerciseController.getWorkoutExerciseByWorkoutId)

//POST
router.post('/', workoutExerciseController.createWorkoutExercise)

//PUT
router.put('/:id', workoutExerciseController.updateWorkoutExercise)

//DELETE
router.delete('/:id', workoutExerciseController.deleteWorkoutExercise)

module.exports = router