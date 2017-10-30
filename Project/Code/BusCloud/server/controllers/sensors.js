'use strict';

var Account = require('./accounts');
var Hosts = require('../models/').Hosts;
var SensorType = require('../models/').SensorTypes;
var Sensors = require('../models/').Sensors;
var ClipperSensor = require('../models/').ClipperSensors;
var SpeedSensor = require('../models/').SpeedSensors;
var LocationSensor = require('../models/').LocationSensors;
var TemperatureSensor = require('../models/').TemperatureSensors;
var uuid = require('node-uuid');

var generateSensors = function(sensors) {
  var clipper = 0,
      location = 0,
      speed = 0,
      temperature = 0;
  for (var i = 0; i < sensors.length; i++) {
    var type = sensors[i].type;
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
    data: sensors,
    metadata: {
      location: location,
      clipper: clipper,
      speed: speed,
      temperature: temperature
    }
  };
};

function createSensorDetail(newSensor, type, res) {
  console.log('Creating sensor detail');
  var data = {},
      id = uuid.v4();
  if (type === 1) { //location sensor
    var DEFAULT_LATITUDE = 37.395012;
    var DEAFULT_LONGITUDE = -121.963972;
    data = {
      id: id,
      sensor_id: newSensor.id,
      latitude: DEFAULT_LATITUDE,
      longitude: DEAFULT_LONGITUDE
    };
    LocationSensor.create(data)
      .then(function (detailSensor) {
        res.status(201).json(detailSensor);
      })
      .catch(function (error) {
        console.log('Error adding location detail sensor');
        res.status(500).json(error);
      });
  } else if (type === 2) { //clipper sensor
    data = {
      id: id,
      count: 0,
      sensor_id: newSensor.id
    };
    ClipperSensor.create(data)
      .then(function (detailSensor) {
        res.status(201).json(detailSensor);
      })
      .catch(function (error) {
        console.log('Error adding clipper detail sensor');
        res.status(500).json(error);
      });
  } else if (type === 3) { //speed sensor
    var DEFAULT_SPEED = 0.00;
    data = {
      id: id,
      sensor_id: newSensor.id,
      speed: DEFAULT_SPEED
    };
    SpeedSensor.create(data)
      .then(function (detailSensor) {
        res.status(201).json(detailSensor);
      })
      .catch(function (error) {
        console.log('Error adding speed detail sensor');
        res.status(500).json(error);
      });
  } else { //temperature sensor
    var DEFAULT_TEMP = 70.00;
    data = {
      id: id,
      sensor_id: newSensor.id,
      temperature: DEFAULT_TEMP
    };
    TemperatureSensor.create(data)
      .then(function (detailSensor) {
        res.status(201).json(detailSensor);
      })
      .catch(function (error) {
        console.log('Error adding detail sensor');
        res.status(500).json(error);
      });
  }
};

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      type: data.type,
      status: true,
      name: data.name,
      description: data.description,
      provider_id: req.headers.u,
      host_id: data.host_id,
      storages: data.storages
    };
    Sensors.create(reqBody)
      .then(function (newSensor) {
        // console.log(newSensor);
        // res.status(200).json(newSensor);
        try {
          createSensorDetail(newSensor, data.type, res);
        } catch(ex) {
          console.log(ex);
        }
      })
      .catch(function (error) {
        console.log('Error adding sensor');
        res.status(500).json(error);
      });
  },

  //Turn on, off phyiscal sensor
  update(req, res) {
    var data = req.body;
    var reqBody = {
      status: (data.status === true) ? true : false
    };
    Sensors.update(reqBody, {
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
  },

  //Show sensor
  show(req, res) {
    var userId = req.headers.u || '';
    Account.checkUser(userId, function(data) { //Check for admin vs. user as vendor
      if (data.roles === 'admin') {
        Sensors.findAll()
          .then(function (sensors) {
            res.status(200).json(generateSensors(sensors));
          })
          .catch(function (error) {
            res.status(500).json(error);
          });
      } else {
        Sensors.findAll({
          where: {
            provider_id: userId
          }
        })
        .then(function (sensors) {
          res.status(200).json(generateSensors(sensors));
        })
        .catch(function (error) {
          console.log(error);
          console.log('Error showing sensors');
          res.status(500).json(error);
        });
      }
    }, function(err) {
      res.status(500).json(err);
    });
  },

  //This is bad, should combine, but i put it here for easier to track within group
  show_per_hub(req, res) {
    Account.checkUser(userId, function(data) { //Check for admin vs. user as vendor
      if (data.roles === 'admin') {
        Sensors.findAll({
          where: {
            sensorhub_id: req.params.hub_id
          }
        })
        .then(function (sensors) {
          res.status(200).json(generateSensors(sensors));
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
      } else {
        Sensors.findAll({
          where: {
            provider_id: userId,
            sensorhub_id: req.params.hub_id
          }
        })
        .then(function (sensors) {
          res.status(200).json(generateSensors(sensors));
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
      }
    }, function(err) {
      res.status(500).json(err);
    });
  },

  type(req, res) {
    SensorType.findAll().then(function(types) {
      res.status(200).json(types);
    }).catch(function(error) {
      res.status(500).json(error);
    });
  },

  //Get location sensors
  show_location(req, res) {
    LocationSensor.findAll({
      include: {
        model: Sensors,
        include: {
          model: Hosts,
          where: {
            status: true //only online bus
          }
        }
      }
    })
    .then(function(sensors) {
      res.status(200).json(sensors);
    })
    .catch(function(error) {
      console.log(error);
      console.log('Error showing location sensors');
      res.status(500).json(error);
    });
  }

};
