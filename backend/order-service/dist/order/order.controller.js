"use strict";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _class, _class2;
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
const {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  HttpException,
  HttpStatus,
  Inject
} = require('@nestjs/common');
const {
  MessagePattern,
  Payload
} = require('@nestjs/microservices');
const {
  OrderService
} = require('./order.service');
let OrderController = (_dec = Controller('api/orders'), _dec2 = function (target, key) {
  return Inject(OrderService)(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [void 0]), _dec5 = Post(), _dec6 = function (target, key) {
  return Body()(target, key, 0);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [void 0]), _dec9 = Get(':id'), _dec0 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [void 0]), _dec11 = Get('customer/:customerId'), _dec12 = function (target, key) {
  return Param('customerId')(target, key, 0);
}, _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [void 0]), _dec15 = Get('restaurant/:restaurantId'), _dec16 = function (target, key) {
  return Param('restaurantId')(target, key, 0);
}, _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [void 0]), _dec19 = Patch(':id/confirm'), _dec20 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [void 0]), _dec23 = Patch(':id/preparing'), _dec24 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [void 0]), _dec27 = Patch(':id/ready'), _dec28 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [void 0]), _dec31 = Patch(':id/delivering'), _dec32 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec33 = function (target, key) {
  return Body()(target, key, 1);
}, _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec36 = Patch(':id/complete'), _dec37 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec38 = Reflect.metadata("design:type", Function), _dec39 = Reflect.metadata("design:paramtypes", [void 0]), _dec40 = Patch(':id/cancel'), _dec41 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec42 = function (target, key) {
  return Body()(target, key, 1);
}, _dec43 = Reflect.metadata("design:type", Function), _dec44 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec45 = MessagePattern('payment_confirmed'), _dec46 = function (target, key) {
  return Payload()(target, key, 0);
}, _dec47 = Reflect.metadata("design:type", Function), _dec48 = Reflect.metadata("design:paramtypes", [void 0]), _dec49 = MessagePattern('delivery_status_changed'), _dec50 = function (target, key) {
  return Payload()(target, key, 0);
}, _dec51 = Reflect.metadata("design:type", Function), _dec52 = Reflect.metadata("design:paramtypes", [void 0]), _dec53 = Get('stats/restaurant/:restaurantId'), _dec54 = function (target, key) {
  return Param('restaurantId')(target, key, 0);
}, _dec55 = function (target, key) {
  return Body()(target, key, 1);
}, _dec56 = Reflect.metadata("design:type", Function), _dec57 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }
  async createOrder(createDto) {
    try {
      if (!createDto.customerId || !createDto.restaurantId || !createDto.items || createDto.items.length === 0) {
        throw new HttpException('Missing required fields: customerId, restaurantId, items', HttpStatus.BAD_REQUEST);
      }

      // Validate items structure
      createDto.items.forEach((item, idx) => {
        if (!item.menuItemId || !item.name || item.price === undefined || !item.quantity) {
          throw new HttpException(`Invalid item at index ${idx}: missing menuItemId, name, price, or quantity`, HttpStatus.BAD_REQUEST);
        }
      });
      return await this.orderService.createOrder(createDto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to create order', HttpStatus.BAD_REQUEST);
    }
  }
  async getOrder(id) {
    const order = await this.orderService.getOrderById(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }
  async getCustomerOrders(customerId) {
    return this.orderService.getOrdersByCustomer(customerId);
  }
  async getRestaurantOrders(restaurantId) {
    return this.orderService.getOrdersByRestaurant(restaurantId);
  }
  async confirmOrder(id) {
    return this.orderService.confirmOrder(id);
  }
  async startPreparing(id) {
    return this.orderService.startPreparing(id);
  }
  async markReady(id) {
    return this.orderService.startReady(id);
  }
  async startDelivery(id, body) {
    const {
      distanceKm,
      etaMinutes
    } = body;
    if (distanceKm === undefined || etaMinutes === undefined) {
      throw new HttpException('Missing distance or ETA', HttpStatus.BAD_REQUEST);
    }
    return this.orderService.startDelivery(id, distanceKm, etaMinutes);
  }
  async completeOrder(id) {
    return this.orderService.completeOrder(id);
  }
  async cancelOrder(id, body) {
    const {
      reason
    } = body;
    try {
      return await this.orderService.cancelOrder(id, reason || 'No reason provided');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async handlePaymentConfirmed(data) {
    return this.orderService.markOrderAsPaid(data.orderId, data.paymentId);
  }
  async handleDeliveryStatusChange(data) {
    return this.orderService.handleDeliveryStatusChange(data);
  }
  async getRestaurantStats(restaurantId, body) {
    const {
      startDate,
      endDate
    } = body;
    return this.orderService.getOrderStats(restaurantId, new Date(startDate), new Date(endDate));
  }
}, _applyDecoratedDescriptor(_class2.prototype, "createOrder", [_dec5, _dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "createOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getOrder", [_dec9, _dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "getOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getCustomerOrders", [_dec11, _dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "getCustomerOrders"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRestaurantOrders", [_dec15, _dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "getRestaurantOrders"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirmOrder", [_dec19, _dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "confirmOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startPreparing", [_dec23, _dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "startPreparing"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "markReady", [_dec27, _dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "markReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startDelivery", [_dec31, _dec32, _dec33, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "startDelivery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeOrder", [_dec36, _dec37, _dec38, _dec39], Object.getOwnPropertyDescriptor(_class2.prototype, "completeOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cancelOrder", [_dec40, _dec41, _dec42, _dec43, _dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "cancelOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handlePaymentConfirmed", [_dec45, _dec46, _dec47, _dec48], Object.getOwnPropertyDescriptor(_class2.prototype, "handlePaymentConfirmed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleDeliveryStatusChange", [_dec49, _dec50, _dec51, _dec52], Object.getOwnPropertyDescriptor(_class2.prototype, "handleDeliveryStatusChange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRestaurantStats", [_dec53, _dec54, _dec55, _dec56, _dec57], Object.getOwnPropertyDescriptor(_class2.prototype, "getRestaurantStats"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
module.exports = {
  OrderController
};