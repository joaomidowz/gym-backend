'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStreak extends Model {
    static associate(models) {
      UserStreak.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: "user"
      });
    }
  }
  UserStreak.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    current_streak: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    longest_streak: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    last_workout_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    can_use_save: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    save_expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserStreak',
    tableName: 'user_streaks',
    timestamps: true
  });

  return UserStreak;
};
