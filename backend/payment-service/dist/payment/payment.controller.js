"use strict";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _class, _class2;
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
const {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Query,
  Headers,
  HttpException,
  HttpStatus,
  Inject
} = require('@nestjs/common');
const {
  MessagePattern,
  Payload
} = require('@nestjs/microservices');
const {
  PaymentService
} = require('./payment.service');
let PaymentController = (_dec = Controller('api/payments'), _dec2 = function (target, key) {
  return Inject(PaymentService)(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [void 0]), _dec5 = Post('initiate'), _dec6 = function (target, key) {
  return Body()(target, key, 0);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [void 0]), _dec9 = Post('callback'), _dec0 = function (target, key) {
  return Body()(target, key, 0);
}, _dec1 = function (target, key) {
  return Headers('authorization')(target, key, 1);
}, _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec12 = Get('callback'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec15 = Get(':id'), _dec16 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [void 0]), _dec19 = Get('order/:orderId'), _dec20 = function (target, key) {
  return Param('orderId')(target, key, 0);
}, _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [void 0]), _dec23 = Post(':id/callback'), _dec24 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec25 = function (target, key) {
  return Body()(target, key, 1);
}, _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec28 = Patch(':id/retry'), _dec29 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", [void 0]), _dec32 = Post(':id/refund'), _dec33 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec34 = function (target, key) {
  return Body()(target, key, 1);
}, _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec37 = Get('stats/report'), _dec38 = function (target, key) {
  return Query('startDate')(target, key, 0);
}, _dec39 = function (target, key) {
  return Query('endDate')(target, key, 1);
}, _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec42 = MessagePattern('order_requires_payment'), _dec43 = function (target, key) {
  return Payload()(target, key, 0);
}, _dec44 = Reflect.metadata("design:type", Function), _dec45 = Reflect.metadata("design:paramtypes", [void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }
  async initiatePayment(body) {
    const {
      orderId,
      customerId,
      amount,
      paymentMethod
    } = body;
    if (!orderId || !customerId || !amount) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }
    return this.paymentService.initiatePayment(orderId, customerId, amount, paymentMethod || 'SEPAY');
  }
  async handleSepayCallback(body, authorization) {
    try {
      return await this.paymentService.handleSepayWebhook(body, authorization);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }
  async sepayWebhookHealthCheck() {
    return {
      success: true,
      message: 'OK'
    };
  }
  async getPayment(id) {
    const payment = await this.paymentService.getPaymentById(id);
    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }
  async getPaymentByOrder(orderId) {
    const payment = await this.paymentService.getPaymentByOrderId(orderId);
    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }
  async handleCallback(id, body) {
    try {
      return await this.paymentService.handlePaymentCallback(id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async retryPayment(id) {
    try {
      return await this.paymentService.retryPayment(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async refundPayment(id, body) {
    const {
      reason
    } = body;
    try {
      return await this.paymentService.refundPayment(id, reason || 'Customer request');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getStats(startDate, endDate) {
    return this.paymentService.getPaymentStats(new Date(startDate), new Date(endDate));
  }
  async handleOrderRequiresPayment(orderData) {
    return this.paymentService.initiatePayment(orderData._id, orderData.customerId, orderData.total, 'SEPAY');
  }
}, _applyDecoratedDescriptor(_class2.prototype, "initiatePayment", [_dec5, _dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "initiatePayment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleSepayCallback", [_dec9, _dec0, _dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "handleSepayCallback"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sepayWebhookHealthCheck", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "sepayWebhookHealthCheck"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPayment", [_dec15, _dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "getPayment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPaymentByOrder", [_dec19, _dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "getPaymentByOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleCallback", [_dec23, _dec24, _dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "handleCallback"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "retryPayment", [_dec28, _dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "retryPayment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refundPayment", [_dec32, _dec33, _dec34, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "refundPayment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getStats", [_dec37, _dec38, _dec39, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "getStats"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleOrderRequiresPayment", [_dec42, _dec43, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "handleOrderRequiresPayment"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
module.exports = {
  PaymentController
};