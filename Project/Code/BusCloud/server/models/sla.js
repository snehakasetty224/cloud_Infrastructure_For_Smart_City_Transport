'use strict';

module.exports = function(sequelize, DataTypes) {
  var SLA = sequelize.define('SLA', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    description: DataTypes.STRING,
    user_rate: DataTypes.DECIMAL(10, 2),
    vendor_rate: DataTypes.DECIMAL(10, 2),
    admin_rate: DataTypes.DECIMAL(10, 2)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false,
    freezeTableName: true,
    // define the table's name
    tableName: 'SLA',
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true
  });
  return SLA;
};
