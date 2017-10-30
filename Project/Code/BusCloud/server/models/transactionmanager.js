'use strict';

module.exports = function(sequelize, DataTypes) {
  var TransactionManagers = sequelize.define('TransactionManager', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    virtualsensor_id: {
      type: DataTypes.STRING,
      references: {
        model: 'VirtualSensors',
        key: 'id'
      }
    },
    sensor_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Sensors', //physical sensor
        key: 'id'
      }
    },
    sla_id: {
      type: DataTypes.STRING,
      references: {
        model: 'SLA',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        TransactionManagers.belongsTo(models.Sensors, { foreignKey: 'sensor_id' });
        TransactionManagers.belongsTo(models.VirtualSensors, { foreignKey: 'virtualsensor_id' });
        TransactionManagers.belongsTo(models.SLA, { foreignKey: 'sla_id' });
      }
    },
    freezeTableName: true,
    // define the table's name
    tableName: 'TransactionManager',
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,
  });

  return TransactionManagers;
};
