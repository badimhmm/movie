'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ProductionHouses', [
        {
          name_prodHouse: "Walt Disney Studios",
          headquarters: "Burbank, California, United States",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name_prodHouse: "Pixar",
          headquarters: "Emeryville, California, United States",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name_prodHouse: "Warner Bros",
          headquarters: "Los Angeles, California, United States",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name_prodHouse: "Universal Pictures",
          headquarters: "Universal City, California, United States",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name_prodHouse: "Paramount Pictures",
          headquarters: "Los Angeles, California, United States",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductionHouses', null, {});
  }
};
