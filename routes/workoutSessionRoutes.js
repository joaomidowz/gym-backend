const express = require('express')
const router = express.Router()
const workoutSessionController= require('../controllers/workoutSessionController')

// GET 
router.get('/', workoutSessionController.getAllSessions)
router.get('/user/:id', workoutSessionController.getSessionByUser)

//POST
router.post('/', workoutSessionController.createSession)

//PUT
router.get('/:id', workoutSessionController.updateSession)

//DELETE
router.get('/:id', workoutSessionController.deleteSession)

module.exports = router