'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  work.init({
    title: DataTypes.TEXT,
    primaryimageurl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'work',
  });
  return work;
};