'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_streaks', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      current_streak: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      longest_streak: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      last_workout_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      can_use_save: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      save_expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_streaks');
  }
};