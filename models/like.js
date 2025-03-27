'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
      Like.belongsTo(models.WorkoutSession, { foreignKey: 'session_id', as: 'session' })
    }
  }
  Like.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
    timestamps: true
  });
  return Like;
};