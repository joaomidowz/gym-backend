'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workout_exercises', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      workout_session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'workout_sessions', key: 'id' },
        onDelete: 'CASCADE',
      },
      exercise_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'exercises', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workout_exercises');
  }
};
