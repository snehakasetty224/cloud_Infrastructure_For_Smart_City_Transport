'use strict';
module.exports = function(sequelize, DataTypes) {
  var Billings = sequelize.define('Billings', {
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
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    amount: DataTypes.DECIMAL(10,2),
    isPaid: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Billings.belongsTo(models.Users, { foreignKey: 'userId' });
      }
    },
    timestamps: false
  });
  return Billings;
};
