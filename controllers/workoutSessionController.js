const { Op } = require("sequelize");
const { WorkoutSession, User, Like, Comment, WorkoutExercise, WorkoutSet, Exercise } = require('../models');
const { updateUserStreak } = require('../utils/streakUtils');

// GET /workout-session
const getAllSessions = async function (req, res) {
    try {
        const sessions = await WorkoutSession.findAll({
            where: { user_id: req.user.id },
            order: [['date', 'DESC']],
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
                createdAt: session.createdAt,
                user: session.owner,
                like_count: session.likes.length,
                comments_count: session.comments.length,
                total_sets: totalSets,
                total_weight: totalWeight,
                comments: session.comments,
                duration_seconds: session.duration_seconds,
            };
        });

        res.json(formatted);
    } catch (error) {
        console.error('Get sessions error:', error);
        res.status(500).json({ error: error.message });
    }
};


// POST /workout-session
const createSession = async (req, res) => {
    const { date, is_public = true, title, notes, duration_seconds = 0 } = req.body;

    if (!title || !date) return res.status(400).json({ error: 'title and date are required' });

    try {
        const sessions = await WorkoutSession.create({
            user_id: req.user.id,
            date,
            is_public,
            title,
            notes,
            duration_seconds,
        });

        const updatedStreak = await updateUserStreak(req.user.id, date);

        res.status(201).json({
            message: 'Workout session created successfuly',
            sessions,
            streak: {
                current_streak: updatedStreak.current_streak,
                longest_streak: updatedStreak.longest_streak,
                last_workout_date: updatedStreak.last_workout_date
            }
        });
    } catch (error) {
        console.error('Create sessions error:', error);
        res.status(500).json({ error: error.message });
    }
}

// GET /user/:id/session
const getSessionByUser = async (req, res) => {
    const { id } = req.params;

    try {
        const sessions = await WorkoutSession.findAll({ where: { user_id: id } });
        if (sessions.length === 0) {
            return res.status(404).json({ message: 'No sessions found for this user.' });
        }
        res.json(sessions);
    } catch (error) {
        console.error('Get user sessions error:', error);
        res.status(500).json({ error: error.message });
    }
}

const getSessionById = async (req, res) => {
    try {
        const { id } = req.params;

        const session = await WorkoutSession.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'name'],
                },
            ],
        });

        if (!session) {
            return res.status(404).json({ error: "Sessão não encontrada" });
        }

        return res.status(200).json(session);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// PUT /workout-session/:id
const updateSession = async (req, res) => {
    const { id } = req.params;
    const { title, date, is_public, notes, duration_seconds } = req.body;

    if (!title && !date && typeof is_public === 'undefined' && !notes && typeof duration_seconds === 'undefined') {
        return res.status(400).json({ error: 'At least one field (title, date, is_public, notes, duration_seconds) must be provided' });
    }

    try {
        const session = await WorkoutSession.findByPk(id);
        if (!session) return res.status(404).json({ error: 'Workout session not found' });

        if (duration_seconds !== undefined) session.duration_seconds = duration_seconds;
        if (title !== undefined) session.title = title;
        if (date !== undefined) session.date = date;
        if (is_public !== undefined) session.is_public = is_public;
        if (notes !== undefined) session.notes = notes;

        await session.save();

        res.json({ message: 'Workout session updated successfully', session });
    } catch (error) {
        console.error('Update sessions error:', error);
        res.status(500).json({ error: error.message });
    }
}

const deleteSession = async (req, res) => {
    const { id } = req.params;

    try {
        const session = await WorkoutSession.findByPk(id);
        if (!session) return res.status(404).json({ error: 'Workout session not found' });

        await session.destroy();

        res.json({ message: 'Workout session deleted successfully' });
    } catch (error) {
        console.error('Delete sessions error:', error);
        res.status(500).json({ error: error.message });
    }
}

// GET //exercise=query
const searchSession = async (req, res) => {
    const query = req.query.query;

    if (!query) return res.status(400).json({ message: "Any Query informed" });

    try {
        const session = await WorkoutSession.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${query}%`
                },
                is_public: true,
            },
            include: [
                {
                    model: User,
                    as: 'owner',
                    where: {
                        is_public: true,
                    },
                    attributes: ['id', 'name']
                }
            ]
        });

        res.json(session);
    } catch (error) {
        console.error("Error in search session", error);
        res.status(500).json({ message: "Internal error on search session" });
    }
};


// GET /user/:id/public-sessions
const getPublicSessionsByUser = async (req, res) => {
    const { id } = req.params;

    try {
        const sessions = await WorkoutSession.findAll({
            where: {
                user_id: id,
                is_public: true
            },
            order: [['date', 'DESC']]
        });

        res.json(sessions);
    } catch (error) {
        console.error("Erro ao buscar sessões públicas:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllSessions,
    createSession,
    getSessionByUser,
    getSessionById,
    updateSession,
    deleteSession,
    searchSession,
    getPublicSessionsByUser,
};
