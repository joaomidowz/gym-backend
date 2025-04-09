const { Like, WorkoutSession } = require('../models')

const likeSession = async (req, res) => {
    const { session_id } = req.body

    try {
        const session = await WorkoutSession.findByPk(session_id)

        if (!session || !session.is_public) return res.status(403).json({ message: 'You only can like public sessions.' })

        const alreadyLike = await Like.findOne({ where: { user_id: req.user.id, session_id: session_id } })

        if (alreadyLike) {
            return res.status(400).json({ message: 'You already liked this session ' })
        }

        const like = await Like.create({ user_id: req.user.id, session_id })

        return res.status(201).json(like)
    } catch (error) {
        return res.status(500).json({ message: 'error on like this session ' })
    }
}

const unlikeSession = async (req, res) => {
    const { session_id } = req.body;
  
    try {
      const like = await Like.findOne({
        where: { session_id, user_id: req.user.id }
      });
  
      if (!like) return res.status(404).json({ message: 'Like not found.' });
  
      await like.destroy();
  
      return res.status(200).json({ message: 'Like removed successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error to remove like from this session' });
    }
  };
  
module.exports = {
    likeSession,
    unlikeSession
}