'use strict';

module.exports = function(sequelize, DataTypes) {
  var SpeedSensors = sequelize.define('SpeedSensors', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    sensor_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Sensors', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    speed: DataTypes.DECIMAL(10, 2),
    timestamp: DataTypes.DATE,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        SpeedSensors.belongsTo(models.Sensors, { foreignKey: 'sensor_id' });
      }
    },
    timestamps: false
  });
  return SpeedSensors;
};
