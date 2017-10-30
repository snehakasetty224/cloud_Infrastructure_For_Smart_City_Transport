'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PaymentInfo', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      card_number: {
        type: Sequelize.STRING
      },
      card_owner: {
        type: Sequelize.STRING
      },
      expiration_date: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      isDefault: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PaymentInfo');
  }
};
