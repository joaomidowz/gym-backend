const { Comment } = require('../models')

const isCommentOwner = async (req, res, next) => {
    try {
        const comment = await Comment.findByPk(req.params.id)

        if (!comment) return res.status(404).json({ message: 'comment not found' })

        if (req.user.is_admin || comment.user_id === req.user.id) return next()

        return res.status(403).json({ message: 'You dont have permission to remove this comment' })
    } catch (error) {
        return res.status(500).json({ message: 'Error to verify the permission of the comment' })
    }
}

module.exports = isCommentOwner