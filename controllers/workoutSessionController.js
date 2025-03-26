const { where } = require('sequelize')
const { WorkoutSession } = require('../models')

// GET /workout-session
const getAllSessions = async function (req, res) {
    try {
        const sessions = await WorkoutSession.findAll()
        res.json(sessions)
    } catch (error) {
        console.error('Get sessions error:', error)
        res.status(500).json({ error: error.message })
    }
}

// POST /workout-session
const createSession = async (req, res) => {
    const { user_id, date } = req.body

    if (!user_id || !date) return res.status(400).json({ error: 'user_id and date are required' })

    try {
        const sessions = await WorkoutSession.create({ user_id, date })
        res.status(201).json(sessions)
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

// PUT /workout-session/:id
const updateSession = async (req, res) => {
    const { id } = req.body
    const { date } = req.body

    if (!date) return res.status(400).json({ error: 'The field date must be provide' })

    try {
        const sessions = await WorkoutSession.findByPk(id)
        if (!sessions) return res.status(404).json({ error: 'Workout session not found' })

        if (date !== undefined) sessions.date = date

        await sessions.save()

        res.json({ message: 'Workout session update successfuly', sessions })
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

module.exports = {
    getAllSessions,
    createSession,
    getSessionByUser,
    updateSession,
    deleteSession
};
