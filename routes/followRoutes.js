const express = require('express')
const router = express.Router()
const followController = require('../controllers/followController')
const authMiddleware = require('../middlewares/authMiddleware');

// FOLLOW
router.post('/:userId', authMiddleware, followController.followUser)

// UNFOLLOW
router.delete('/:userId', authMiddleware, followController.unfollowUser)

// FOLLOWERS
router.get('/followers/:userId', authMiddleware, followController.getFollowers)

// FOLLOWING
router.get('/following/:userId', authMiddleware, followController.getFollowing)

module.exports = router