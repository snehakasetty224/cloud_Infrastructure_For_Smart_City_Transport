'use strict';

module.exports = function(sequelize, DataTypes) {
  var Routes = sequelize.define('Routes', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    src_latitude: DataTypes.DOUBLE,
    src_longitude: DataTypes.DOUBLE,
    dest_latitude: DataTypes.DOUBLE,
    dest_longitude: DataTypes.DOUBLE,
    description: DataTypes.STRING,
    url: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
      }
    },
    timestamps: false
  });
  return Routes;
};
