const { Injectable } = require('@nestjs/common');
const { ClientProxyFactory, Transport } = require('@nestjs/microservices');
const { InjectModel } = require('@nestjs/mongoose');

@Injectable()
class OrderService {
  constructor(@InjectModel('Order') orderModel) {
    this.OrderModel = orderModel;

    // Track scheduled timers for automatic status progression
    this.scheduledProgress = new Map();

    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
        queue: process.env.ORDER_QUEUE || 'order_queue',
        queueOptions: { durable: false },
      },
    });

    this.paymentClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
        queue: process.env.PAYMENT_QUEUE || 'payment_queue',
        queueOptions: { durable: false },
      },
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

    const normalizedPaymentMethod = createDto.paymentMethod === 'ONLINE' ? 'SEPAY' : (createDto.paymentMethod || 'COD');

    const rawDeliveryAddress = createDto.deliveryAddress || {};
    const normalizedDeliveryAddress = {
      ...rawDeliveryAddress,
      city: rawDeliveryAddress.city || rawDeliveryAddress.province
    };

    // Validate delivery address if online payment
    if (normalizedPaymentMethod === 'SEPAY') {
      if (!normalizedDeliveryAddress || !normalizedDeliveryAddress.street || !normalizedDeliveryAddress.ward || 
          !normalizedDeliveryAddress.city) {
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
      paymentMethod: normalizedPaymentMethod,
      deliveryAddress: normalizedDeliveryAddress,
      recipientName: createDto.recipientName || '',
      recipientPhone: createDto.recipientPhone || '',
      customerLocation: createDto.customerLocation,
      notes: createDto.notes || '',
      status: normalizedPaymentMethod === 'SEPAY' ? 'PENDING_PAYMENT' : 'CREATED'
    });

    const saved = await order.save();

    // Emit events based on payment method
    if (normalizedPaymentMethod === 'SEPAY') {
      this.paymentClient.emit('order_requires_payment', {
        ...saved.toObject(),
        paymentMethod: normalizedPaymentMethod
      });
    } else {
      this.client.emit('order_created', saved);
    }

    // Previously this service scheduled automatic progression for CREATED orders.
    // To keep order status in sync with driver actions, scheduling is disabled
    // and order status will be updated by delivery events instead.

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

          const update = { status: statusToSet, updatedAt: new Date() };
          if (statusToSet === 'CONFIRMED') update.confirmedAt = new Date();
          if (statusToSet === 'PREPARING') update.preparingAt = new Date();
          if (statusToSet === 'READY') update.readyAt = new Date();
          if (statusToSet === 'COMPLETED') update.completedAt = new Date();

          const updated = await this.OrderModel.findByIdAndUpdate(orderId, update, { new: true }).exec();
          // Emit an event for subscribers
          try { this.client.emit('order_status_changed', { orderId, status: statusToSet }); } catch (_) {}
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
    return this.OrderModel.find({ customerId }).sort({ createdAt: -1 }).exec();
  }

  async getOrdersByRestaurant(restaurantId, status = null) {
    const query = { restaurantId };
    if (status) query.status = status;
    return this.OrderModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async confirmOrder(orderId) {
    const updated = await this.OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: 'CONFIRMED',
        confirmedAt: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    ).exec();
    // Do not auto-schedule progression; order status changes will follow driver events.
    return updated;
  }

  async startPreparing(orderId) {
    return this.OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: 'PREPARING',
        preparingAt: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    ).exec();
  }

  async startDelivery(orderId, distanceKm, etaMinutes) {
    return this.OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: 'DELIVERING',
        deliveringAt: new Date(),
        distanceKm,
        etaMinutes,
        updatedAt: new Date()
      },
      { new: true }
    ).exec();
  }

  async startReady(orderId, distanceKm, etaMinutes) {
    return this.OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: 'READY',
        readyAt: new Date(),
        distanceKm,
        etaMinutes,
        updatedAt: new Date()
      },
      { new: true }
    ).exec();
  }
  async completeOrder(orderId) {
    // Clear any scheduled progression
    this.clearScheduledProgress(orderId);
    return this.OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: 'COMPLETED',
        completedAt: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    ).exec();
  }

  async cancelOrder(orderId, reason) {
    const order = await this.OrderModel.findById(orderId).exec();
    
    if (!['CREATED', 'CONFIRMED', 'PENDING_PAYMENT'].includes(order.status)) {
      throw new Error(`Cannot cancel order with status: ${order.status}`);
    }

    // Clear any scheduled progression timers
    this.clearScheduledProgress(orderId);

    return this.OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        notes: `${order.notes || ''}\nCancellation reason: ${reason}`,
        updatedAt: new Date()
      },
      { new: true }
    ).exec();
  }

  async markOrderAsPaid(orderId, paymentId) {
    const order = await this.OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: 'CONFIRMED',
        paymentId,
        confirmedAt: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    ).exec();

    // Emit event to notify restaurant
    this.client.emit('order_paid_confirmed', order);
    // Do not auto-schedule progression; wait for delivery events to update statuses.
    return order;
  }

  async handleDeliveryStatusChange(deliveryData) {
    // Map delivery status changes to order status updates so customer sees real-time status
    if (!deliveryData || !deliveryData.orderId) return null;
    const { orderId, status, distanceKm, etaMinutes } = deliveryData;

    // Cancel any scheduled progression for this order — driver actions take precedence
    try { this.clearScheduledProgress(orderId); } catch (_) {}

    switch (status) {
      case 'ASSIGNED':
        // Driver accepted the delivery -> mark order as CONFIRMED for customer
        return this.confirmOrder(orderId);
      case 'AT_RESTAURANT':
        // Driver arrived at restaurant -> mark order as PREPARING (or leave as CONFIRMED)
        return this.startPreparing(orderId);
      case 'PICKED_UP':
        return this.startReady(orderId);
      case 'DELIVERING':
        // Driver picked up -> set order to DELIVERING and update ETA if provided
        return this.startDelivery(orderId, distanceKm || 0, etaMinutes || 0);
      case 'COMPLETED':
        return this.completeOrder(orderId);
      case 'CANCELLED':
        // Mark order cancelled if delivery cancelled
        return this.OrderModel.findByIdAndUpdate(
          orderId,
          { status: 'CANCELLED', cancelledAt: new Date(), updatedAt: new Date() },
          { new: true }
        ).exec();
      default:
        return null;
    }
  }

  async getOrderStats(restaurantId, startDate, endDate) {
    const orders = await this.OrderModel.find({
      restaurantId,
      createdAt: { $gte: startDate, $lte: endDate }
    }).exec();

    return {
      totalOrders: orders.length,
      completedOrders: orders.filter(o => o.status === 'COMPLETED').length,
      totalRevenue: orders.reduce((sum, o) => sum + (o.status === 'COMPLETED' ? o.total : 0), 0),
      codRevenue: orders.filter(o => o.paymentMethod === 'COD' && o.status === 'COMPLETED').reduce((sum, o) => sum + o.total, 0),
      onlineRevenue: orders.filter(o => o.paymentMethod === 'ONLINE' && o.status === 'COMPLETED').reduce((sum, o) => sum + o.total, 0)
    };
  }
}

module.exports = { OrderService };
