'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.ProductionHouse, {foreignKey: 'ProdHouseId'})
      Movie.belongsToMany(models.Cast, { through: models.MovieCast })
    }
  };
  Movie.init({
    name: DataTypes.STRING,
    released_year:{
      type: DataTypes.INTEGER,
      validate: {
        isKabisat (value) {
          let kabisatYear = false
          if (value % 400 == 0) {
            kabisatYear = true
          } 
          else {
            if (value % 100 != 0 && value % 4 == 0) {
              kabisatYear = true
            }
          }
          if (kabisatYear) {
            throw new Error('Silahkan rilis pada tahun depan, karena tahun dipilih merupakan tahun kabisat')
          }
        }
      }
    },
    rating: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    ProdHouseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};