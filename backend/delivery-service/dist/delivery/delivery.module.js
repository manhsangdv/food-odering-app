"use strict";

var _dec, _class;
const {
  Module
} = require('@nestjs/common');
const {
  MongooseModule
} = require('@nestjs/mongoose');
const {
  DeliveryController
} = require('./delivery.controller');
const {
  DeliveryService
} = require('./delivery.service');
const {
  DeliverySchema
} = require('./schemas/delivery.schema');
let DeliveryModule = (_dec = Module({
  imports: [MongooseModule.forFeature([{
    name: 'Delivery',
    schema: DeliverySchema
  }])],
  controllers: [DeliveryController],
  providers: [DeliveryService]
}), _dec(_class = class DeliveryModule {}) || _class);
module.exports = {
  DeliveryModule
};