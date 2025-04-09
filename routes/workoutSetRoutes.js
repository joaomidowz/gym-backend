const express = require('express')
const router = express.Router()
const workoutSetController = require('../controllers/workoutSetController')
const authMiddleware = require('../middlewares/authMiddleware')
const isSetOwnerOrAdmin = require('../middlewares/setMiddleware')

router.use(authMiddleware)

// POST /workout-set/:exerciseId
router.post('/:exerciseId', workoutSetController.createSet)

// GET /workout-set/exercise/:workoutExerciseId
router.get('/exercise/:workoutExerciseId', workoutSetController.getSetsByExercise)

// GET /workout-set/:id
router.get('/:id', workoutSetController.getSetById)

// PUT /workout-set/:id
router.put('/:id', isSetOwnerOrAdmin, workoutSetController.updateSet)

// DELETE /workout-set/:id
router.delete('/:id', isSetOwnerOrAdmin, workoutSetController.deleteSet)

module.exports = router
