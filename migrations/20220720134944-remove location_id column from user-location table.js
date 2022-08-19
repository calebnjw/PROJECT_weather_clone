module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'user_locations',
      'location_id',
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'user_locations',
      'location_id',
      {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    );
  },
};
