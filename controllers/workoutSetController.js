const { WorkoutSet, WorkoutExercise } = require('../models')

const updateWorkoutExerciseSummary = async (workout_exercise_id) => {
    const sets = await WorkoutSet.findAll({ where: { workout_exercise_id } })

    const totalWeight = sets.reduce((sum, s) => sum + (s.weight || 0), 0)
    const totalReps = sets.reduce((sum, s) => sum + s.reps, 0)
    const totalSets = sets.length

    await WorkoutExercise.update(
        {
            weight: totalWeight,
            reps: totalReps,
            sets: totalSets,
        }, {
        where: { id: workout_exercise_id }
    })
}

// POST /workout-set/:exerciseId
const createSet = async (req, res) => {
    const { exerciseId } = req.params
    const { set_type, weight, reps, order } = req.body

    try {
        const exercise = await WorkoutExercise.findByPk(exerciseId)
        if (!exercise) return res.status(404).json({ error: 'WorkoutExercise not found.' })

        const workout_session_id = exercise.workout_id

        const newSet = await WorkoutSet.create({
            workout_exercise_id: exerciseId,
            workout_session_id,
            set_type,
            weight,
            reps,
            order
        })

        await updateWorkoutExerciseSummary(exerciseId)

        res.status(201).json({ message: 'Set has been created', set: newSet })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//GET /workout-set/:exerciseId
const getSetsByExercise = async (req, res) => {
    const { exerciseId } = req.params

    try {
        const sets = await WorkoutSet.findAll({
            where: { workout_exercise_id: exerciseId },
            order: [['order', 'ASC']]
        })

        res.json({ sets })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//PUT / workout-set/:setId
const updateSet = async (req, res) => {
    const { setId } = req.params
    const { set_type, weight, reps, order } = req.body

    try {
        const set = await WorkoutSet.findByPk(setId)

        if (!set) return res.status(404).json({ message: 'Set not found.' })

        if (set_type !== undefined) set.set_type = set_type;
        if (weight !== undefined) set.weight = weight;
        if (reps !== undefined) set.reps = reps;
        if (order !== undefined) set.order = order;

        await set.save()
        await updateWorkoutExerciseSummary(set.workout_exercise_id)

        res.json({ message: 'Set updated with success.' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//DELETE / workout-set/:setId
const deleteSet = async (req, res) => {
    const { setId } = req.params

    try {
        const set = await WorkoutSet.findByPk(setId)

        if (!set) return res.status(404).json({ message: 'Set not found.' })

        const exerciseId = set.workout_exercise_id

        await set.destroy()
        await updateWorkoutExerciseSummary(set.workout_exercise_id)

        res.json({ message: 'Set deleted with success.' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = {
    createSet,
    getSetsByExercise,
    updateSet,
    deleteSet
}; 