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
        as: 'user'
      })
    }
  }
  WorkoutSession.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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