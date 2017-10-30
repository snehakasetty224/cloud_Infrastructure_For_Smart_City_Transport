'use strict';

module.exports = function(sequelize, DataTypes) {
  var VirtualSensors = sequelize.define('VirtualSensors', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    status: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    storages: DataTypes.ENUM('2G', '4G', '8G', '16G')
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    underscored: true
  });
  return VirtualSensors;
};
