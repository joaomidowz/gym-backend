const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exerciseController')

// GET /exercises
router.get('/', exerciseController.getAllExercise)

// POST /exercises
router.post('/', exerciseController.createExercise)

// PUT /exercises
router.put('/:id', exerciseController.alterExercise)

// DELETE /exercises
router.delete('/:id', exerciseController.deleteExercise)

module.exports = router