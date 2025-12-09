"use strict";

var _dec, _class;
const {
  Module
} = require('@nestjs/common');
const {
  MongooseModule
} = require('@nestjs/mongoose');
const {
  DeliveryModule
} = require('./delivery/delivery.module');
let AppModule = (_dec = Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), DeliveryModule]
}), _dec(_class = class AppModule {}) || _class);
module.exports = {
  AppModule
};