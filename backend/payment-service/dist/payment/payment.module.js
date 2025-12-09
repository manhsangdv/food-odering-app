"use strict";

var _dec, _class;
const {
  Module
} = require('@nestjs/common');
const {
  MongooseModule
} = require('@nestjs/mongoose');
const {
  PaymentController
} = require('./payment.controller');
const {
  PaymentService
} = require('./payment.service');
const {
  PaymentSchema
} = require('./schemas/payment.schema');

/**
 * Feature module for the payment domain. Registers the payment schema
 * and provides the service and controller for processing payment
 * events and exposing HTTP endpoints.
 */
let PaymentModule = (_dec = Module({
  imports: [MongooseModule.forFeature([{
    name: 'Payment',
    schema: PaymentSchema
  }])],
  controllers: [PaymentController],
  providers: [PaymentService]
}), _dec(_class = class PaymentModule {}) || _class);
module.exports = {
  PaymentModule
};