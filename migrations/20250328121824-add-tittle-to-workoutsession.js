'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.addColumn('workout_sessions', 'title', {
  type: Sequelize.STRING,
  allowNull: false,
  defaultValue: 'No title'
})
  },

  async down (queryInterface, Sequelize) {
await queryInterface.removeColumn('workout_sessions', 'title')
  }
};
