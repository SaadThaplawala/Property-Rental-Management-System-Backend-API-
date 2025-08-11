'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contract.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    monthlyRent: DataTypes.DECIMAL,
    tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }},{
    sequelize,
    modelName: 'contracts',
    freezeTableName: true,
    timestamps: true,
   }
  );
  return Contract;
};