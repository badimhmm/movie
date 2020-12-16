'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Movies', 'ProdHouseId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'ProductionHouses'
        },
        key: 'id'
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Movies', 'ProdHouseId')
  }
};
