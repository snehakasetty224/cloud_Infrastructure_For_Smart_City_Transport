'use strict';

module.exports = function(sequelize, DataTypes) {
  var PaymentInfo = sequelize.define('PaymentInfo', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: 'Users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    card_number: DataTypes.STRING,
    card_owner: DataTypes.STRING,
    expiration_date: DataTypes.STRING,
    address: DataTypes.STRING,
    zip: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        PaymentInfo.belongsTo(models.Users, { foreignKey: 'userId' });
      }
    },
    timestamps: false
  });
  return PaymentInfo;
};
