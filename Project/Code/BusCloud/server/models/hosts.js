'use strict';
module.exports = function(sequelize, DataTypes) {
  var Hosts = sequelize.define('Hosts', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    ip: DataTypes.STRING,
    sensorhub_id: {
      type: DataTypes.STRING,
      references: {
        model: 'SensorHubs', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    route_id: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // console.log(models)
        Hosts.belongsTo(models.Routes, {foreignKey: 'route_id'})
        Hosts.belongsTo(models.SensorHubs, {foreignKey: 'sensorhub_id'})
      }
    }
  });
  return Hosts;
};
