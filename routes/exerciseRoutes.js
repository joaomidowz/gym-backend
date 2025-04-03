const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exerciseController')
const authMiddleware = require('../middlewares/authMiddleware');
const { isExerciseGlobal, isExerciseInUse, isExerciseOwnerOrAdmin } = require('../middlewares/exerciseMiddleware');


// GET /exercises
router.get('/', authMiddleware, exerciseController.getAllExercise)
router.get('/search', authMiddleware, exerciseController.searchExercise)

// POST /exercises
router.post('/',authMiddleware, exerciseController.createExercise)

// PUT /exercises
router.put('/:id', authMiddleware, isExerciseOwnerOrAdmin, isExerciseGlobal, isExerciseInUse,  exerciseController.alterExercise)

// DELETE /exercises
router.delete('/:id',authMiddleware,  isExerciseOwnerOrAdmin, isExerciseGlobal, isExerciseInUse, exerciseController.deleteExercise)

module.exports = router