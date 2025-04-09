const { Comment, WorkoutSession, User } = require('../models')

const postComment = async (req, res) => {
    const { session_id, content } = req.body

    try {
        const session = await WorkoutSession.findByPk(session_id)

        if (!session || !session.is_public) return res.status(403).json({ message: 'You can only comment on public session.' })

        const comment = await Comment.create({
            user_id: req.user.id,
            session_id,
            content
        })

        const fullComment = await Comment.findByPk(comment.id, {
            include: {
              model: User,
              as: 'user',
              attributes: ['id', 'name'],
            },
          });

        return res.status(201).json(fullComment)
    } catch (error) {
        console.error('[POST COMMENT ERROR]', error);
        return res.status(500).json({ message: 'Error posting comment.', error });
    }
}

const getCommentBySession = async (req, res) => {
    try {
        const comments = await Comment.findAll({

            where: { session_id: req.params.sessionId },
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name'],
            },
            order: [['createdAt', 'DESC']]
        })

        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json({ message: 'Error fechting comment.' })
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id)

        if (!comment) return res.status(404).json({ message: 'Comment not found' })

        await comment.destroy()
        return res.status(200).json({ message: 'Comment deleted susccessfully.' })
    } catch (error) {
        return res.status(500).json({ message: 'Error to delete comment.' })
    }
}


module.exports = {
    postComment,
    getCommentBySession,
    deleteComment
}