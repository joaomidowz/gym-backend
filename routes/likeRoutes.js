const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController')
const authMiddleware = require('../middlewares/authMiddleware');

//POST
router.post('/', authMiddleware, likeController.likeSession)

//DELETE
router.delete('/', authMiddleware, likeController.unlikeSession)

module.exports = router