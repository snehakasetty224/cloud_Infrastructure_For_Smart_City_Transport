'use strict';

var Account = require('./accounts');
var VirtualSensors = require('../models/').VirtualSensors;
var Sensors = require('../models/').Sensors;
var Hosts = require('../models/').Hosts;
var Routes = require('../models/').Routes;
var SensorHubs = require('../models/').SensorHubs;
var TransactionManager = require('../models/').TransactionManager;
var Account = require('./accounts');
var SLA = require('../models/').SLA;
var uuid = require('node-uuid');
var sequelize = require('sequelize');

var MAX_RATIO = 3;

//{
//     sensor_hub_id: <uuid>,
//     provider_id: <uuid>,
//     host_id: <uuid>,
//     route_id: <uuid>,
//     sensor_id: <uuid>,
//     state: <string>,
//     subscription_ratio: <string>,
//     virtual_sensor: string of <uuid> separated by ;
//     Virtual_sensor_status: <string>
// }
var sensorDataMassage = function(collections) {
  var data = {};
  var result = [];
  for (var i = 0; i < collections.length; i++) {
    // console.log(collections[i])
    var attr = collections[i];
    if (data[attr.sensor_id]) {
      data[attr.sensor_id] = data[attr.sensor_id] + 1;
    } else {
      data[attr.sensor_id] = 1;
    }
    attr.dataValues.subscription = data[attr.sensor_id];
    result.push(attr.dataValues);
  }
  return result;
};

var generateVSensors = function(vsensors) {
  var clipper = 0,
      location = 0,
      speed = 0,
      temperature = 0;
  for (var i = 0; i < vsensors.length; i++) {
    var type = vsensors[i].Sensor.type;
    if (type === 1) {
      location++;
    } else if (type === 2) {
      clipper++;
    } else if (type === 3) {
      speed++;
    } else {
      temperature++;
    }
  }
  return {
    data: vsensors,
    metadata: {
      location: location,
      clipper: clipper,
      speed: speed,
      temperature: temperature
    }
  };
};

module.exports = {

  create(req, res) {
    var findSensorsAvail = function(req, res, callback) {
      var data = req.body;
      Sensors.findAll({
        where: {
          type: data.type,
          host_id: data.host_id,
          status: true //only search for available sensor
        },
        attributes: ['id']
      })
      .then(function(data) {
        //console.log(data.length)
        // console.log(">>>>>> find sensors avail....");
        // console.log(data);
        var arr = [];
        for (var j = 0; j < data.length; j++) {
          arr.push(data[j].dataValues.id);
        }
        callback(arr);
      })
      .catch(function(error) {
        console.log(error);
        console.log('Error getting sensors');
        res.status(500).json(error);
      });
    };
    var findSensors = function(req, res, callback) {
      var data = req.body;
      TransactionManager.findAll({
        include: [{
          model: Sensors,
          where: {
            type: data.type,
            host_id: data.host_id
          }
        }],
        attributes: ['sensor_id',  sequelize.fn('count', sequelize.col('TransactionManager.id'))],
        group: ['TransactionManager.sensor_id']
      })
      .then(function(data) {
        console.log(">>>>>> find sensors....");
        console.log(data);
        callback(data);
      })
      .catch(function(error) {
        console.log(error);
        console.log('Error getting transaction manager');
        res.status(500).json(error);
      });
    };
    var getSensorId = function(arr1, arr2) {
      // console.log(arr1);
      // console.log(arr2);
      if(arr2.length === 0) {
        return arr1[0]; //return firstIds
      }
      for(var i = 0; i < arr2.length; i++) {
        if (arr2[i].count >= MAX_RATIO) {
          arr.splice(arr1.indexOf[arr2[i]], 1);
        }
      }
      return arr1[0];
    };
    var linksensor = function(req, res, newSensor, sensor_id) {
      var userId = req.headers.u;
      var data = req.body;
      var reqBody = {
        id: uuid.v4(),
        user_id: userId,
        virtualsensor_id: newSensor.id,
        sensor_id: sensor_id,
        sla_id: data.sla_id
      };
      TransactionManager.create(reqBody)
        .then(function (newTransaction) {
          newTransaction.vSensor = newSensor;
          res.status(201).json(newTransaction);
        })
        .catch(function(error) {
          console.log('Error adding transaction manager');
          res.status(500).json(error);
        });
    };
    findSensorsAvail(req, res, function(sensorsId) {
      findSensors(req, res, function(sensors_avail) {
        if (!!getSensorId(sensorsId, sensors_avail)) {
          var data = req.body;
          var id = uuid.v4();
          var reqBody = {
            id: id,
            status: data.status || true,
            name: data.name || 'sensor_' + id,
            description: data.description,
            storages: data.storages
          };
          VirtualSensors.create(reqBody)
            .then(function (newSensor) {
              linksensor(req, res, newSensor, getSensorId(sensorsId, sensors_avail));
            })
            .catch(function (error) {
              console.log(error);
              console.log('Error adding virtual sensor');
              res.status(500).json(error);
            });
        } else {
          res.status(500).json({
            'error': 'Exceed Physical sensor provisioning'
          });
        }
      });
    });
  },

  show_customer(req, res) {
    var userId = req.headers.u;
    TransactionManager.findAll({
      where: {
        user_id: userId
      },
      include: [Sensors, VirtualSensors],
      attributes: [] //not include the attribute not needed
    }).then(function(sensors) {
      res.status(200).json(generateVSensors(sensors));
    }).catch(function(error) {
      console.log(error);
      res.status(500).json(error);
    });
  },

  show(req, res) {
    var userId = req.headers.u;
    // findAllHosts(function(hosts) {
    Account.checkUser(userId, function(data) { //Check for admin vs. user as vendor
      if (data.roles === 'admin') {
        TransactionManager.findAll({
          include: [{
            model: Sensors,
            include: [{
              model: Hosts,
              include: [SensorHubs, Routes]
            }]
          }, {
            model: VirtualSensors
          }]
        }).then(function(sensors) {
          res.status(200).json(sensorDataMassage(sensors));
        }).catch(function(error) {
          console.log(error);
          res.status(500).json(error);
        })
      } else {
        TransactionManager.findAll({
          where: {
            user_id: userId
          },
          include: [{
            model: Sensors,
            include: [{
              model: Hosts,
              include: [SensorHubs, Routes]
            }]
          }, {
            model: VirtualSensors
          }]
        }).then(function(sensors) {
          res.status(200).json(sensorDataMassage(sensors));
        }).catch(function(error) {
          console.log(error);
          res.status(500).json(error);
        })
      }
    }, function(err) {
      res.status(500).json(err);
    });
    // }, function(err1) {
    //   res.status(500).json(err1);
    // });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      status: data.status //only update status
    };
    VirtualSensors.update(reqBody, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }
};
