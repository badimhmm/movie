'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('MovieCasts',
    {
    fields:  ['CastId'],  
    type: 'foreign key',
    name: 'custom_fkey_constraint_CastId',
    references: { 
      table: 'Casts',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
    })
    .then(()=>{
      return queryInterface.addConstraint('MovieCasts', {
      fields :  ['MovieId'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_MovieId',
      references: {
        table: 'Movies',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('MovieCasts', 'custom_fkey_constraint_CastId', {})
    .then(()=>{
      return queryInterface.removeConstraint('MovieCasts', 'custom_fkey_constraint_MovieId', {})
    })
  }
};
