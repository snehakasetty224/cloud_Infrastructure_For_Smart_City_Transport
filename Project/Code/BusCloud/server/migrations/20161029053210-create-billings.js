'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Billings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      dueDate: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      isPaid: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Billings');
  }
};
