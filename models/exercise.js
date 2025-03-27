'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercise.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'creator'
      })
    }
  }
  Exercise.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false

    },
    category: {
      type: DataTypes.STRING,
      allowNull: false

    },
    thumbUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    is_global: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Exercise',
    tableName: 'exercises'
  });
  return Exercise;

};