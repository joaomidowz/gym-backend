const express = require('express')
const router = express.Router()
const workoutExerciseController= require('../controllers/workoutExerciseController')
const authMiddleware = require('../middlewares/authMiddleware')
const { WorkoutSession } = require('../models'); // <- adiciona isso
const { isWorkoutExerciseOwnerOrAdmin, canAddExerciseToOwnSession } = require('../middlewares/ownershipMiddleware')

//GET
router.get('/', authMiddleware, workoutExerciseController.getAllWorkoutExercises)
router.get('/workout/:id', authMiddleware, workoutExerciseController.getWorkoutExerciseByWorkoutId)

//POST
router.post('/', authMiddleware, canAddExerciseToOwnSession, workoutExerciseController.createWorkoutExercise)

//PUT
router.put('/:id', authMiddleware, isWorkoutExerciseOwnerOrAdmin, workoutExerciseController.updateWorkoutExercise)

router.get('/teste-session/:id', async (req, res) => {
    const session = await WorkoutSession.findByPk(req.params.id);
    if (!session) return res.status(404).json({ message: 'Sessão não existe.' });
    res.json(session);
  });

//DELETE
router.delete('/:id', authMiddleware, isWorkoutExerciseOwnerOrAdmin, workoutExerciseController.deleteWorkoutExercise)

module.exports = router