const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middlewares/authMiddleware');
const isCommentOwner = require('../middlewares/isCommentOwner')

//GET
router.get('/:sessionId', authMiddleware, commentController.getCommentBySession)

//POST
router.post('/', authMiddleware, commentController.postComment)

//DELETE
router.delete('/:id', authMiddleware, isCommentOwner, commentController.deleteComment)

module.exports = router