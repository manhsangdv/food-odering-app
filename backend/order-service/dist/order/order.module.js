"use strict";

var _dec, _class;
const {
  Module
} = require('@nestjs/common');
const {
  MongooseModule
} = require('@nestjs/mongoose');
const {
  OrderController
} = require('./order.controller');
const {
  OrderService
} = require('./order.service');
const {
  OrderSchema
} = require('./schemas/order.schema');

/**
 * Feature module encapsulating the order domain. Responsible for
 * registering the schema and providing the controller and service.
 */
let OrderModule = (_dec = Module({
  imports: [MongooseModule.forFeature([{
    name: 'Order',
    schema: OrderSchema
  }])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
}), _dec(_class = class OrderModule {}) || _class);
module.exports = {
  OrderModule
};