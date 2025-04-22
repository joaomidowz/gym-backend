const { WorkoutSet, WorkoutPR, Exercise } = require('../models');
const { Sequelize } = require('sequelize');

const checkAndSavePR = async ({ user_id, workout_session_id, exercise_id, weight, reps }) => {
    try {
        // Verifica PR de PESO
        const currentWeightPR = await WorkoutPR.findOne({
            where: {
                user_id,
                exercise_id,
                pr_type: 'weight',
            },
            order: [['value', 'DESC']],
        });

        const isNewWeightPR = !currentWeightPR || weight > currentWeightPR.value;

        if (isNewWeightPR && weight > 0) {
            await WorkoutPR.create({
                user_id,
                workout_session_id,
                exercise_id,
                pr_type: 'weight',
                value: weight,
            });
        }
        const currentRepsPR = await WorkoutPR.findOne({
            where: {
                user_id,
                exercise_id,
                pr_type: 'reps',
            },
            order: [['value', 'DESC']],
        });

        const isNewRepsPR = !currentRepsPR || reps > currentRepsPR.value;

        if (isNewRepsPR && reps > 0) {
            await WorkoutPR.create({
                user_id,
                workout_session_id,
                exercise_id,
                pr_type: 'reps',
                value: reps,
            });
        }

    } catch (error) {
        console.error('Erro ao verificar/salvar PR:', error);
    }
};

// GET /session/:id/prs
const getPRsBySession = async (req, res) => {
    const { id } = req.params; // session id
  
    try {
      const prs = await WorkoutPR.findAll({
        where: { workout_session_id: id },
        include: {
          model: Exercise,
          as: 'exercise',
          attributes: ['id', 'name', 'muscle_group'],
        },
        order: [['pr_type', 'ASC']],
      });
  
      res.json(prs);
    } catch (error) {
      console.error("Erro ao buscar PRs da sessão:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    checkAndSavePR,
    getPRsBySession
  };