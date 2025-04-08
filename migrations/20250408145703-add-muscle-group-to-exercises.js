'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('exercises', 'muscle_group', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Outros'
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('exercises', 'muscle_group');
  }
};
