"use strict";

var _dec, _class;
const {
  Module
} = require('@nestjs/common');
const {
  MongooseModule
} = require('@nestjs/mongoose');
const {
  OrderModule
} = require('./order/order.module');

/**
 * Root module for the order service. It establishes the MongoDB
 * connection and provides the order feature module.
 */
let AppModule = (_dec = Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), OrderModule]
}), _dec(_class = class AppModule {}) || _class);
module.exports = {
  AppModule
};