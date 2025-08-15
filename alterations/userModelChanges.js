'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const userTable = await queryInterface.describeTable('users');

    if (userTable.email) {
      await queryInterface.removeColumn('users', 'email');
    }

    if (!userTable.login_id) {
      await queryInterface.addColumn('users', 'login_id', {
        type: Sequelize.INTEGER,
        allowNull: true, 
        references: {
          model: 'logins',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });
    }
    await queryInterface.bulkInsert('logins', [
        { id: 1, email: 'JohnLandlord@landlord.com', password: 'dummy_pass', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, email: 'MaryLandlord@landlord.com', password: 'dummy_pass', createdAt: new Date(), updatedAt: new Date() },
        { id: 3, email: 'TomTenant@tenant.com', password: 'dummy_pass', createdAt: new Date(), updatedAt: new Date() },
        { id: 4, email: 'LucyTenant@tenant.com', password: 'dummy_pass', createdAt: new Date(), updatedAt: new Date() },
        { id: 5, email: 'SamTenant@tenant.com', password: 'dummy_pass', createdAt: new Date(), updatedAt: new Date() },
        { id: 6, email: 'saad@admin.com', password: 'dummy_pass', createdAt: new Date(), updatedAt: new Date() },
    ], {});


    await queryInterface.sequelize.query(`
        UPDATE users
        SET login_id = CASE id
            WHEN 1 THEN 1
            WHEN 2 THEN 2
            WHEN 3 THEN 3
            WHEN 4 THEN 4
            WHEN 5 THEN 5
            WHEN 6 THEN 6
        END
        WHERE id IN (1,2,3,4,5,6);
    `);

    await queryInterface.changeColumn('users', 'login_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'logins',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.removeColumn('users', 'login_id');
  }
};
