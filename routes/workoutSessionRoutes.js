const express = require('express')
const router = express.Router()
const workoutSessionController= require('../controllers/workoutSessionController')
const authMiddleware = require('../middlewares/authMiddleware')
const { checkSessionVisibility } = require('../middlewares/visibilityMiddleware')
const { isSessionOwnerOrAdmin } = require('../middlewares/ownershipMiddleware')

// GET 
router.get('/', authMiddleware, workoutSessionController.getAllSessions)

// GET UNIQUE SESSION
router.get('/:id', authMiddleware, checkSessionVisibility, workoutSessionController.getSessionById)

// GET USER
router.get('/user/:id', authMiddleware, workoutSessionController.getSessionByUser)


//POST
router.post('/', authMiddleware, workoutSessionController.createSession)

//PUT
router.put('/:id', authMiddleware, isSessionOwnerOrAdmin, workoutSessionController.updateSession)

//DELETE
router.delete('/:id', authMiddleware, isSessionOwnerOrAdmin, workoutSessionController.deleteSession)

module.exports = router