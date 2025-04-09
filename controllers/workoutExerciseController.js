const { WorkoutExercise, WorkoutSession, Exercise } = require('../models');

// GET /workout-exercise
const getAllWorkoutExercises = async (req, res) => {
    try {
        const exercises = await WorkoutExercise.findAll({
            include: [{ model: Exercise, as: 'exercise' }]
        });
        res.json(exercises);
    } catch (error) {
        console.error('Get workout exercises error: ', error);
        res.status(500).json({ error: error.message });
    }
};


// POST /workout-exercise
const createWorkoutExercise = async (req, res) => {
    const { workout_session_id, exercise_id } = req.body;

    console.log("Requisição recebida:", req.body); // Debug

    if (!workout_session_id || !exercise_id) {
        return res.status(400).json({ error: 'Campos obrigatórios: workout_session_id e exercise_id.' });
    }

    // Garantir que sejam números inteiros
    const sessionId = Number(workout_session_id);
    const exerciseId = Number(exercise_id);

    if (isNaN(sessionId) || isNaN(exerciseId)) {
        return res.status(400).json({ error: 'IDs inválidos (não numéricos).' });
    }

    try {
        const session = await WorkoutSession.findByPk(sessionId);
        if (!session) {
            console.warn("Sessão não encontrada com ID:", sessionId);
            return res.status(404).json({ message: 'Workout session not found.' });
        }

        const exercise = await Exercise.findByPk(exerciseId);
        if (!exercise) {
            console.warn("Exercício não encontrado com ID:", exerciseId);
            return res.status(404).json({ message: 'Exercise not found.' });
        }

        const workoutExercise = await WorkoutExercise.create({
            workout_session_id: sessionId,
            exercise_id: exerciseId
        });

        return res.status(201).json(workoutExercise);
    } catch (error) {
        console.error('Erro ao criar workout exercise:', error);
        return res.status(500).json({ error: 'Erro interno ao criar workout exercise.' });
    }
};

// GET /workout-exercise/workout/:id
const getWorkoutExerciseByWorkoutId = async (req, res) => {
    const { id } = req.params;

    try {
        const exercises = await WorkoutExercise.findAll({
            where: { workout_session_id: id },
            include: [
              { model: Exercise, as: 'exercise' },
              {
                model: require('../models').WorkoutSet,
                as: 'workout_sets',
                separate: true,
                order: [['order', 'ASC']],
              }
            ]
          });
          

        if (!exercises.length) {
            return res.status(404).json({ message: 'No exercises found for this workout session.' });
        }

        res.json(exercises);
    } catch (error) {
        console.error('Get workout exercises error: ', error);
        res.status(500).json({ error: error.message });
    }
};

// PUT /workout-exercise/:id
const updateWorkoutExercise = async (req, res) => {
    const { id } = req.params;
    const { notes, exercise_id } = req.body;

    try {
        const exercise = await WorkoutExercise.findByPk(id);

        if (!exercise) return res.status(404).json({ message: 'Workout exercise not found.' });

        if (exercise_id !== undefined) exercise.exercise_id = exercise_id;
        if (notes !== undefined) exercise.notes = notes;

        await exercise.save();

        res.json({ message: 'Workout exercise has been updated successfully', exercise });
    } catch (error) {
        console.error('Update workout exercise error: ', error);
        res.status(500).json({ error: error.message });
    }
};

// DELETE /workout-exercise/:id
const deleteWorkoutExercise = async (req, res) => {
    const { id } = req.params;

    try {
        const exercise = await WorkoutExercise.findByPk(id);

        if (!exercise) return res.status(404).json({ message: 'Workout exercise not found.' });

        await exercise.destroy();

        res.json({ message: 'Workout exercise has been deleted successfully', exercise });
    } catch (error) {
        console.error('Delete workout exercise error: ', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllWorkoutExercises,
    createWorkoutExercise,
    getWorkoutExerciseByWorkoutId,
    updateWorkoutExercise,
    deleteWorkoutExercise
};
