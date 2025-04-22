'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WorkoutSet extends Model {
    static associate(models) {
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
      if (models.Exercise) {
        WorkoutSet.belongsTo(models.Exercise, {
          foreignKey: 'exercise_id',
          as: 'exercise',
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
    exercise_id: {
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
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'WorkoutSet',
    tableName: 'workout_sets',
    timestamps: true,
  });


  return WorkoutSet;
};
