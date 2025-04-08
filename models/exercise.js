'use strict';

const VALID_MUSCLE_GROUPS = [
  "Peito",
  "Costas",
  "Bíceps",
  "Tríceps",
  "Pernas",
  "Ombros",
  "Core",
  "Outros"
];

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
    description: {
      type: DataTypes.STRING,
      allowNull: false

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
    },
    muscle_group: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Outros',
      validate: {
        isIn: {
          args: [VALID_MUSCLE_GROUPS],
          msg: 'Grupo muscular inválido'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Exercise',
    tableName: 'exercises'
  });
  return Exercise;

};