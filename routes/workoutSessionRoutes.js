const express = require('express')
const router = express.Router()
const workoutSessionController= require('../controllers/workoutSessionController')
const prController= require('../controllers/prController')
const authMiddleware = require('../middlewares/authMiddleware')
const { checkSessionVisibility } = require('../middlewares/visibilityMiddleware')
const { isSessionOwnerOrAdmin } = require('../middlewares/ownershipMiddleware')

// GET 
router.get('/', authMiddleware, workoutSessionController.getAllSessions)
router.get('/search', authMiddleware, workoutSessionController.searchSession)
router.get('/user/:id/public-sessions', authMiddleware, workoutSessionController.getPublicSessionsByUser);
router.get('/:id/prs', authMiddleware, prController.getPRsBySession);

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