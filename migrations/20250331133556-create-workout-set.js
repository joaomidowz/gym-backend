'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workout_sets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      workout_exercise_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workout_exercises',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      workout_session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workout_sessions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      set_type: {
        type: Sequelize.ENUM('Warmup', 'Feeder', 'Work', 'Top'),
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      reps: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workout_sets');
  },
};
