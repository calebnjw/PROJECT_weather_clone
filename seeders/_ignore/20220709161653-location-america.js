'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const locationList = [
      {
        location_name: 'Washington',
        location_group: 'America',
      },
      {
        location_name: 'New York',
        location_group: 'America',
      },
      {
        location_name: 'Sacramento',
        location_group: 'America',
      },
      {
        location_name: 'Los Angeles',
        location_group: 'America',
      },
      {
        location_name: 'Chicago',
        location_group: 'America',
      },
      {
        location_name: 'Houston',
        location_group: 'America',
      },
      {
        location_name: 'Phoenix',
        location_group: 'America',
      },
      {
        location_name: 'Philadelphia',
        location_group: 'America',
      },
      {
        location_name: 'Vancouver',
        location_group: 'America',
      },
      {
        location_name: 'Ottawa',
        location_group: 'America',
      },
      {
        location_name: 'Buenos Aires',
        location_group: 'America',
      },
      {
        location_name: 'Brasilia',
        location_group: 'America',
      },
      {
        location_name: 'Santiago',
        location_group: 'America',
      },
      {
        location_name: 'Bogota',
        location_group: 'America',
      },
      {
        location_name: 'Ciudad de Mexico',
        location_group: 'America',
      },
      {
        location_name: 'Asuncion',
        location_group: 'America',
      },
      {
        location_name: 'Lima',
        location_group: 'America',
      },
      {
        location_name: 'Montevideo',
        location_group: 'America',
      },
    ];

    await queryInterface.bulkInsert(
      'locations',
      locationList,
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('locations', null, {});
  },
};
