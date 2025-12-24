const { Injectable } = require('@nestjs/common');
const { ClientProxyFactory, Transport } = require('@nestjs/microservices');
const { InjectModel } = require('@nestjs/mongoose');
const crypto = require('crypto');

@Injectable()
class PaymentService {
  constructor(@InjectModel('Payment') paymentModel) {
    this.PaymentModel = paymentModel;

    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
        queue: process.env.PAYMENT_QUEUE || 'payment_queue',
        queueOptions: { durable: false },
      },
    });

    this.orderClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
        queue: process.env.ORDER_QUEUE || 'order_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async initiatePayment(orderId, customerId, amount, paymentMethod = 'SEPAY') {
    try {
      const existing = await this.PaymentModel.findOne({ orderId, paymentMethod: 'SEPAY' }).exec();
      if (existing) {
        return existing;
      }

      const payment = new this.PaymentModel({
        orderId,
        customerId,
        amount,
        paymentMethod: 'SEPAY',
        status: 'PENDING',
        description: `Payment for order ${orderId}`,
        retryCount: 0
      });

      let saved = await payment.save();

      const transferContent = `PAY ${saved._id.toString()}`;
      saved.transactionCode = transferContent;
      saved.bankName = process.env.SEPAY_BANK_NAME || saved.bankName;
      saved.metadata = {
        ...(saved.metadata || {}),
        sepay: {
          accountNumber: process.env.SEPAY_ACCOUNT_NUMBER,
          bankName: process.env.SEPAY_BANK_NAME,
          bankCode: process.env.SEPAY_BANK_CODE,
          transferContent,
        }
      };

      saved.redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/orders`;
      saved = await saved.save();

      return saved;
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw new Error(`Failed to initiate payment: ${error.message}`);
    }
  }

  generatePaymentUrl(paymentId, amount, method) {
    const baseUrl = method === 'VNPAY' 
      ? process.env.VNPAY_GATEWAY_URL || 'https://sandbox.vnpayment.vn/paygate'
      : process.env.SEPAY_GATEWAY_URL || 'https://sepay.vn';
    
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
    return this.PaymentModel.findOne({ orderId }).exec();
  }

  async handleSepayWebhook(callbackData, authorizationHeader, rawBuffer, sepaySignature) {
    const apiKey = String(process.env.SEPAY_API_KEY || '').trim();
    const receivedAuth = String(authorizationHeader || '').trim();

    // If a webhook secret is set, prefer verifying signature header using raw payload
    try {
      const webhookSecret = String(process.env.SEPAY_WEBHOOK_SECRET || '').trim();
      if (webhookSecret && sepaySignature) {
        const payload = rawBuffer ? rawBuffer : Buffer.from(JSON.stringify(callbackData || {}));
        const expected = crypto.createHmac('sha256', webhookSecret).update(payload).digest('hex');
        const received = String(sepaySignature || '').trim();
        const a = Buffer.from(expected);
        const b = Buffer.from(received);
        if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
          const err = new Error('Invalid signature');
          err.status = 401;
          throw err;
        }
      }
    } catch (sigErr) {
      const err = new Error('Unauthorized');
      err.status = 401;
      throw err;
    }

    const normalize = (v) => String(v || '').trim().toLowerCase();
    const ok = apiKey && (
      normalize(receivedAuth) === normalize(`Apikey ${apiKey}`) ||
      normalize(receivedAuth) === normalize(`ApiKey ${apiKey}`) ||
      normalize(receivedAuth) === normalize(`Bearer ${apiKey}`) ||
      normalize(receivedAuth) === normalize(apiKey)
    );

    if (!ok) {
      const err = new Error('Unauthorized');
      err.status = 401;
      throw err;
    }

    try {
      if (!callbackData || typeof callbackData !== 'object') {
        return { success: true, message: 'No data' };
      }

      if (callbackData.transferType && callbackData.transferType !== 'in') {
        return { success: true, message: 'Ignored non-in transaction' };
      }

      const content = `${callbackData.content || ''} ${callbackData.description || ''}`;
      const match = content.match(/[a-f0-9]{24}/i);
      if (!match) {
        return { success: true, message: 'No paymentId found in content' };
      }

      const paymentId = match[0];
      const payment = await this.PaymentModel.findById(paymentId).exec();
      if (!payment) {
        return { success: true, message: 'Payment not found' };
      }

      if (payment.status === 'SUCCESS') {
        return { success: true, message: 'Already processed' };
      }

      const expectedAmount = Number(payment.amount);
      const receivedAmount = Number(callbackData.transferAmount);
      if (Number.isFinite(receivedAmount) && Number.isFinite(expectedAmount) && receivedAmount !== expectedAmount) {
        payment.status = 'FAILED';
        payment.errorMessage = `Amount mismatch: expected ${expectedAmount}, received ${receivedAmount}`;
        payment.failedAt = new Date();
        await payment.save();
        return { success: true, message: 'Amount mismatch' };
      }

      payment.status = 'SUCCESS';
      payment.transactionId = callbackData.referenceCode || String(callbackData.id || '');
      payment.bankName = callbackData.gateway || payment.bankName;
      payment.paidAt = callbackData.transactionDate ? new Date(callbackData.transactionDate) : new Date();
      await payment.save();

      this.orderClient.emit('payment_confirmed', {
        paymentId: payment._id,
        orderId: payment.orderId,
        customerId: payment.customerId,
        amount: payment.amount,
        transactionId: payment.transactionId,
        paymentMethod: 'SEPAY'
      });

      return { success: true };
    } catch (error) {
      console.error('SePay webhook handling error:', error);
      return { success: true, message: 'Webhook handled with internal error' };
    }
  }

  async handlePaymentCallback(paymentId, callbackData) {
    try {
      const payment = await this.PaymentModel.findById(paymentId).exec();
      
      if (!payment) {
        throw new Error('Payment not found');
      }

      if (payment.paymentMethod === 'SEPAY') {
        return this.handleSepayCallbackByPaymentId(payment, callbackData);
      }

      // Legacy methods kept for backward compatibility
      if (payment.paymentMethod === 'STRIPE') {
        return this.handleStripeCallback(payment, callbackData);
      }
      return this.handleVNPayCallback(payment, callbackData);
    } catch (error) {
      console.error('Callback handling error:', error);
      throw error;
    }
  }

  async handleSepayCallbackByPaymentId(payment, callbackData) {
    // This is a fallback path when you call /api/payments/:id/callback manually.
    // Production SePay webhook should use /api/payments/callback.
    if (!payment || !callbackData || typeof callbackData !== 'object') return payment;

    if (payment.status === 'SUCCESS') return payment;

    if (callbackData.transferType && callbackData.transferType !== 'in') {
      return payment;
    }

    const expectedAmount = Number(payment.amount);
    const receivedAmount = Number(callbackData.transferAmount);
    if (Number.isFinite(receivedAmount) && Number.isFinite(expectedAmount) && receivedAmount !== expectedAmount) {
      payment.status = 'FAILED';
      payment.errorMessage = `Amount mismatch: expected ${expectedAmount}, received ${receivedAmount}`;
      payment.failedAt = new Date();
      await payment.save();
      return payment;
    }

    payment.status = 'SUCCESS';
    payment.transactionId = callbackData.referenceCode || String(callbackData.id || '');
    payment.bankName = callbackData.gateway || payment.bankName;
    payment.paidAt = callbackData.transactionDate ? new Date(callbackData.transactionDate) : new Date();
    await payment.save();

    this.orderClient.emit('payment_confirmed', {
      paymentId: payment._id,
      orderId: payment.orderId,
      customerId: payment.customerId,
      amount: payment.amount,
      transactionId: payment.transactionId,
      paymentMethod: 'SEPAY'
    });

    return payment;
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
        this.orderClient.emit('payment_confirmed', {
          paymentId: payment._id,
          orderId: payment.orderId,
          customerId: payment.customerId,
          amount: payment.amount,
          transactionId: payment.transactionId,
          paymentMethod: 'STRIPE'
        });
      } else if (payment.status === 'FAILED') {
        this.orderClient.emit('payment_failed', {
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

      this.orderClient.emit('payment_failed', {
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
        const params = { ...callbackData };
        delete params.vnp_SecureHash;

        // Sort and create hash string
        const sortedKeys = Object.keys(params).sort();
        let hashString = '';
        sortedKeys.forEach(key => {
          hashString += `&${key}=${params[key]}`;
        });
        hashString = hashString.substring(1);

        // Generate HMAC
        const hmac = crypto
          .createHmac('sha512', secretKey)
          .update(hashString)
          .digest('hex');

        return hmac === vnpSecureHash;
      } else if (method === 'SEPAY') {
        return true;
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

      payment.status = 'PENDING';
      payment.retryCount = (payment.retryCount || 0) + 1;
      const transferContent = `PAY ${payment._id.toString()}`;
      payment.transactionCode = transferContent;
      payment.bankName = process.env.SEPAY_BANK_NAME || payment.bankName;
      payment.metadata = {
        ...(payment.metadata || {}),
        sepay: {
          accountNumber: process.env.SEPAY_ACCOUNT_NUMBER,
          bankName: process.env.SEPAY_BANK_NAME,
          transferContent,
        }
      };
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

      payment.status = 'REFUNDED';
      payment.refundedAt = new Date();
      payment.refundReason = reason;
      await payment.save();

      this.orderClient.emit('payment_refunded', {
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
      initiatedAt: { $gte: startDate, $lte: endDate }
    }).exec();

    return {
      totalTransactions: payments.length,
      successfulPayments: payments.filter(p => p.status === 'SUCCESS').length,
      failedPayments: payments.filter(p => p.status === 'FAILED').length,
      refundedPayments: payments.filter(p => p.status === 'REFUNDED').length,
      totalRevenue: payments.filter(p => p.status === 'SUCCESS').reduce((sum, p) => sum + p.amount, 0),
      averageAmount: payments.length > 0 
        ? payments.reduce((sum, p) => sum + p.amount, 0) / payments.length 
        : 0
    };
  }
}

module.exports = { PaymentService };
