'use strict';

var Account = require('./accounts');
var TransactionManager = require('../models/').TransactionManager;
var SLA = require('../models/').SLA;
var Sensors = require('../models/').Sensors;
var VirtualSensors = require('../models/').VirtualSensors;
var Usage = require('../models/').Usage;
var uuid = require('node-uuid');

module.exports = {
  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      transaction_manager_id: data.transaction_manager_id,
      data: data.data,
      fromDate: data.fromDate,
      endDate: data.endDate
    };
    Usage.create(reqBody)
      .then(function (newUsage) {
        res.status(201).json(newUsage);
      })
      .catch(function (error) {
        console.log('Error adding usage');
        res.status(500).json(error);
      });
  },

  show_detail(req, res) {
    Usage.findAll({
      where: {
        id: req.params.id
      },
      include: [{
        model: TransactionManager,
        include: [SLA]
      }]
    })
    .then(function (data) {
      res.status(200).json(data[0]);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      data: data.data //Usage
    };
    Usage.update(reqBody, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecord) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    var userId = req.headers.u;
    Account.checkUser(userId, function(data) { //Check for admin vs. user as vendor
      console.log('querying for data...');
      if (data.roles === 'admin') { //admin
        console.log('querying metering for admin...');
        Usage.findAll({
          include: [{
            model: TransactionManager,
            include: [SLA, Sensors, VirtualSensors]
          }]
        })
        .then(function(data) {
          res.status(200).json(data);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).json(error)
        });
      } else if (data.roles === 'vendor') { //vendor
        console.log('querying metering for vendor...');
        Sensors.findAll({
          where: {
            provider_id: userId,
            attributes: ['id'] //only return id
          }
        })
        .then(function(sensorIds) {
          Usage.findAll({
            include: [{
              model: TransactionManager,
              include: [SLA, Sensors, VirtualSensors],
              where: {
                id: {
                  $in: sensorIds
                }
              }
            }]
          })
          .then(function(data) {
            res.status(200).json(data);
          })
          .catch(function(error) {
            console.log(error);
            res.status(500).json(error)
          });
        })
        .catch(function(error2) {
          console.log(error2);
          res.status(500).json(error2);
        });
      } else { //customer
        console.log('querying metering for customer...');
        Usage.findAll({
          include: [{
            model: TransactionManager,
            include: [SLA, VirtualSensors], //do not need to query sensor here for customer
            where: {
              user_id: userId
            }
          }]
        })
        .then(function(data) {
          res.status(200).json(data);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).json(error)
        });
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }
};
