const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController')
const authMiddleware = require('../middlewares/authMiddleware');
const  isLikeOwner = require('../middlewares/isLikeOwner')

//POST
router.post('/', authMiddleware, likeController.likeSession)

//DELETE
router.delete('/:id', authMiddleware, isLikeOwner, likeController.unlikeSession)

module.exports = router