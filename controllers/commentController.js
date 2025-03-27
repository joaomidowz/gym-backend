const { Comment, WorkoutSession } = require('../models')

const postComment = async (req, res) => {
    const { session_id, text } = req.body

    try {
        const session = await WorkoutSession.findByPk(session_id)

        if (!session || !session.is_public) return res.status(403).json({ message: 'You can only comment on public session.' })

        const comment = await Comment.create({
            user_id: req.user.id,
            session_id,
            content: text
        })

        return res.status(201).json(comment)
    } catch (error) {
        console.error('[POST COMMENT ERROR]', error);
        return res.status(500).json({ message: 'Error posting comment.', error });
    }
}

const getCommentBySession = async (req, res) => {
    try {
        const comments = await Comment.findAll({

            where: { session_id: req.params.sessionId },
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