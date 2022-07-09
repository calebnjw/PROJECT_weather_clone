'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const locationList = [
      {
        location_name: 'Berlin',
        location_group: 'Europe',
      },
      {
        location_name: 'Paris',
        location_group: 'Europe',
      },
      {
        location_name: 'London',
        location_group: 'Europe',
      },
      {
        location_name: 'Madrid',
        location_group: 'Europe',
      },
      {
        location_name: 'Vienna',
        location_group: 'Europe',
      },
      {
        location_name: 'Brussels',
        location_group: 'Europe',
      },
      {
        location_name: 'Moscow',
        location_group: 'Europe',
      },
      {
        location_name: 'Sofia',
        location_group: 'Europe',
      },
      {
        location_name: 'Copenhagen',
        location_group: 'Europe',
      },
      {
        location_name: 'Athens',
        location_group: 'Europe',
      },
      {
        location_name: 'Budapest',
        location_group: 'Europe',
      },
      {
        location_name: 'Reykjavik',
        location_group: 'Europe',
      },
      {
        location_name: 'Dublin',
        location_group: 'Europe',
      },
      {
        location_name: 'Rome',
        location_group: 'Europe',
      },
      {
        location_name: 'Amsterdam',
        location_group: 'Europe',
      },
      {
        location_name: 'Oslo',
        location_group: 'Europe',
      },
      {
        location_name: 'Warsaw',
        location_group: 'Europe',
      },
      {
        location_name: 'Lisabon',
        location_group: 'Europe',
      },
      {
        location_name: 'Bern',
        location_group: 'Europe',
      },
      {
        location_name: 'Kiev',
        location_group: 'Europe',
      },
      {
        location_name: 'Stockholm',
        location_group: 'Europe',
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
