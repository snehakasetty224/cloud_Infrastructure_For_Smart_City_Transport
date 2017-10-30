'use strict';

var PaymentInfo = require('../models/').PaymentInfo;
var uuid = require('node-uuid');

module.exports = {

  create(req, res) {
    var data = req.body,
        userId = req.headers.u || '';
    if (userId === '') {
      res.status(500).json({
        errorCode: 404,
        errorMessage: 'Invalid userId'
      });
      return;
    }
    var reqBody = {
      id: uuid.v4(),
      userId: userId,
      card_number: data.card_number,
      card_owner: data.card_onwer,
      expiration_date: data.expiration_date,
      address: data.address,
      zip: data.zip,
      state: data.state,
      country: data.country,
      phone: data.phone,
      isDefault: data.isDefault || true
    };
    PaymentInfo.create(reqBody)
      .then(function (paymenInfo) {
        res.status(201).json(paymenInfo);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  update(req, res) {
    var data = req.body,
        userId = req.headers.u || '';
    if (userId === '') {
      res.status(500).json({
        errorCode: 404,
        errorMessage: 'Invalid userId'
      });
      return;
    }
    var reqBody = {
      card_number: data.card_number,
      card_onwer: data.card_onwer,
      expiration_date: data.expiration_date,
      address: data.address,
      zip: data.zip,
      state: data.state,
      country: data.country,
      phone: data.phone,
      isDefault: data.isDefault || false
    };
    PaymentInfo.update(reqBody, {
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

  show(req, res) {
    PaymentInfo.findAll({
      where: {
        userId: req.headers.u
      }
    })
    .then(function (paymentInfos) {
      res.status(200).json(paymentInfos);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }
};
