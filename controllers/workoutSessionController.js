const { Op, where } = require("sequelize")
const { WorkoutSession } = require('../models')
const { updateUserStreak } = require('../utils/streakUtils');

// GET /workout-session
const getAllSessions = async function (req, res) {
    try {
        const sessions = await WorkoutSession.findAll({
            where: { user_id: req.user.id },
            order: [['date', 'DESC']]
        })
        res.json(sessions)
    } catch (error) {
        console.error('Get sessions error:', error)
        res.status(500).json({ error: error.message })
    }
}

// POST /workout-session
const createSession = async (req, res) => {
    const { date, is_public = true, title } = req.body

    if (!title || !date) return res.status(400).json({ error: 'title and date are required' });

    try {
        const sessions = await WorkoutSession.create({ user_id: req.user.id, date, is_public, title })
        const updatedStreak = await updateUserStreak(req.user.id, date);


        res.status(201).json({
            message: 'Workout session created successfuly',
            sessions,
            streak: {
                current_streak: updatedStreak.current_streak,
                longest_streak: updatedStreak.longest_streak,
                last_workout_date: updatedStreak.last_workout_date
            }
        })
    } catch (error) {
        console.error('Create sessions error:', error)
        res.status(500).json({ error: error.message })
    }
}

// GET /user/:id/session
const getSessionByUser = async (req, res) => {
    const { id } = req.params

    try {
        const sessions = await WorkoutSession.findAll({ where: { user_id: id } })
        if (sessions.length === 0) {
            return res.status(404).json({ message: 'No sessions found for this user.' })
        }
        res.json(sessions)
    } catch (error) {
        console.error('Get user sessions error:', error)
        res.status(500).json({ error: error.message })
    }
}

const getSessionById = async (req, res) => {
    try {
        const session = req.session;

        return res.status(200).json(session);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// PUT /workout-session/:id
const updateSession = async (req, res) => {
    const { id } = req.params
    const { title, date, is_public } = req.body

    if (!title && !date && typeof is_public === 'undefined') return res.status(400).json({ error: 'At least one field (title, date, is_public) must be provided' })

    try {
        const session = await WorkoutSession.findByPk(id)
        if (!session) return res.status(404).json({ error: 'Workout session not found' })

        if (title !== undefined) session.title = title
        if (date !== undefined) session.date = date
        if (is_public !== undefined) session.is_public = is_public

        await session.save()

        res.json({ message: 'Workout session update successfuly', session: session })
    } catch (error) {
        console.error('Update sessions error:', error)
        res.status(500).json({ error: error.message })
    }
}

const deleteSession = async (req, res) => {
    const { id } = req.params

    try {
        const session = await WorkoutSession.findByPk(id)

        if (!session) return res.status(404).json({ error: 'Workout session not found' })

        await session.destroy()

        res.json({ message: 'Workout session deleted successfully' })
    } catch (error) {
        console.error('Delete sessions error:', error)
        res.status(500).json({ error: error.message })
    }
}

// GET //exercise=query
const searchSession = async (req, res) => {
    const query = req.query.query

    if (!query) return res.status(400).json({ message: "Any Query informed" })

    try {
        const session = await WorkoutSession.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${query}%`
                },
            }
        })

        res.json(session)
    } catch (error) {
        console.error("Error in search session", error)
        res.status(500).json({ message: "Internal error on search session" })
    }
}

module.exports = {
    getAllSessions,
    createSession,
    getSessionByUser,
    getSessionById,
    updateSession,
    deleteSession,
    searchSession
};
