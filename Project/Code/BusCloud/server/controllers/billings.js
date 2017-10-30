'use strict';

var Account = require('./accounts');
var User = require('../models/').Users;
var Billings = require('../models/').Billings;
var PaymentHistory = require('../models/').PaymentHistory;
var uuid = require('node-uuid');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      userId: req.headers.u,
      startDate: data.startDate,
      endDate: data.endDate,
      dueDate: data.dueDate,
      amount: data.amount,
      isPaid: false
    };
    Billings.create(reqBody)
      .then(function (newBilling) {
        res.status(201).json(newBilling);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
  },

  show(req, res) {
    var userId = req.headers.u;
    Account.checkUser(userId, function(data) { //Check for admin vs. user as vendor
      if (data.roles === 'admin') {
        Billings.findAll({
          include: [User]
        })
        .then(function (billings) {
          res.status(200).json(billings);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
      } else {
        Billings.findAll({
          where: {
            userId: userId
          },
          include: [User]
        })
        .then(function (billings) {
          res.status(200).json(billings);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }
};
