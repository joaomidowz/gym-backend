const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const { checkProfileVisibility } = require('../middlewares/visibilityMiddleware');
const { isUserOwnerOrAdmin } = require('../middlewares/ownershipMiddleware');
const { getStreak, useStreakSave, getUserStreakById  } = require('../controllers/streakController');


// PUBLIC ROUTES
router.post('/register', userController.createUser)
router.post('/login', userController.login)

// PRIVATE ROUTE
router.get('/me', authMiddleware, userController.getLoggedUser);
router.get('/streak', authMiddleware, getStreak);
router.get("/:id/streak", getUserStreakById);
router.post('/streak/save', authMiddleware, useStreakSave);
router.get('/search', authMiddleware, userController.searchUser)
router.get('/:id', authMiddleware, checkProfileVisibility, userController.getUserById)
router.get('/:id/training-days', authMiddleware, userController.getTrainingDays);

// PROTECTED ROUTES
router.get('/', authMiddleware, userController.getAllUsers)
router.put('/:id', authMiddleware, isUserOwnerOrAdmin, userController.updateUser)
router.put('/:id/admin', authMiddleware, isUserOwnerOrAdmin, userController.updateAdmin)
router.delete('/:id', authMiddleware, isUserOwnerOrAdmin, userController.deleteUser)

module.exports = router;