'use strict';
const { 
  Model 
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    getFullName() {
      return this.first_name + ' ' + this.last_name
    }
    static associate(models) {
      // define association here
      Cast.belongsToMany(models.Movie, { through: models.MovieCast })
    }
  };
  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.last_name = instance.last_name == '' ? instance.first_name : instance.last_name
      },
      beforeUpdate(instance, options) {
        instance.last_name.trim()
        instance.last_name = instance.last_name == '' ? instance.first_name : instance.last_name
      }
    },
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};