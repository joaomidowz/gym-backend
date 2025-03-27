const { Exercise, WorkoutExercise } = require('../models')

const isExerciseOwnerOrAdmin = async (req, res, next) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id)

        if (!exercise) return res.status(404).json({ message: 'Exercise not found.'})

        if (req.user.is_admin || exercise.user_id === req.user.id) return next()

        return res.status(403).json({ error: 'Access denied. You are not the owner of this exercise.'})
    } catch (error) {
        return res.status(500).json({ error: 'Error to verify the propriety of this exercise'})
    }
}

const isExerciseGlobal = async (req, res, next) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id)

        if (!exercise) return res.status(400).json({ message: 'Exercise not found.'})

        if (exercise.is_global) return res.status(403).json({ error: 'Global exercise cannot be edited or deleted'})

        return next()
    } catch (error) {
        return res.status(500).json({ error: 'Error to verify the propriety of this exercise'})
    }
}

const isExerciseInUse = async (req, res, next) => {
    try {
        const count = await WorkoutExercise.count({
            where: {exercise_id: req.params.id}
        })

        if (count > 0) return res.status(400).json({ message: 'Exercise in use. Cant be edited.'})

        return next()
    } catch (error) {
        return res.status(500).json({ error: 'Error to verify the exercise is in use'})
    }
}

module.exports = {
    isExerciseGlobal,
    isExerciseInUse,
    isExerciseOwnerOrAdmin
}