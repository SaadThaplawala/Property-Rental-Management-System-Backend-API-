'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // List all the tables that have createdAt / updatedAt
    const tables = ['users', 'properties', 'contracts', 'payments'];

    for (const table of tables) {
      await queryInterface.changeColumn(table, 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });

      await queryInterface.changeColumn(table, 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = ['users', 'properties', 'contracts', 'payments'];

    for (const table of tables) {
      await queryInterface.changeColumn(table, 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false
      });

      await queryInterface.changeColumn(table, 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false
      });
    }
  }
};
