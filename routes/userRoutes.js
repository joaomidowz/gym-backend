const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.get('/', userController.getAllUsers)
router.put('/:id', userController.getAllUsers)
router.delete('/:id', userController.deleteUser)

module.exports = router;