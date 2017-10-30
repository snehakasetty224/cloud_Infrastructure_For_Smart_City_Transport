'use strict';

var Account = require('./accounts');
var Host = require('../models/').Hosts;
var Routes = require('../models/').Routes;
var SensorHubs = require('../models/').SensorHubs;
var uuid = require('node-uuid');
var randomip = require('random-ip');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      name: data.name,
      description: data.description,
      ip: randomip('192.168.2.0', 24),
      status: data.status || 1,
      creator_id: req.headers.u,
      sensorhub_id: data.sensorhub_id,
      route_id: data.route_id
    };
    Host.create(reqBody)
      .then(function (newHost) {
        res.status(201).json(newHost);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    var userId = req.headers.u || '';
    Account.checkUser(userId, function(data) { //Check for admin vs. user as vendor
      if (data.roles === 'admin' || data.roles === 'customer') {
        Host.findAll({
          include: [Routes, SensorHubs]
        })
        .then(function (hosts) {
          res.status(200).json(hosts);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
      } else {
        Host.findAll({
          where: {
            creator_id: userId
          },
          include: [Routes, SensorHubs]
        })
        .then(function (hosts) {
          res.status(200).json(hosts);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
      }
    }, function(err) {
      res.status(500).json(err);
    });
  },

  showstatus(req, res) {
    var userId = req.headers.u || '';
    var hosts_status = function(hosts) {
      var active = 0,
          inactive = 0;
      for (var i = 0; i < hosts.length; i++) {
        if (hosts[i].status) {
          active++;
        } else {
          inactive++;
        }
      }
      return {
        active: active,
        inactive: inactive
      };
    };
    Account.checkUser(userId, function(data) { //Check for admin vs. user as vendor
      if (data.roles === 'admin') {
        Host.findAll()
        .then(function (hosts) {
          res.status(200).json(hosts_status(hosts));
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
      } else {
        Host.findAll({
          where: {
            creator_id: userId
          }
        })
        .then(function (hosts) {
          res.status(200).json(hosts_status(hosts));
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
      }
    }, function(err) {
      res.status(500).json(err);
    });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      // name: data.name,
      // description: data.description,
      status: data.status
    };
    Host.update(reqBody, {
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

  detail(req, res) {
    var userId = req.headers.u || ''; //TODO: restrict ID per user
    Host.findById(req.params.id)
    .then(function (host) {
      res.status(200).json(host);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    Host.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

};
