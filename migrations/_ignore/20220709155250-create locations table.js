module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'locations',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        location_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        location_group: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  },
};
