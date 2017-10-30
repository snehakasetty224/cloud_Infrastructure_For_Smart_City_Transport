'use strict';
module.exports = function(sequelize, DataTypes) {
  var PaymentHistory = sequelize.define('PaymentHistory', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: DataTypes.STRING,
    billingId: DataTypes.STRING,
    paymentInfoId: DataTypes.STRING,
    paid_time: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return PaymentHistory;
};
