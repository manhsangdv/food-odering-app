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
let OrderService = (_dec = Injectable(), _dec2 = function (target, key) {
  return InjectModel('Order')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class OrderService {
  constructor(orderModel) {
    this.OrderModel = orderModel;

    // Track scheduled timers for automatic status progression
    this.scheduledProgress = new Map();
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
        queue: process.env.ORDER_QUEUE || 'order_queue',
        queueOptions: {
          durable: false
        }
      }
    });
  }
  async createOrder(createDto) {
    // Validate cart items
    if (!createDto.items || createDto.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Calculate subtotal from cart items
    const subtotal = createDto.items.reduce((sum, item) => {
      const qty = item.quantity || 1;
      const price = item.price || 0;
      if (price < 0 || qty < 0) {
        throw new Error('Invalid price or quantity');
      }
      return sum + price * qty;
    }, 0);

    // Validate delivery address if online payment
    if (createDto.paymentMethod === 'ONLINE' || createDto.paymentMethod === 'STRIPE') {
      const {
        deliveryAddress
      } = createDto;
      if (!deliveryAddress || !deliveryAddress.street || !deliveryAddress.ward || !deliveryAddress.district || !deliveryAddress.city) {
        throw new Error('Complete delivery address is required for online payment');
      }
    }
    const deliveryFee = createDto.deliveryFee || 15000; // Default delivery fee VND
    const total = subtotal + deliveryFee;

    // Group items by restaurant (validate single restaurant per order)
    const order = new this.OrderModel({
      customerId: createDto.customerId,
      restaurantId: createDto.restaurantId,
      items: createDto.items.map(item => ({
        menuItemId: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        notes: item.notes || ''
      })),
      subtotal,
      deliveryFee,
      total,
      paymentMethod: createDto.paymentMethod || 'COD',
      deliveryAddress: createDto.deliveryAddress,
      recipientName: createDto.recipientName || '',
      recipientPhone: createDto.recipientPhone || '',
      customerLocation: createDto.customerLocation,
      notes: createDto.notes || '',
      status: ['ONLINE', 'STRIPE'].includes(createDto.paymentMethod) ? 'PENDING_PAYMENT' : 'CREATED'
    });
    const saved = await order.save();

    // Emit events based on payment method
    if (['ONLINE', 'STRIPE'].includes(createDto.paymentMethod)) {
      this.client.emit('order_requires_payment', {
        ...saved.toObject(),
        paymentMethod: createDto.paymentMethod
      });
    } else {
      this.client.emit('order_created', saved);
    }

    // If order starts in CREATED state (e.g., COD), schedule automatic progression
    if (saved.status === 'CREATED') {
      this.scheduleOrderProgress(saved._id);
    }
    return saved;
  }
  async getOrderById(id) {
    return this.OrderModel.findById(id).exec();
  }

  // Schedule automatic progression for an order through statuses every minute
  scheduleOrderProgress(orderId) {
    // Clear existing timers if any
    this.clearScheduledProgress(orderId);
    const sequence = ['CREATED', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED'];
    const run = async () => {
      const order = await this.OrderModel.findById(orderId).exec();
      if (!order) return;
      if (['COMPLETED', 'CANCELLED'].includes(order.status)) return;
      const currentIndex = sequence.indexOf(order.status);
      if (currentIndex === -1) return; // status not in sequence (e.g., PENDING_PAYMENT)

      const timeouts = [];
      for (let i = currentIndex + 1; i < sequence.length; i++) {
        const delay = (i - currentIndex) * 60 * 1000; // minutes -> ms
        const statusToSet = sequence[i];
        const t = setTimeout(async () => {
          // Double-check order not already terminal
          const latest = await this.OrderModel.findById(orderId).exec();
          if (!latest) return;
          if (['COMPLETED', 'CANCELLED'].includes(latest.status)) return;
          const update = {
            status: statusToSet,
            updatedAt: new Date()
          };
          if (statusToSet === 'CONFIRMED') update.confirmedAt = new Date();
          if (statusToSet === 'PREPARING') update.preparingAt = new Date();
          if (statusToSet === 'READY') update.readyAt = new Date();
          if (statusToSet === 'COMPLETED') update.completedAt = new Date();
          const updated = await this.OrderModel.findByIdAndUpdate(orderId, update, {
            new: true
          }).exec();
          // Emit an event for subscribers
          try {
            this.client.emit('order_status_changed', {
              orderId,
              status: statusToSet
            });
          } catch (_) {}
          // If completed, clear timers
          if (statusToSet === 'COMPLETED') {
            this.clearScheduledProgress(orderId);
          }
        }, delay);
        timeouts.push(t);
      }
      this.scheduledProgress.set(String(orderId), timeouts);
    };

    // Start the progression runner immediately (it will schedule all future steps)
    run().catch(() => {});
  }
  clearScheduledProgress(orderId) {
    const key = String(orderId);
    const arr = this.scheduledProgress.get(key);
    if (arr && Array.isArray(arr)) {
      arr.forEach(t => clearTimeout(t));
    }
    this.scheduledProgress.delete(key);
  }
  async getOrdersByCustomer(customerId) {
    return this.OrderModel.find({
      customerId
    }).sort({
      createdAt: -1
    }).exec();
  }
  async getOrdersByRestaurant(restaurantId, status = null) {
    const query = {
      restaurantId
    };
    if (status) query.status = status;
    return this.OrderModel.find(query).sort({
      createdAt: -1
    }).exec();
  }
  async confirmOrder(orderId) {
    const updated = await this.OrderModel.findByIdAndUpdate(orderId, {
      status: 'CONFIRMED',
      confirmedAt: new Date(),
      updatedAt: new Date()
    }, {
      new: true
    }).exec();

    // Start automatic progression from CONFIRMED
    try {
      this.scheduleOrderProgress(orderId);
    } catch (_) {}
    return updated;
  }
  async startPreparing(orderId) {
    return this.OrderModel.findByIdAndUpdate(orderId, {
      status: 'PREPARING',
      preparingAt: new Date(),
      updatedAt: new Date()
    }, {
      new: true
    }).exec();
  }
  async startDelivery(orderId, distanceKm, etaMinutes) {
    return this.OrderModel.findByIdAndUpdate(orderId, {
      status: 'DELIVERING',
      deliveringAt: new Date(),
      distanceKm,
      etaMinutes,
      updatedAt: new Date()
    }, {
      new: true
    }).exec();
  }
  async completeOrder(orderId) {
    // Clear any scheduled progression
    this.clearScheduledProgress(orderId);
    return this.OrderModel.findByIdAndUpdate(orderId, {
      status: 'COMPLETED',
      completedAt: new Date(),
      updatedAt: new Date()
    }, {
      new: true
    }).exec();
  }
  async cancelOrder(orderId, reason) {
    const order = await this.OrderModel.findById(orderId).exec();
    if (!['CREATED', 'CONFIRMED'].includes(order.status)) {
      throw new Error(`Cannot cancel order with status: ${order.status}`);
    }

    // Clear any scheduled progression timers
    this.clearScheduledProgress(orderId);
    return this.OrderModel.findByIdAndUpdate(orderId, {
      status: 'CANCELLED',
      cancelledAt: new Date(),
      notes: `${order.notes || ''}\nCancellation reason: ${reason}`,
      updatedAt: new Date()
    }, {
      new: true
    }).exec();
  }
  async markOrderAsPaid(orderId, paymentId) {
    const order = await this.OrderModel.findByIdAndUpdate(orderId, {
      status: 'CONFIRMED',
      paymentId,
      confirmedAt: new Date(),
      updatedAt: new Date()
    }, {
      new: true
    }).exec();

    // Emit event to notify restaurant
    this.client.emit('order_paid_confirmed', order);
    // Start progression now that payment confirmed
    try {
      this.scheduleOrderProgress(order._id);
    } catch (_) {}
    return order;
  }
  async handleDeliveryStatusChange(deliveryData) {
    if (deliveryData.status === 'DELIVERING') {
      return this.startDelivery(deliveryData.orderId, deliveryData.distanceKm, deliveryData.etaMinutes);
    } else if (deliveryData.status === 'COMPLETED') {
      return this.completeOrder(deliveryData.orderId);
    }
  }
  async getOrderStats(restaurantId, startDate, endDate) {
    const orders = await this.OrderModel.find({
      restaurantId,
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    }).exec();
    return {
      totalOrders: orders.length,
      completedOrders: orders.filter(o => o.status === 'COMPLETED').length,
      totalRevenue: orders.reduce((sum, o) => sum + (o.status === 'COMPLETED' ? o.total : 0), 0),
      codRevenue: orders.filter(o => o.paymentMethod === 'COD' && o.status === 'COMPLETED').reduce((sum, o) => sum + o.total, 0),
      onlineRevenue: orders.filter(o => o.paymentMethod === 'ONLINE' && o.status === 'COMPLETED').reduce((sum, o) => sum + o.total, 0)
    };
  }
}) || _class) || _class) || _class) || _class);
module.exports = {
  OrderService
};