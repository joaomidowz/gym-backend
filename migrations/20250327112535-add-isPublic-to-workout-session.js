'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('workout_sessions', 'is_public', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    })
  },

  async down (queryInterface, Sequelize) {
await queryInterface.removeColumn('workout_sessions', 'is_public')
  }
};
