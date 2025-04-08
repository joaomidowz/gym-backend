'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WorkoutSet extends Model {
    static associate(models) {
      // Protege as associações com checagem
      if (models.WorkoutExercise) {
        WorkoutSet.belongsTo(models.WorkoutExercise, {
          foreignKey: 'workout_exercise_id',
          as: 'workoutExercise',
        });
      }

      if (models.WorkoutSession) {
        WorkoutSet.belongsTo(models.WorkoutSession, {
          foreignKey: 'workout_session_id',
          as: 'session',
        });
      }
    }
  }

  WorkoutSet.init({
    workout_exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    workout_session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    set_type: {
      type: DataTypes.ENUM('Warmup', 'Feeder', 'Work', 'Top'),
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  }, {
    sequelize,
    modelName: 'WorkoutSet',
    tableName: 'workout_sets',
    timestamps: true, // já vem com createdAt e updatedAt
  });

  return WorkoutSet;
};
