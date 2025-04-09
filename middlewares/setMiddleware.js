const { WorkoutSet, WorkoutSession, WorkoutExercise } = require('../models')

const isSetOwnerOrAdmin = async (req, res, next) => {
    try {
        const setId = parseInt(req.params.id)
        const userId = req.user.id
        const userIsAdmin = req.user.is_admin

        const set = await WorkoutSet.findByPk(setId)
        if (!set) return res.status(404).json({ error: 'Set not found' })

        const exercise = await WorkoutExercise.findByPk(set.workout_exercise_id)
        if (!exercise) return res.status(404).json({ error: 'Workout exercise not found' })

        const session = await WorkoutSession.findByPk(exercise.workout_session_id)
        if (!session) return res.status(404).json({ error: 'Workout session not found' })

        const isOwner = session.user_id === userId

        if (isOwner || userIsAdmin) return next()

        return res.status(403).json({ error: 'Access denied' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal error' })
    }
}


module.exports = isSetOwnerOrAdmin