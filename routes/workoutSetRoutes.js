const express = require('express')
const router = express.Router()
const workoutSetController= require('../controllers/workoutSetController')
const authMiddleware = require('../middlewares/authMiddleware')
const isSetOwnerOrAdmin = require('../middlewares/setMiddleware')

//All protected
router.use(authMiddleware)

// POST
router.post('/:exerciseId', workoutSetController.createSet)

// GET
router.get('/exercise/:workoutExerciseId', workoutSetController.getSetsByExercise)

// UPDATE
router.put('/:id', isSetOwnerOrAdmin, workoutSetController.updateSet)

// DELETE
router.delete('/:id', isSetOwnerOrAdmin, workoutSetController.deleteSet)

module.exports = router