'use strict';

var User = require('../models/').Users;
var uuid = require('node-uuid');
var passwordHelpers = require('../helpers/passwordHelpers');
var security = require('../helpers/security');

module.exports = {

  create(req, res) {
    var data = req.body;
    var hashPassword = passwordHelpers.hashPassword(data.password);
    var userId =  uuid.v4();
    var reqBody = {
      id: userId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      roles: data.role || 'customer',
      password: hashPassword,
      isAdmin: data.isAdmin || false
    };
    User.create(reqBody)
      .then(function (newUser) {
        if (req.headers.setcookie === 'true') {
          security.setUserCookie(req, newUser.id, newUser.roles);
        }
        res.status(201).json(newUser);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    User.findById(req.params.id)
    .then(function (user) {
      res.status(200).json(user);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  checkUser(userId, callback, errCallback) {
    User.findById(userId)
      .then(function(user) {
        callback(user);
      })
      .catch(function(err) {
        errCallback(err);
      })
  },

  login(req, res) {
    var data = req.body;
    console.log(req.headers);
    User.findAll({
      where: {
        email: data.email
      }
    }).then(function(user) {
      if (passwordHelpers.verifyPassword(data.password, user[0].password)) {
        if (req.headers.setcookie === 'true') {
          security.setUserCookie(req, user[0].id, user[0].roles);
        }
        res.status(200).json(user[0]);
      } else {
        res.status(500).json({
          errorCode: 4003,
          errorMessage: 'Invalid password'
        });
      }
    }).catch(function(err) {
      res.status(500).json(error);
    })
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    };
    if (data.password) {
      reqBody.password = passwordHelpers.hashPassword(data.password);
    }
    User.update(reqBody, {
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

  delete(req, res) {
    User.destroy({
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
