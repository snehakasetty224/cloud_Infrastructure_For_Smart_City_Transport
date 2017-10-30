'use strict';
module.exports = function(sequelize, DataTypes) {
  var SensorHubs = sequelize.define('SensorHubs', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    status: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return SensorHubs;
};
