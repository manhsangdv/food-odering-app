const { Injectable } = require('@nestjs/common');
const { InjectModel } = require('@nestjs/mongoose');
const { ClientProxyFactory, Transport } = require('@nestjs/microservices');
const axios = require('axios');

@Injectable()
class DeliveryService {
  constructor(@InjectModel('Delivery') deliveryModel) {
    this.DeliveryModel = deliveryModel;
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
        queue: process.env.DELIVERY_QUEUE || 'delivery_queue',
        queueOptions: { durable: false },
      },
    });
    this.orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://order-service:3001';
  }

  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  calculateETA(distanceKm, speedMinutesPerKm = 5) {
    return Math.ceil(distanceKm * speedMinutesPerKm);
  }

  async createDelivery(orderData) {
    // Avoid creating duplicate delivery for same order
    const existing = await this.getDeliveryByOrderId(orderData._id);
    if (existing) return existing;

    // Respect provided order status when available (e.g., CREATED for COD flows)
    const status = orderData.status && ['CREATED', 'CONFIRMED'].includes(orderData.status) ? orderData.status : 'CONFIRMED';

    const delivery = new this.DeliveryModel({
      orderId: orderData._id,
      restaurantId: orderData.restaurantId,
      customerId: orderData.customerId,
      restaurantLocation: orderData.restaurantLocation,
      customerLocation: orderData.customerLocation,
      status
    });

    const saved = await delivery.save();
    // Emit event so gateway/other services can react
    try { this.client.emit('delivery_created', saved); } catch (_) {}
    // Also inform API gateway for websocket broadcast (best-effort)
    try {
      const gateway = process.env.API_GATEWAY_URL || process.env.GATEWAY_URL || 'http://api-gateway:3000';
      await axios.post(`${gateway}/api/internal/events`, { type: 'delivery_created', payload: { deliveryId: saved._id, orderId: saved.orderId, status: saved.status } });
    } catch (e) {}
    return saved;
  }

  async getAvailableDeliveries() {
    return this.DeliveryModel.find({ status: { $in: ['CONFIRMED', 'CREATED'] }, driverId: { $exists: false } }).sort({ createdAt: -1 }).exec();
  }

  async getDeliveriesByDriver(driverId) {
    return this.DeliveryModel.find({ driverId }).sort({ createdAt: -1 }).exec();
  }

  async assignDriver(id, driverId) {
    // Atomic assign: only assign if no driverId yet (prevent race)
    const updated = await this.DeliveryModel.findOneAndUpdate(
      { _id: id, driverId: { $exists: false } },
      { $set: { driverId, status: 'ASSIGNED', assignedAt: new Date(), updatedAt: new Date() } },
      { new: true }
    ).exec();

    if (!updated) {
      throw new Error('Delivery already assigned or not found');
    }

    // Emit assignment event
    try { this.client.emit('delivery_status_changed', { deliveryId: updated._id, orderId: updated.orderId, driverId, status: updated.status }); } catch (_) {}
    try {
      const gateway = process.env.API_GATEWAY_URL || process.env.GATEWAY_URL || 'http://api-gateway:3000';
      await axios.post(`${gateway}/api/internal/events`, { type: 'delivery_status_changed', payload: { deliveryId: updated._id, orderId: updated.orderId, driverId, status: updated.status } });
    } catch (e) {}
    // Best-effort: update order service via HTTP so customer sees status immediately
    try {
      await axios.patch(`${this.orderServiceUrl}/api/orders/${updated.orderId}/confirm`);
    } catch (e) {
      // ignore network errors — RMQ may handle it
    }
    return updated;
  }

  async markArrived(id) {
    const updated = await this.DeliveryModel.findByIdAndUpdate(
      id,
      { status: 'AT_RESTAURANT', arrivedAt: new Date(), updatedAt: new Date() },
      { new: true }
    ).exec();
    this.client.emit('delivery_status_changed', { deliveryId: updated._id, orderId: updated.orderId, status: updated.status });
    try {
      const gateway = process.env.API_GATEWAY_URL || process.env.GATEWAY_URL || 'http://api-gateway:3000';
      await axios.post(`${gateway}/api/internal/events`, { type: 'delivery_status_changed', payload: { deliveryId: updated._id, orderId: updated.orderId, status: updated.status } });
    } catch (e) {}
    // Best-effort HTTP update to Order service
    try {
      await axios.patch(`${this.orderServiceUrl}/api/orders/${updated.orderId}/preparing`);
    } catch (e) {}
    return updated;
  }

  async markPicked(id) {
    const updated = await this.DeliveryModel.findByIdAndUpdate(
      id,
      { status: 'PICKED_UP', pickedAt: new Date(), startedAt: new Date(), updatedAt: new Date() },
      { new: true }
    ).exec();
    this.client.emit('delivery_status_changed', { deliveryId: updated._id, orderId: updated.orderId, status: 'PICKED_UP' });
    try {
      const gateway = process.env.API_GATEWAY_URL || process.env.GATEWAY_URL || 'http://api-gateway:3000';
      await axios.post(`${gateway}/api/internal/events`, { type: 'delivery_status_changed', payload: { deliveryId: updated._id, orderId: updated.orderId, status: 'PICKED_UP' } });
    } catch (e) {}
    // Best-effort HTTP update to Order service: mark as READY for customer view
    try {
      await axios.patch(`${this.orderServiceUrl}/api/orders/${updated.orderId}/ready`);
    } catch (e) {}
    return updated;
  }

  async completeDelivery(id) {
    const updated = await this.DeliveryModel.findByIdAndUpdate(
      id,
      { status: 'COMPLETED', completedAt: new Date(), updatedAt: new Date() },
      { new: true }
    ).exec();
    this.client.emit('delivery_status_changed', { deliveryId: updated._id, orderId: updated.orderId, status: 'COMPLETED' });
    try {
      const gateway = process.env.API_GATEWAY_URL || process.env.GATEWAY_URL || 'http://api-gateway:3000';
      await axios.post(`${gateway}/api/internal/events`, { type: 'delivery_status_changed', payload: { deliveryId: updated._id, orderId: updated.orderId, status: 'COMPLETED' } });
    } catch (e) {}
    try {
      await axios.patch(`${this.orderServiceUrl}/api/orders/${updated.orderId}/complete`);
    } catch (e) {}
    return updated;
  }

  async getDeliveryById(id) {
    return this.DeliveryModel.findById(id).exec();
  }

  async getDeliveryByOrderId(orderId) {
    return this.DeliveryModel.findOne({ orderId }).exec();
  }

  async startDelivery(id, restaurantLat, restaurantLng, customerLat, customerLng) {
    const distanceKm = this.calculateDistance(restaurantLat, restaurantLng, customerLat, customerLng);
    const etaMinutes = this.calculateETA(distanceKm);
    
    const updated = await this.DeliveryModel.findByIdAndUpdate(
      id,
      {
        status: 'DELIVERING',
        distanceKm,
        etaMinutes,
        startedAt: new Date()
      },
      { new: true }
    ).exec();

    // Emit event to notify order service
    this.client.emit('delivery_started', {
      deliveryId: updated._id,
      orderId: updated.orderId,
      distanceKm,
      etaMinutes
    });
    try {
      const gateway = process.env.API_GATEWAY_URL || process.env.GATEWAY_URL || 'http://api-gateway:3000';
      await axios.post(`${gateway}/api/internal/events`, { type: 'delivery_started', payload: { deliveryId: updated._id, orderId: updated.orderId, distanceKm, etaMinutes } });
    } catch (e) {}

    return updated;
  }

  async updateStatus(id, status) {
    const data = { status, updatedAt: new Date() };
    if (status === 'COMPLETED') {
      data.completedAt = new Date();
    }
    
    const updated = await this.DeliveryModel.findByIdAndUpdate(id, data, { new: true }).exec();
    
    // Emit status change event
    this.client.emit('delivery_status_changed', {
      deliveryId: updated._id,
      orderId: updated.orderId,
      status: updated.status
    });

    // Also best-effort HTTP update to keep order status in sync
    try {
      const s = updated.status;
      if (s === 'ASSIGNED') {
        await axios.patch(`${this.orderServiceUrl}/api/orders/${updated.orderId}/confirm`);
      } else if (s === 'AT_RESTAURANT') {
        await axios.patch(`${this.orderServiceUrl}/api/orders/${updated.orderId}/preparing`);
      } else if (s === 'PICKED_UP') {
        await axios.patch(`${this.orderServiceUrl}/api/orders/${updated.orderId}/ready`);
      } else if (s === 'DELIVERING') {
        await axios.patch(`${this.orderServiceUrl}/api/orders/${updated.orderId}/delivering`, { distanceKm: updated.distanceKm || 0, etaMinutes: updated.etaMinutes || 0 });
      } else if (s === 'COMPLETED') {
        await axios.patch(`${this.orderServiceUrl}/api/orders/${updated.orderId}/complete`);
      } else if (s === 'CANCELLED') {
        await axios.patch(`${this.orderServiceUrl}/api/orders/${updated.orderId}/cancel`, { reason: 'Delivery cancelled' });
      }
    } catch (e) {
      // ignore
    }

    return updated;
  }

  async getDeliveriesByRestaurant(restaurantId, status = null) {
    const query = { restaurantId };
    if (status) query.status = status;
    return this.DeliveryModel.find(query).sort({ createdAt: -1 }).exec();
  }
}

module.exports = { DeliveryService };
