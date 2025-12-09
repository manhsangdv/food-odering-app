"use strict";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _class, _class2;
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
const {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus
} = require('@nestjs/common');
const {
  MessagePattern,
  Payload,
  Ctx
} = require('@nestjs/microservices');
const {
  DeliveryService
} = require('./delivery.service');
let DeliveryController = (_dec = Controller('api/deliveries'), _dec2 = function (target, key) {
  return Inject(DeliveryService)(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [void 0]), _dec5 = MessagePattern('order_paid'), _dec6 = function (target, key) {
  return Payload()(target, key, 0);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [void 0]), _dec9 = MessagePattern('order_created'), _dec0 = function (target, key) {
  return Payload()(target, key, 0);
}, _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [void 0]), _dec11 = Get('available'), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", []), _dec14 = Post(), _dec15 = function (target, key) {
  return Body()(target, key, 0);
}, _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [void 0]), _dec18 = Get('driver/:driverId/history'), _dec19 = function (target, key) {
  return Param('driverId')(target, key, 0);
}, _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [void 0]), _dec22 = Get(':id'), _dec23 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", [void 0]), _dec26 = Patch(':id/assign'), _dec27 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec28 = function (target, key) {
  return Body()(target, key, 1);
}, _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec31 = Patch(':id/arrived'), _dec32 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", [void 0]), _dec35 = Patch(':id/picked'), _dec36 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", [void 0]), _dec39 = Patch(':id/complete'), _dec40 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec41 = Reflect.metadata("design:type", Function), _dec42 = Reflect.metadata("design:paramtypes", [void 0]), _dec43 = Get('order/:orderId'), _dec44 = function (target, key) {
  return Param('orderId')(target, key, 0);
}, _dec45 = Reflect.metadata("design:type", Function), _dec46 = Reflect.metadata("design:paramtypes", [void 0]), _dec47 = Post(':id/start'), _dec48 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec49 = function (target, key) {
  return Body()(target, key, 1);
}, _dec50 = Reflect.metadata("design:type", Function), _dec51 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec52 = Patch(':id/status'), _dec53 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec54 = function (target, key) {
  return Body()(target, key, 1);
}, _dec55 = Reflect.metadata("design:type", Function), _dec56 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec57 = Get('restaurant/:restaurantId/active'), _dec58 = function (target, key) {
  return Param('restaurantId')(target, key, 0);
}, _dec59 = Reflect.metadata("design:type", Function), _dec60 = Reflect.metadata("design:paramtypes", [void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = class DeliveryController {
  constructor(deliveryService) {
    this.deliveryService = deliveryService;
  }
  async handleOrderPaid(data) {
    try {
      return await this.deliveryService.createDelivery(data);
    } catch (error) {
      console.error('Error creating delivery:', error);
    }
  }

  // Also create delivery when an order is created for COD flows
  async handleOrderCreated(data) {
    try {
      // For COD (or non-online) orders, create a delivery so drivers can pick up
      return await this.deliveryService.createDelivery(data);
    } catch (error) {
      console.error('Error creating delivery from order_created:', error);
    }
  }

  // Drivers: list available deliveries (no driver assigned, newly created/confirmed)
  async getAvailable() {
    return this.deliveryService.getAvailableDeliveries();
  }

  // Allow creating delivery via HTTP (fallback for when events are missed)
  async createDeliveryHttp(orderData) {
    try {
      return await this.deliveryService.createDelivery(orderData);
    } catch (error) {
      console.error('Error creating delivery via HTTP:', error);
      throw new HttpException('Failed to create delivery', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Drivers: list own delivery history (by driverId)
  async getDriverHistory(driverId) {
    return this.deliveryService.getDeliveriesByDriver(driverId);
  }
  async getDelivery(id) {
    const delivery = await this.deliveryService.getDeliveryById(id);
    if (!delivery) {
      throw new HttpException('Delivery not found', HttpStatus.NOT_FOUND);
    }
    return delivery;
  }

  // Driver accepts/assigns a delivery
  async assignDriver(id, body) {
    const {
      driverId
    } = body;
    if (!driverId) throw new HttpException('driverId required', HttpStatus.BAD_REQUEST);
    return this.deliveryService.assignDriver(id, driverId);
  }

  // Driver marks arrived at restaurant
  async markArrived(id) {
    return this.deliveryService.markArrived(id);
  }

  // Driver marks picked up
  async markPicked(id) {
    return this.deliveryService.markPicked(id);
  }

  // Driver completes delivery
  async complete(id) {
    return this.deliveryService.completeDelivery(id);
  }
  async getByOrder(orderId) {
    const delivery = await this.deliveryService.getDeliveryByOrderId(orderId);
    if (!delivery) {
      throw new HttpException('Delivery not found', HttpStatus.NOT_FOUND);
    }
    return delivery;
  }
  async startDelivery(id, body) {
    const {
      restaurantLat,
      restaurantLng,
      customerLat,
      customerLng
    } = body;
    if (!restaurantLat || !restaurantLng || !customerLat || !customerLng) {
      throw new HttpException('Missing location coordinates', HttpStatus.BAD_REQUEST);
    }
    return this.deliveryService.startDelivery(id, restaurantLat, restaurantLng, customerLat, customerLng);
  }
  async updateStatus(id, body) {
    const {
      status
    } = body;
    if (!status) {
      throw new HttpException('Status is required', HttpStatus.BAD_REQUEST);
    }
    return this.deliveryService.updateStatus(id, status);
  }
  async getRestaurantDeliveries(restaurantId) {
    return this.deliveryService.getDeliveriesByRestaurant(restaurantId, 'DELIVERING');
  }
}, _applyDecoratedDescriptor(_class2.prototype, "handleOrderPaid", [_dec5, _dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "handleOrderPaid"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleOrderCreated", [_dec9, _dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "handleOrderCreated"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getAvailable", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "getAvailable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createDeliveryHttp", [_dec14, _dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "createDeliveryHttp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getDriverHistory", [_dec18, _dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "getDriverHistory"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getDelivery", [_dec22, _dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "getDelivery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "assignDriver", [_dec26, _dec27, _dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "assignDriver"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "markArrived", [_dec31, _dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "markArrived"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "markPicked", [_dec35, _dec36, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "markPicked"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "complete", [_dec39, _dec40, _dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "complete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getByOrder", [_dec43, _dec44, _dec45, _dec46], Object.getOwnPropertyDescriptor(_class2.prototype, "getByOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startDelivery", [_dec47, _dec48, _dec49, _dec50, _dec51], Object.getOwnPropertyDescriptor(_class2.prototype, "startDelivery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateStatus", [_dec52, _dec53, _dec54, _dec55, _dec56], Object.getOwnPropertyDescriptor(_class2.prototype, "updateStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRestaurantDeliveries", [_dec57, _dec58, _dec59, _dec60], Object.getOwnPropertyDescriptor(_class2.prototype, "getRestaurantDeliveries"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
module.exports = {
  DeliveryController
};