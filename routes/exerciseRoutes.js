const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exerciseController')
const authMiddleware = require('../middlewares/authMiddleware');
const { isExerciseGlobal, isExerciseInUse, isExerciseOwnerOrAdmin } = require('../middlewares/exerciseMiddleware');
const { isAdmin } = require('../middlewares/ownershipMiddleware');


// GET /exercises
router.get('/', authMiddleware, exerciseController.getAllExercise)
router.get('/search', authMiddleware, exerciseController.searchExercise)
router.get("/admin/exercises", authMiddleware, isAdmin, exerciseController.getExercisesAdmin);

// POST /exercises
router.post('/', authMiddleware, exerciseController.createExercise)

// PUT /exercises
router.put(
    '/:id',
    authMiddleware,
    isExerciseOwnerOrAdmin,
    isExerciseInUse,
    isExerciseGlobal,
    exerciseController.alterExercise
);

// DELETE /exercises
router.delete(
    '/:id',
    authMiddleware,
    isExerciseOwnerOrAdmin,
    isExerciseInUse,
    isExerciseGlobal,
    exerciseController.deleteExercise
);

module.exports = router