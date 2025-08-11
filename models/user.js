'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.properties, { foreignKey: 'landlord_id'})
      this.hasMany(models.contracts, { foreignKey: 'tenant_id'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('landlord', 'tenant', 'admin')
  }, {
    sequelize,
    modelName: 'users',
    freezeTableName: true,
    timestamps: true,
  });
  return User;
};