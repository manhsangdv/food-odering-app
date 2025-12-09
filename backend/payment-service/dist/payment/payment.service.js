"use strict";

var _dec, _dec2, _dec3, _dec4, _class;
const {
  Injectable
} = require('@nestjs/common');
const {
  ClientProxyFactory,
  Transport
} = require('@nestjs/microservices');
const {
  InjectModel
} = require('@nestjs/mongoose');
const crypto = require('crypto');
const Stripe = require('stripe');
let PaymentService = (_dec = Injectable(), _dec2 = function (target, key) {
  return InjectModel('Payment')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class PaymentService {
  constructor(paymentModel) {
    this.PaymentModel = paymentModel;
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_your_key_here');
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
        queue: process.env.PAYMENT_QUEUE || 'payment_queue',
        queueOptions: {
          durable: false
        }
      }
    });
  }
  async initiatePayment(orderId, customerId, amount, paymentMethod = 'STRIPE') {
    try {
      const payment = new this.PaymentModel({
        orderId,
        customerId,
        amount,
        paymentMethod: paymentMethod || 'STRIPE',
        status: 'PENDING',
        description: `Payment for order ${orderId}`,
        retryCount: 0
      });
      let saved = await payment.save();
      if (paymentMethod === 'STRIPE') {
        // Create Stripe Payment Intent
        const paymentIntent = await this.stripe.paymentIntents.create({
          amount: Math.round(amount * 100),
          // Convert to cents
          currency: 'vnd',
          description: `Order #${orderId}`,
          metadata: {
            paymentId: saved._id.toString(),
            orderId: orderId.toString(),
            customerId: customerId.toString()
          },
          automatic_payment_methods: {
            enabled: true
          }
        });
        saved.paymentIntentId = paymentIntent.id;
        saved.clientSecret = paymentIntent.client_secret;
      } else {
        // Fallback to VNPAY or other methods
        const paymentUrl = this.generatePaymentUrl(saved._id, amount, paymentMethod);
        saved.paymentUrl = paymentUrl;
      }
      saved.redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/callback/${saved._id}`;
      saved = await saved.save();
      return saved;
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw new Error(`Failed to initiate payment: ${error.message}`);
    }
  }
  generatePaymentUrl(paymentId, amount, method) {
    const baseUrl = method === 'VNPAY' ? process.env.VNPAY_GATEWAY_URL || 'https://sandbox.vnpayment.vn/paygate' : process.env.SEPAY_GATEWAY_URL || 'https://sepay.vn';
    const params = new URLSearchParams({
      payment_id: paymentId,
      amount: amount,
      description: `Payment for order`,
      return_url: `${process.env.PAYMENT_CALLBACK_URL}/payments/${paymentId}/callback`,
      timestamp: Date.now()
    });
    return `${baseUrl}?${params.toString()}`;
  }
  async getPaymentById(id) {
    return this.PaymentModel.findById(id).exec();
  }
  async getPaymentByOrderId(orderId) {
    return this.PaymentModel.findOne({
      orderId
    }).exec();
  }
  async handlePaymentCallback(paymentId, callbackData) {
    try {
      const payment = await this.PaymentModel.findById(paymentId).exec();
      if (!payment) {
        throw new Error('Payment not found');
      }
      if (payment.paymentMethod === 'STRIPE') {
        return this.handleStripeCallback(payment, callbackData);
      } else {
        return this.handleVNPayCallback(payment, callbackData);
      }
    } catch (error) {
      console.error('Callback handling error:', error);
      throw error;
    }
  }
  async handleStripeCallback(payment, callbackData) {
    try {
      // Handle Stripe webhook or direct callback
      if (callbackData.type === 'payment_intent.succeeded') {
        const paymentIntent = callbackData.data.object;
        if (paymentIntent.id !== payment.paymentIntentId) {
          throw new Error('Payment Intent ID mismatch');
        }
        payment.status = 'SUCCESS';
        payment.transactionId = paymentIntent.id;
        payment.stripeChargeId = paymentIntent.charges?.data?.[0]?.id;
        payment.paidAt = new Date();
      } else if (callbackData.type === 'payment_intent.payment_failed') {
        const paymentIntent = callbackData.data.object;
        payment.status = 'FAILED';
        payment.errorMessage = paymentIntent.last_payment_error?.message || 'Payment failed';
        payment.failedAt = new Date();
      } else if (callbackData.paymentIntentStatus === 'succeeded') {
        // Direct API callback
        payment.status = 'SUCCESS';
        payment.transactionId = callbackData.paymentIntentId || payment.paymentIntentId;
        payment.paidAt = new Date();
      } else if (callbackData.paymentIntentStatus === 'requires_payment_method') {
        payment.status = 'PENDING';
      } else {
        payment.status = 'FAILED';
        payment.errorMessage = callbackData.errorMessage || 'Payment processing failed';
        payment.failedAt = new Date();
      }
      await payment.save();
      if (payment.status === 'SUCCESS') {
        this.client.emit('payment_confirmed', {
          paymentId: payment._id,
          orderId: payment.orderId,
          customerId: payment.customerId,
          amount: payment.amount,
          transactionId: payment.transactionId,
          paymentMethod: 'STRIPE'
        });
      } else if (payment.status === 'FAILED') {
        this.client.emit('payment_failed', {
          paymentId: payment._id,
          orderId: payment.orderId,
          reason: payment.errorMessage
        });
      }
      return payment;
    } catch (error) {
      console.error('Stripe callback error:', error);
      throw error;
    }
  }
  async handleVNPayCallback(payment, callbackData) {
    const isValid = this.verifyCallbackSignature(callbackData, 'VNPAY');
    if (!isValid) {
      payment.status = 'FAILED';
      payment.errorMessage = 'Invalid callback signature';
      payment.failedAt = new Date();
      await payment.save();
      throw new Error('Invalid callback signature');
    }
    if (callbackData.vnp_ResponseCode === '00') {
      payment.status = 'SUCCESS';
      payment.transactionId = callbackData.vnp_TransactionNo;
      payment.transactionCode = callbackData.vnp_TransactionCode;
      payment.bankCode = callbackData.vnp_BankCode;
      payment.paidAt = new Date();
      await payment.save();
      this.client.emit('payment_confirmed', {
        paymentId: payment._id,
        orderId: payment.orderId,
        customerId: payment.customerId,
        amount: payment.amount,
        transactionId: payment.transactionId
      });
      return payment;
    } else {
      payment.status = 'FAILED';
      payment.errorMessage = callbackData.vnp_Message || 'Payment failed';
      payment.failedAt = new Date();
      await payment.save();
      this.client.emit('payment_failed', {
        paymentId: payment._id,
        orderId: payment.orderId,
        reason: payment.errorMessage
      });
      throw new Error(payment.errorMessage);
    }
  }
  verifyCallbackSignature(callbackData, method) {
    try {
      if (method === 'VNPAY') {
        const vnpSecureHash = callbackData.vnp_SecureHash;
        const secretKey = process.env.VNPAY_SECRET_KEY || 'SHOWCASESECRETKEY12345678';

        // Remove secure hash from params
        const params = {
          ...callbackData
        };
        delete params.vnp_SecureHash;

        // Sort and create hash string
        const sortedKeys = Object.keys(params).sort();
        let hashString = '';
        sortedKeys.forEach(key => {
          hashString += `&${key}=${params[key]}`;
        });
        hashString = hashString.substring(1);

        // Generate HMAC
        const hmac = crypto.createHmac('sha512', secretKey).update(hashString).digest('hex');
        return hmac === vnpSecureHash;
      } else if (method === 'SEPAY') {
        // Sepay signature verification
        const signature = callbackData.signature;
        const secretKey = process.env.SEPAY_SECRET_KEY || '';
        // Implement Sepay verification logic
        return true; // Simplified for now
      }
      return true;
    } catch (error) {
      console.error('Signature verification error:', error);
      return false;
    }
  }
  async retryPayment(id) {
    try {
      const payment = await this.PaymentModel.findById(id).exec();
      if (!payment) {
        throw new Error('Payment not found');
      }
      if (payment.retryCount >= 3) {
        throw new Error('Maximum retry attempts exceeded');
      }
      if (payment.paymentMethod === 'STRIPE') {
        // Create a new payment intent for retry
        const paymentIntent = await this.stripe.paymentIntents.create({
          amount: Math.round(payment.amount * 100),
          currency: 'vnd',
          description: `Retry payment for order #${payment.orderId}`,
          metadata: {
            paymentId: payment._id.toString(),
            orderId: payment.orderId.toString(),
            customerId: payment.customerId.toString(),
            retry: true
          }
        });
        payment.paymentIntentId = paymentIntent.id;
        payment.clientSecret = paymentIntent.client_secret;
        payment.status = 'PENDING';
        payment.retryCount = (payment.retryCount || 0) + 1;
        await payment.save();
        return payment;
      }
      payment.status = 'PENDING';
      payment.retryCount = (payment.retryCount || 0) + 1;
      payment.paymentUrl = this.generatePaymentUrl(id, payment.amount, payment.paymentMethod);
      await payment.save();
      return payment;
    } catch (error) {
      console.error('Retry payment error:', error);
      throw new Error(`Failed to retry payment: ${error.message}`);
    }
  }
  async refundPayment(id, reason) {
    try {
      const payment = await this.PaymentModel.findById(id).exec();
      if (!payment) {
        throw new Error('Payment not found');
      }
      if (payment.status !== 'SUCCESS') {
        throw new Error('Only successful payments can be refunded');
      }
      if (payment.paymentMethod === 'STRIPE') {
        const refund = await this.stripe.refunds.create({
          charge: payment.stripeChargeId,
          reason: reason ? 'requested_by_customer' : 'requested_by_customer',
          metadata: {
            paymentId: payment._id.toString(),
            orderId: payment.orderId.toString(),
            refundReason: reason
          }
        });
        payment.status = 'REFUNDED';
        payment.refundId = refund.id;
        payment.refundReason = reason;
        payment.refundedAt = new Date();
        await payment.save();
        this.client.emit('payment_refunded', {
          paymentId: payment._id,
          orderId: payment.orderId,
          refundId: refund.id,
          reason: reason
        });
        return payment;
      }
      payment.status = 'REFUNDED';
      payment.refundedAt = new Date();
      payment.refundReason = reason;
      await payment.save();
      this.client.emit('payment_refunded', {
        paymentId: payment._id,
        orderId: payment.orderId,
        reason: reason
      });
      return payment;
    } catch (error) {
      console.error('Refund payment error:', error);
      throw new Error(`Failed to refund payment: ${error.message}`);
    }
  }
  async getPaymentStats(startDate, endDate) {
    const payments = await this.PaymentModel.find({
      initiatedAt: {
        $gte: startDate,
        $lte: endDate
      }
    }).exec();
    return {
      totalTransactions: payments.length,
      successfulPayments: payments.filter(p => p.status === 'SUCCESS').length,
      failedPayments: payments.filter(p => p.status === 'FAILED').length,
      refundedPayments: payments.filter(p => p.status === 'REFUNDED').length,
      totalRevenue: payments.filter(p => p.status === 'SUCCESS').reduce((sum, p) => sum + p.amount, 0),
      averageAmount: payments.length > 0 ? payments.reduce((sum, p) => sum + p.amount, 0) / payments.length : 0
    };
  }
}) || _class) || _class) || _class) || _class);
module.exports = {
  PaymentService
};