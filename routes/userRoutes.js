const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const { checkProfileVisibility } = require('../middlewares/visibilityMiddleware');
const { isUserOwnerOrAdmin } = require('../middlewares/ownershipMiddleware');

// PUBLIC ROUTES
router.post('/register', userController.createUser)
router.post('/login', userController.login)

// PRIVATE ROUTE
router.get('/me', authMiddleware, userController.getLoggedUser);
router.get('/:id', authMiddleware, checkProfileVisibility, userController.getUserById)

// PROTECTED ROUTES
router.get('/', authMiddleware, userController.getAllUsers)
router.put('/:id', authMiddleware, isUserOwnerOrAdmin, userController.updateUser)
router.delete('/:id', authMiddleware, isUserOwnerOrAdmin, userController.deleteUser)

module.exports = router;