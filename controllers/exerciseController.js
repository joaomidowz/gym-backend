const { Exercise, WorkoutPR } = require("../models");
const { Op } = require("sequelize");

const VALID_MUSCLE_GROUPS = [
  "Peito",
  "Costas",
  "Bíceps",
  "Tríceps",
  "Pernas",
  "Ombros",
  "Core",
  "Outros"
];

// GET /exercises
const getAllExercise = async (req, res) => {
  try {
    const exercises = await Exercise.findAll({
      where: {
        [Op.or]: [
          { is_global: true },
          { user_id: req.user.id }
        ]
      }
    });
    res.json(exercises);
  } catch (error) {
    console.error('Get exercises error: ', error);
    res.status(500).json({ error: error.message });
  }
};

const getExercisesWithPR = async (req, res) => {
  try {
    const exercises = await Exercise.findAll({
      where: {
        [Op.or]: [
          { is_global: true },
          { user_id: req.user.id }
        ]
      },
      raw: true,
    });

    const exerciseIds = exercises.map((ex) => ex.id);

    const prs = await WorkoutPR.findAll({
      where: {
        user_id: req.user.id,
        exercise_id: exerciseIds
      },
      attributes: ['exercise_id', 'pr_type', 'value'],
      raw: true,
    });

    const prsByExercise = prs.reduce((acc, pr) => {
      if (!acc[pr.exercise_id]) acc[pr.exercise_id] = {};
      acc[pr.exercise_id][pr.pr_type === "weight" ? "pr_weight" : "pr_reps"] = pr.value;
      return acc;
    }, {});

    const enriched = exercises.map((ex) => ({
      ...ex,
      ...(prsByExercise[ex.id] || {}),
    }));

    res.json(enriched);
  } catch (error) {
    console.error("Get exercises with PR error: ", error);
    res.status(500).json({ error: error.message });
  }
};

const getExercisesAdmin = async (req, res) => {
  try {
    if (!req.user.is_admin) return res.status(403).json({ error: "Access denied. Only administrator." });
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (error) {
    console.error('Get exercises error: ', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /exercises
const createExercise = async (req, res) => {
  const { name, description, muscle_group, is_global = false } = req.body;

  if (!name || !muscle_group) {
    return res.status(400).json({ error: 'Nome e grupo muscular são obrigatórios.' });
  }

  if (!VALID_MUSCLE_GROUPS.includes(muscle_group)) {
    return res.status(400).json({ error: 'Grupo muscular inválido.' });
  }

  try {
    const exercise = await Exercise.create({
      name,
      description,
      muscle_group,
      is_global,
      user_id: req.user.id
    });

    res.status(201).json(exercise);
  } catch (error) {
    console.error('Create exercises error: ', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /exercises/:id
const alterExercise = async (req, res) => {
  const { id } = req.params;
  const { name, description, image_url, muscle_group } = req.body;

  if (!name || !muscle_group) {
    return res.status(400).json({ error: 'Nome e grupo muscular são obrigatórios.' });
  }

  if (!VALID_MUSCLE_GROUPS.includes(muscle_group)) {
    return res.status(400).json({ error: 'Grupo muscular inválido.' });
  }

  try {
    const exercise = await Exercise.findByPk(id);

    if (!exercise) return res.status(404).json({ error: 'Exercício não encontrado' });

    exercise.name = name;
    exercise.description = description;
    exercise.image_url = image_url;
    exercise.muscle_group = muscle_group;

    await exercise.save();
    res.json(exercise);
  } catch (error) {
    console.error('Update exercises error: ', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /exercises/:id
const deleteExercise = async (req, res) => {
  const { id } = req.params;

  try {
    const exercise = await Exercise.findByPk(id);

    if (!exercise) return res.status(404).json({ error: 'Exercício não encontrado' });

    await exercise.destroy();
    res.json({ message: 'Exercício deletado com sucesso' });
  } catch (error) {
    console.error('Delete exercises error: ', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /exercises/search?query=xxx
const searchExercise = async (req, res) => {
  const query = req.query.query;

  if (!query) return res.status(400).json({ message: "Nenhuma busca informada" });

  try {
    const exercises = await Exercise.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`
        }
      }
    });

    res.json(exercises);
  } catch (error) {
    console.error("Erro ao buscar exercícios", error);
    res.status(500).json({ message: "Erro interno ao buscar exercícios" });
  }
};

module.exports = {
  getAllExercise,
  createExercise,
  alterExercise,
  deleteExercise,
  searchExercise,
  getExercisesAdmin,
  getExercisesWithPR
};
