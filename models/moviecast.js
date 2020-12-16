'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCast extends Model {
    static associate(models) {
      // define association here
    }
  };
  MovieCast.init({
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Please input cast role`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'MovieCast',
  });
  return MovieCast;
};