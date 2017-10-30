'use strict';

var SLA = require('../models/').SLA;
var uuid = require('node-uuid');

module.exports = {
  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      description: data.description,
      user_rate: data.user_rate,
      vendor_rate: data.vendor_rate,
      admin_rate: data.admin_rate
    };
    SLA.create(reqBody)
      .then(function (newSLA) {
        res.status(201).json(newSLA);
      })
      .catch(function (error) {
        console.log('Error adding SLA');
        res.status(500).json(error);
      });
  },

  show(req, res) {
     SLA.findAll()
      .then(function(data) {
        res.status(200).json(data);
      })
      .catch(function(error) {
        res.status(500).json(error)
      });
  }

}
