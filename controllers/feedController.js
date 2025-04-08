const {
  WorkoutSession,
  User,
  Like,
  Comment,
  WorkoutExercise,
  WorkoutSet,
  Exercise,
} = require('../models');

const getPublicFeed = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  try {
    const sessions = await WorkoutSession.findAll({
      where: { is_public: true },
      order: [['date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'is_public'],
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['id', 'user_id'],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'user_id', 'content', 'createdAt'],
          include: {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
          },
        },
        {
          model: WorkoutExercise,
          as: 'workout_exercises',
          include: [
            {
              model: WorkoutSet,
              as: 'workout_sets',
              attributes: ['weight'],
            },
            {
              model: Exercise,
              as: 'exercise',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    const formatted = sessions.map((session) => {
      const allSets = session.workout_exercises.flatMap((ex) => ex.workout_sets || []);
      const totalSets = allSets.length;
      const totalWeight = allSets.reduce((sum, set) => sum + (set.weight || 0), 0);

      return {
        id: session.id,
        title: session.title,
        notes: session.notes,
        date: session.date,
        user: {
          id: session.owner?.id,
          name: session.owner?.name || "Desconhecido",
          is_public: session.owner?.is_public,
        },
        like_count: session.likes.length,
        comments_count: session.comments.length,
        total_sets: totalSets,
        total_weight: totalWeight,
        comments: session.comments,
      };
    });

    res.json({ sessions: formatted });
  } catch (error) {
    console.error('Feed error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPublicFeed,
};
