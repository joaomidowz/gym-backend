const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exerciseController')
const authMiddleware = require('../middlewares/authMiddleware');


// GET /exercises
router.get('/', authMiddleware, exerciseController.getAllExercise)

// POST /exercises
router.post('/',authMiddleware, exerciseController.createExercise)

// PUT /exercises
router.put('/:id', authMiddleware, exerciseController.alterExercise)

// DELETE /exercises
router.delete('/:id',authMiddleware, exerciseController.deleteExercise)

module.exports = router