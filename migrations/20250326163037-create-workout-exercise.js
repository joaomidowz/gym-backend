'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workout_exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      workout_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'workout_sessions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      exercise_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'exercises', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sets: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reps: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('workout_exercises', ['workout_id'], {
      name: 'idx_workout_exercises_workout_id'
    })

    await queryInterface.addIndex('workout_exercises', ['exercise_id'], {
      name: 'idx_workout_exercises_exercise_id'
    })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('workout_exercises', 'idx_workout_exercises_workout_id');
    await queryInterface.removeIndex('workout_exercises', 'idx_workout_exercises_exercise_id');
    await queryInterface.dropTable('workout_exercises');
  }
};