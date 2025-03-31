'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('workout_sets', 'workout_session_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'workout_sessions',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('workout_sets', 'workout_session_id');
  },
};
