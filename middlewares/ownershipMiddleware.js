const isUserOwnerOrAdmin = (req, res, next) => {
    const userIdParam = parseInt(req.params.id)
    const userLoggedId = req.user.id
    const isAdmin = req.user.is_admin

    if (userLoggedId === userIdParam || isAdmin) return next()

    res.status(403).json({ message: 'You do not have permissions to perform this action.' })
}

const { WorkoutSession } = require('../models');

const isSessionOwnerOrAdmin = async (req, res, next) => {
    const sessionId = parseInt(req.params.id)
    const userLoggedId = req.user.id
    const isAdmin = req.user.is_admin

    try {
        const session = await WorkoutSession.findByPk(sessionId)

        if (!session) return res.status(404).json({ message: 'Workout session not found.' })

        if (session.user_id === userLoggedId || isAdmin) {
            req.session = session
            return next()
        }

        return res.status(403).json({ message: 'You do not have permission to modify or exclude this session.' })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const { WorkoutExercise, WorkoutSession } = require('../models')

const isWorkoutExerciseOwnerOrAdmin = async (req, res, next) => {
    const exerciseId = parseInt(req.params.id)
    const userLoggedId = req.user.id
    const isAdmin = req.user.is_admin

    try {
        const exercise = await WorkoutExercise.findByPk(exerciseId)
        if (!exercise) return res.status(404).json({ message: 'Workout exercise not found.' })

        const session = await WorkoutSession.findByPk(exercise.workout_id)
        if (!session) return res.status(404).json({ message: 'Workout session not found.' })

        const isOwner = session.user_id === userLoggedId

        if (isOwner || isAdmin) {
            req.exercise = exercise
            return next()
        }

        return res.status(403).json({ message: 'You do not have permission to modify or exclude this exercise.' })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const canAddExerciseToOwnSession = async (req, res, next) => {
    const { workout_id } = req.body
    const userLoggedId = req.user.id
    const isAdmin = req.user.is_admin

    try {
        const session = await WorkoutSession.findByPk(workout_id)

        if (!session) return res.status(404).json({ message: 'Workout session not found.' })


        if (session.user_id === userLoggedId || isAdmin) {
            req.session = session
            return next()
        }

        return res.status(403).json({ message: 'You do not have permission to modify or exclude this exercise.' })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    isUserOwnerOrAdmin,
    isSessionOwnerOrAdmin,
    isWorkoutExerciseOwnerOrAdmin,
    canAddExerciseToOwnSession
}