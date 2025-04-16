'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutExercise extends Model {
    static associate(models) {
      WorkoutExercise.belongsTo(models.WorkoutSession, {
        foreignKey: 'workout_session_id',
        as: 'workout_session'
      });

      WorkoutExercise.hasMany(models.WorkoutSet, {
        foreignKey: 'workout_exercise_id',
        as: 'workout_sets'
      })


      this.belongsTo(models.Exercise, {
        foreignKey: 'exercise_id',
        as: 'exercise'
      })
    }
  }
  WorkoutExercise.init({
    workout_session_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },    
  }, {
    sequelize,
    modelName: 'WorkoutExercise',
    tableName: 'workout_exercises',
    timestamps: true
  });
  return WorkoutExercise;
};