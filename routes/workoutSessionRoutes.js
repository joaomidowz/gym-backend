const express = require('express')
const router = express.Router()
const workoutSessionController= require('../controllers/workoutSessionController')
const authMiddleware = require('../middlewares/authMiddleware')

// GET 
router.get('/', authMiddleware, workoutSessionController.getAllSessions)
router.get('/user/:id', authMiddleware, workoutSessionController.getSessionByUser)

//POST
router.post('/', authMiddleware, workoutSessionController.createSession)

//PUT
router.get('/:id', authMiddleware, workoutSessionController.updateSession)

//DELETE
router.get('/:id', authMiddleware, workoutSessionController.deleteSession)

module.exports = router