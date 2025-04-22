'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class WorkoutPR extends Model {
        static associate(models) {
            WorkoutPR.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
            });

            WorkoutPR.belongsTo(models.WorkoutSession, {
                foreignKey: 'workout_session_id',
                as: 'session',
            });

            WorkoutPR.belongsTo(models.Exercise, {
                foreignKey: 'exercise_id',
                as: 'exercise',
            });
        }
    }

    WorkoutPR.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        workout_session_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        exercise_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pr_type: {
            type: DataTypes.ENUM('weight', 'reps'),
            allowNull: false,
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'WorkoutPR',
        tableName: 'workout_prs',
        timestamps: true,
    });

    return WorkoutPR;
};
