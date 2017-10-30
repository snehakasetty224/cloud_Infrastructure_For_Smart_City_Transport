'use strict';
module.exports = function(sequelize, DataTypes) {
  var ClipperSensors = sequelize.define('ClipperSensors', {
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
    count: DataTypes.INTEGER,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ClipperSensors.belongsTo(models.Sensors, { foreignKey: 'sensor_id' });
      }
    },
    timestamps: false
  });
  return ClipperSensors;
};
