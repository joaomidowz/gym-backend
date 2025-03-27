const express = require('express')
const router = express.Router()
const workoutSessionController= require('../controllers/workoutSessionController')
const authMiddleware = require('../middlewares/authMiddleware')
const { checkSessionVisibility } = require('../middlewares/visibilityMiddleware')

// GET 
router.get('/', authMiddleware, workoutSessionController.getAllSessions)

// GET USER
router.get('/user/:id', authMiddleware, workoutSessionController.getSessionByUser)

// GET UNIQUE SESSION
router.get('/:id', authMiddleware, checkSessionVisibility, workoutSessionController.getSessionById)

//POST
router.post('/', authMiddleware, workoutSessionController.createSession)

//PUT
router.put('/:id', authMiddleware, workoutSessionController.updateSession)

//DELETE
router.delete('/:id', authMiddleware, workoutSessionController.deleteSession)

module.exports = router