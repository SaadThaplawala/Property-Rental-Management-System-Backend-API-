'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.contracts, { foreignKey: 'contract_id'})
    }
  }
  payments.init({
    amount: DataTypes.DECIMAL,
    paymentDate: DataTypes.DATE,
    status: DataTypes.ENUM('pending', 'paid'),
    contract_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'payments',
    freezeTableName: true,  
    timestamps: true,
  });
  return payments;
};