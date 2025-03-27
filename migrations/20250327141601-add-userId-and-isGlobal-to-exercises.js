'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('exercises', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'SET NULL'
    });
      await queryInterface.addColumn('exercises', 'is_global', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('exercises', 'is_global')
    await queryInterface.removeColumn('exercises', 'user_id')
  }
};
