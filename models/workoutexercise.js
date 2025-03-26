'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.WorkoutSession, {
        foreignKey: 'workout_id',
        as: 'workoutSession'
      })

      this.belongsTo(models.Exercises, {
        foreignKey: 'exercise_id',
        as: 'exercise'
      })
    }
  }
  WorkoutExercise.init({
    workout_id: {
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    exercise_id: {
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    sets: {
      type:  DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    reps: {
      type:  DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    weight: {
      type:  DataTypes.FLOAT,
      allowNull: true
    },
    notes: {
      type:  DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'WorkoutExercise',
    tableName: 'workout_exercises',
    timestamps: true
  });
  return WorkoutExercise;
};