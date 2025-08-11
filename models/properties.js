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
    
      this.belongsTo(models.users, { foreignKey: 'landlord_id', scope: { role: 'landlord' }})// scope here is making sure only landlord from user is matched.
      this.hasMany(models.contracts, { foreignKey: 'property_id'})
    }
  }
  properties.init({
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    landlord_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'properties',
    freezeTableName: true,
    timestamps: true,
  });
  return properties;
};