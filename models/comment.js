'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
      Comment.belongsTo(models.WorkoutSession, { foreignKey: 'session_id', as: 'session' })
    }
  }
  Comment.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type:  DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true
  });
  return Comment;
};