const { WorkoutExercise, Exercises } = require('../models')

// GET /workout-exercise
const getAllWorkoutExercises = async (req, res) => {
    try {
        const exercises = await WorkoutExercise.findAll({
            include: [{ model: Exercises, as: 'exercise' }]
        })
        res.json(exercises)
    } catch (error) {
        console.error('Get workout exercises error: ', error)
        res.status(500).json({ error: error.message })
    }
}

// POST /workout-exercise
const createWorkoutExercise = async (req, res) => {
    const { workout_id, exercise_id, sets, reps, weight, notes } = req.body

    if (!workout_id || !exercise_id || !sets || !reps) return res.status(400).json({ error: 'workout_id, exercise_id, sets and reps are required' })

    try {
        const workoutExercise = await WorkoutExercise.create({
            workout_id,
            exercise_id,
            sets,
            reps,
            weight,
            notes
        })

        res.status(201).json(workoutExercise)
    } catch (error) {
        console.error('Create workout exercise error:', error)
        res.status(500).json({ error: error.message })
    }
}

// GET /workout-exercise/workout/:id
const getWorkoutExerciseByWorkoutId = async (req, res) => {
    const { id } = req.params

    try {
        const exercises = await WorkoutExercise.findAll({
            where: { workout_id: id },
            include: [{ model: Exercises, as: 'exercise' }]
        })

        if (!exercises.length) return res.status(404).json({ message: 'No exercises found for this workout session.' })

        res.json(exercises)
    } catch (error) {
        console.error('Get workout exercises error: ', error)
        res.status(500).json({ error: error.message })
    }
}

// PUT /workout-exercise/:id
const updateWorkoutExercise = async (req, res) => {
    const { id } = req.params
    const { sets, reps, weight, notes, exercise_id } = req.body

    try {
        const exercise = await WorkoutExercise.findByPk(id)

        if (!exercise) return res.status(404).json({ message: 'Workout exercise not found.' })

        if (sets !== undefined) exercise.sets = sets;
        if (exercise_id !== undefined) exercise.exercise_id = exercise_id;
        if (reps !== undefined) exercise.reps = reps;
        if (weight !== undefined) exercise.weight = weight;
        if (notes !== undefined) exercise.notes = notes;

        await exercise.save()

        res.json({ message: 'Workout exercise has been updated successfully', exercise })
    } catch (error) {
        console.error('Update workout exercise error: ', error)
        res.status(500).json({ error: error.message })
    }
}

//DELETE /workout-exercise/:id
const deleteWorkoutExercise = async (req, res) => {
    const { id } = req.params

    try {
        const exercise = await WorkoutExercise.findByPk(id)

        if (!exercise) return res.status(404).json({ message: 'Workout exercise not found.' })

        await exercise.destroy()

        res.json({ message: 'Workout exercise has been deleted successfully', exercise })
    } catch (error) {
        console.error('Delete workout exercise error: ', error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllWorkoutExercises,
    createWorkoutExercise,
    getWorkoutExerciseByWorkoutId,
    updateWorkoutExercise,
    deleteWorkoutExercise
}