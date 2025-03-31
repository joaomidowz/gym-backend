const { WorkoutSession, User, Like, Comment } = require('../models')

const getPublicFeed = async (req, res) => {
    const { limit = 20, offset = 0 } = req.query

    try {
        const sessions = await WorkoutSession.findAll({
            where: { is_public: true },
            order: [['date', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'is_public']
                },
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['id', 'user_id']
                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['id', 'user_id', 'content', 'createdAt'],
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name']
                    }
                }
            ]
        })

        const formatted = sessions.map(session => ({
            id: session.id,
            title: session.title,
            date: session.date,
            user: session.user,
            like_count: session.likes.length,
            comments_count: session.comments.length,
            comments: session.comments
        }))

        res.json({ sessions: formatted })

    } catch (error) {
        console.error('Feed error:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getPublicFeed
}