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
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    thumbUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exercises',
  });
  return Exercises;
};