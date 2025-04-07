'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutSession extends Model {

    static associate(models) {
      // define association here
      WorkoutSession.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'owner'
      })

      WorkoutSession.hasMany(models.Like, {
        foreignKey: 'session_id',
        as: 'likes'
      })

      WorkoutSession.hasMany(models.Comment, {
        foreignKey: 'session_id',
        as: 'comments'
      })

      WorkoutSession.hasMany(models.WorkoutExercise, {
        foreignKey: 'workout_session_id', 
        as: 'workout_exercises'
      });


    }
  }
  WorkoutSession.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No title'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'WorkoutSession',
    tableName: 'workout_sessions'
  });
  return WorkoutSession;
};