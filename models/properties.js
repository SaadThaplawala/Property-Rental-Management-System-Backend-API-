'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  properties.init({
    title: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'properties',
    timestamps: true,
  });
  return properties;
};