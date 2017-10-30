'use strict';

var SensorHubs = require('../models/').SensorHubs;
var uuid = require('node-uuid');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      status: data.status || true,
      name: data.name,
      description: data.description
    };
    SensorHubs.create(reqBody)
      .then(function (newSensorHubs) {
        res.status(201).json(newSensorHubs);
      })
      .catch(function (error) {
        console.log('Error adding sensor');
        res.status(500).json(error);
      });
  },

  detail(req, res) {
    var userId = req.headers.u || ''; //TODO: restrict ID per user
    SensorHubs.findById(req.params.id)
    .then(function (hub) {
      res.status(200).json(hub);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    SensorHubs.findAll()
    .then(function (hubs) {
      res.status(200).json(hubs);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

};
