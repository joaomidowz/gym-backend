'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutSet extends Model {
    static associate(models) {
      WorkoutSet.belongsTo(models.WorkoutExercise, {
        foreignKey: 'workout_exercise_id',
        as: 'workoutExercise'
      })

      WorkoutSet.belongsTo(models.WorkoutSession, {
        foreignKey: 'workout_session_id',
        as: 'session',
      });
      
    }
  }
  WorkoutSet.init({
    workout_exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workout_exercises',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    workout_session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workout_sessions',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    set_type: {
      type: DataTypes.ENUM('Warmup', 'Feeder', 'Work', 'Top'),
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'WorkoutSet',
    tableName: 'workout_sets'
  });
  return WorkoutSet;
};