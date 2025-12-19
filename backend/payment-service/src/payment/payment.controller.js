const { Controller, Post, Get, Param, Body, Patch, Query, Headers, HttpException, HttpStatus, Inject } = require('@nestjs/common');
const { MessagePattern, Payload } = require('@nestjs/microservices');
const { PaymentService } = require('./payment.service');

@Controller('api/payments')
class PaymentController {
  constructor(@Inject(PaymentService) paymentService) {
    this.paymentService = paymentService;
  }

  @Post('initiate')
  async initiatePayment(@Body() body) {
    const { orderId, customerId, amount, paymentMethod } = body;
    
    if (!orderId || !customerId || !amount) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }

    return this.paymentService.initiatePayment(orderId, customerId, amount, paymentMethod || 'SEPAY');
  }

  @Post('callback')
  async handleSepayCallback(@Body() body, @Headers('authorization') authorization) {
    try {
      return await this.paymentService.handleSepayWebhook(body, authorization);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Get('callback')
  async sepayWebhookHealthCheck() {
    return { success: true, message: 'OK' };
  }

  @Get(':id')
  async getPayment(@Param('id') id) {
    const payment = await this.paymentService.getPaymentById(id);
    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }

  @Get('order/:orderId')
  async getPaymentByOrder(@Param('orderId') orderId) {
    const payment = await this.paymentService.getPaymentByOrderId(orderId);
    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }

  @Post(':id/callback')
  async handleCallback(@Param('id') id, @Body() body) {
    try {
      return await this.paymentService.handlePaymentCallback(id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/retry')
  async retryPayment(@Param('id') id) {
    try {
      return await this.paymentService.retryPayment(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/refund')
  async refundPayment(@Param('id') id, @Body() body) {
    const { reason } = body;
    try {
      return await this.paymentService.refundPayment(id, reason || 'Customer request');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('stats/report')
  async getStats(@Query('startDate') startDate, @Query('endDate') endDate) {
    return this.paymentService.getPaymentStats(new Date(startDate), new Date(endDate));
  }

  @MessagePattern('order_requires_payment')
  async handleOrderRequiresPayment(@Payload() orderData) {
    return this.paymentService.initiatePayment(
      orderData._id,
      orderData.customerId,
      orderData.total,
      'SEPAY'
    );
  }
}

module.exports = { PaymentController };
