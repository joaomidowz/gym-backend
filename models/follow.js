'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      Follow.belongsTo(models.User, {
        foreignKey: 'follower_id',
        as: 'follower'
      })

      Follow.belongsTo(models.User, {
        foreignKey: 'following_id',
        as: 'following'
      })
    }
  }
  Follow.init({
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'Follow',
    tableName: 'follows'
  });
  return Follow;
};