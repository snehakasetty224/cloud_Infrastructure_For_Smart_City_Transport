'use strict';

module.exports = function(sequelize, DataTypes) {
  var Usage = sequelize.define('Usage', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    transaction_manager_id: {
      type: DataTypes.STRING,
      references: {
        model: 'TransactionManager', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    data: DataTypes.DECIMAL(10, 2),
    fromDate: DataTypes.DATE(6),
    endDate: DataTypes.DATE(6)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Usage.belongsTo(models.TransactionManager, {foreignKey: 'transaction_manager_id'})
      }
    },
    freezeTableName: true,
    // define the table's name
    tableName: 'Usage'
  });

  return Usage;
};

