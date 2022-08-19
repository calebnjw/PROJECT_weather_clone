module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'user_locations',
        'city',
        {
          allowNull: false,
          type: Sequelize.STRING,
        },
      ),
      queryInterface.addColumn(
        'user_locations',
        'lat',
        {
          allowNull: false,
          type: Sequelize.STRING,
        },
      ),
      queryInterface.addColumn(
        'user_locations',
        'long',
        {
          allowNull: false,
          type: Sequelize.STRING,
        },
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'user_locations',
        'city',
      ),
      queryInterface.removeColumn(
        'user_locations',
        'lat',
      ),
      queryInterface.removeColumn(
        'user_locations',
        'long',
      ),
    ]);
  },
};
