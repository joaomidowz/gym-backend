const express = require('express')
const router = express.Router()
const workoutExerciseController= require('../controllers/workoutExerciseController')
const authMiddleware = require('../middlewares/authMiddleware')
const { isWorkoutExerciseOwnerOrAdmin, canAddExerciseToOwnSession } = require('../middlewares/ownershipMiddleware')

//GET
router.get('/', authMiddleware, workoutExerciseController.getAllWorkoutExercises)
router.get('/workout/:id', authMiddleware, workoutExerciseController.getWorkoutExerciseByWorkoutId)

//POST
router.post('/', authMiddleware, canAddExerciseToOwnSession, workoutExerciseController.createWorkoutExercise)

//PUT
router.put('/:id', authMiddleware, isWorkoutExerciseOwnerOrAdmin, workoutExerciseController.updateWorkoutExercise)

//DELETE
router.delete('/:id', authMiddleware, isWorkoutExerciseOwnerOrAdmin, workoutExerciseController.deleteWorkoutExercise)

module.exports = router