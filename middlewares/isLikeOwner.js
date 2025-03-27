const { Like } = require('../models')

const isLikeOwner = async (req, res, next) => {
    try {
        const like = await Like.findByPk(req.params.id)

        if (!like) return res.status(404).json({ message: 'Like not found' })

        if (req.user.is_admin || like.user_id === req.user.id) return next()

        return res.status(403).status.json({ message: 'You dont have permission to remove this like' })
    } catch (error) {
        return res.status(500).json({ message: 'Error to verify the permission of the like' })
    }
}

module.exports = isLikeOwner