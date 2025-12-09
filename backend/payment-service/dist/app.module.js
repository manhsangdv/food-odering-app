"use strict";

var _dec, _class;
const {
  Module
} = require('@nestjs/common');
const {
  MongooseModule
} = require('@nestjs/mongoose');
const {
  PaymentModule
} = require('./payment/payment.module');

/**
 * Root module for the payment service. It wires the database and
 * feature module together.
 */
let AppModule = (_dec = Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), PaymentModule]
}), _dec(_class = class AppModule {}) || _class);
module.exports = {
  AppModule
};