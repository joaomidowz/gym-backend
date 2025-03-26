'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exercises.init({
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
  }, {
    sequelize,
    modelName: 'Exercises',
    tableName: 'exercises'
  });
  return Exercises;

};