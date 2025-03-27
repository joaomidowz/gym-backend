const { WorkoutSession } = require('../models')

async function checkSessionVisibility(req, res, next) {
    const sessionId = req.params.id

    try {
        const session = await WorkoutSession.findByPk(sessionId)

        if (!session) return res.status(404).json({ message: 'Session not found.' })

        const isOwner = req.user && req.user.id === session.user_id
        const isPublic = session.is_public

        if (isPublic || isOwner || req.user?.is_admin) {
            req.session = session
            return next()
        }

        return res.status(403).json({ message: 'You dont have permission to access this session.' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal error.', error: error.message })
    }
}

const { User } = require('../models')

async function checkProfileVisibility(req, res, next) {
    const profileId = req.params.id

    try {
        const profile = await User.findByPk(profileId)

        if (!profile) return res.status(404).json({ message: 'profile not found.' })

        const isOwner = req.user && req.user.id === profile.id
        const isPublic = profile.is_public

        if (isPublic || isOwner || req.user?.is_admin) {
            req.profile = profile
            return next()
        }

        return res.status(403).json({ message: 'You dont have permission to access this perfil.' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal error.', error: error.message })
    }
}

const { Like } = require('../models')

async function isLikeAuthorOrAdmin(req, res, next) {
    const likeId = req.params.id

    try {
        const like = await Like.findByPk(likeId)

        if (!like) return res.status(404).json({ message: 'like not found.' })

            
        if (like.user_id === req.user.id) {
            req.like = like
            return next()
        }

        return res.status(403).json({ message: 'You do not have permission to remove this like.' })


    } catch (error) {
        return res.status(500).json({ message: 'Internal error.', error: error.message })
    }
}

const { Comment } = require('../models')

async function isCommentAuthorOrAdmin(req, res, next) {
    const commentId = req.params.id

    try {
        const comment = await Comment.findByPk(commentId)

        if (!comment) return res.status(404).json({ message: 'Comment not found.' })

            
        if (comment.user_id === req.user.id || req.user?.is_admin) {
            req.comment = comment
            return next()
        }

        return res.status(403).json({ message: 'You do not have permission to modify this comment.' })


    } catch (error) {
        return res.status(500).json({ message: 'Internal error.', error: error.message })
    }
}

module.exports = {
    checkSessionVisibility,
    checkProfileVisibility,
    isLikeAuthorOrAdmin,
    isCommentAuthorOrAdmin
}