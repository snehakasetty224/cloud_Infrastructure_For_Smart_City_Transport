'use strict';

var Account = require('./accounts');
var Routes = require('../models/').Routes;
var uuid = require('node-uuid');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      src_latitude: data.src_latitude,
      src_longitude: data.src_longitude,
      dest_latitude: data.dest_latitude,
      dest_longitude: data.dest_longitude,
      description: data.description,
      url: data.url
    };
    Routes.create(reqBody)
      .then(function (newRoute) {
        res.status(201).json(newRoute);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    var userId = req.headers.u || '';
    Routes.findAll()
    .then(function (routes) {
      res.status(200).json(routes);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  detail(req, res) {
    var userId = req.headers.u || ''; //TODO: restrict ID per user
    Routes.findById(req.params.id)
    .then(function (route) {
      res.status(200).json(route);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

};
