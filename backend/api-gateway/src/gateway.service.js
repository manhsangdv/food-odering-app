const { Injectable } = require('@nestjs/common');
const axios = require('axios');

@Injectable()
class GatewayService {
  constructor() {
    this.services = {
      user: process.env.USER_SERVICE_URL || 'http://user-service:3003',
      order: process.env.ORDER_SERVICE_URL || 'http://order-service:3001',
      restaurant: process.env.RESTAURANT_SERVICE_URL || 'http://restaurant-service:3002',
      delivery: process.env.DELIVERY_SERVICE_URL || 'http://delivery-service:3004',
      payment: process.env.PAYMENT_SERVICE_URL || 'http://payment-service:3005'
    };
  }

  async proxyRequest(service, method, path, data = null, headers = {}) {
    try {
      const url = `${this.services[service]}${path}`;
      const config = {
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      };

      if (data) {
        config.data = data;
      }

      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message
      };
    }
  }

  async register(registerDto) {
    return this.proxyRequest('user', 'POST', '/api/auth/register', registerDto);
  }

  async login(loginDto) {
    return this.proxyRequest('user', 'POST', '/api/auth/login', loginDto);
  }

  async verifyEmail(data) {
    return this.proxyRequest('user', 'POST', '/api/auth/verify-email', data);
  }

  async verifyToken(token) {
    return this.proxyRequest('user', 'POST', '/api/auth/verify-token', null, { Authorization: `Bearer ${token}` });
  }

  // --- HÀM MỚI CHO PROFILE ---
  async getProfileByToken(token) {
    return this.proxyRequest('user', 'GET', '/api/auth/profile', null, { Authorization: `Bearer ${token}` });
  }

  async getProfile(userId) {
    return this.proxyRequest('user', 'GET', `/api/auth/profile/${userId}`);
  }

  async updateProfile(userId, updateDto) {
    return this.proxyRequest('user', 'PATCH', `/api/auth/profile/${userId}`, updateDto);
  }

  async getRestaurants() {
    return this.proxyRequest('restaurant', 'GET', '/api/restaurants');
  }

  async getRestaurantById(id) {
    return this.proxyRequest('restaurant', 'GET', `/api/restaurants/${id}`);
  }

  async searchRestaurants(keyword) {
    return this.proxyRequest('restaurant', 'GET', `/api/restaurants/search/keyword?q=${keyword}`);
  }

  async getRestaurantMenu(restaurantId) {
    return this.proxyRequest('restaurant', 'GET', `/api/restaurants/${restaurantId}/menu`);
  }

  async getAllMenuItems(keyword = '') {
    const q = String(keyword || '').trim();
    const suffix = q ? `?q=${encodeURIComponent(q)}` : '';
    return this.proxyRequest('restaurant', 'GET', `/api/restaurants/menu${suffix}`);
  }

  async addMenuItem(restaurantId, menuItemDto) {
    return this.proxyRequest('restaurant', 'POST', `/api/restaurants/${restaurantId}/menu`, menuItemDto);
  }

  async deleteMenuItem(menuItemId) {
    return this.proxyRequest('restaurant', 'DELETE', `/api/restaurants/menu/${menuItemId}`);
  }

    // Tạo nhà hàng mới qua restaurant-service
  async createRestaurant(restaurantDto) {
    return this.proxyRequest(
      'restaurant',
      'POST',
      '/api/restaurants',
      restaurantDto
    );
  }

  // Dùng cho tab Admin -> Nhà hàng: lấy tất cả nhà hàng
  async getRestaurantsAdmin() {
    // Request restaurant-service asking for admin view (include inactive)
    return this.proxyRequest('restaurant', 'GET', '/api/restaurants?admin=true');
  }

  // Dùng cho Admin toggle trạng thái active của nhà hàng
  async toggleRestaurantStatus(restaurantId, isActive) {
    return this.proxyRequest(
      'restaurant',
      'PATCH',
      `/api/restaurants/${restaurantId}/status`,
      { isActive }
    );
  }

  async createOrder(orderDto) {
    return this.proxyRequest('order', 'POST', '/api/orders', orderDto);
  }

  async getOrder(orderId) {
    return this.proxyRequest('order', 'GET', `/api/orders/${orderId}`);
  }

  async getCustomerOrders(customerId) {
    return this.proxyRequest('order', 'GET', `/api/orders/customer/${customerId}`);
  }

  async confirmOrder(orderId) {
    return this.proxyRequest('order', 'PATCH', `/api/orders/${orderId}/confirm`, {});
  }

  async cancelOrder(orderId, reason) {
    // Check if a delivery exists for this order and whether a driver is already assigned.
    let delivery = null;
    try {
      delivery = await this.getDeliveryByOrder(orderId);
    } catch (e) {
      // If delivery-service returns 404 or there is no delivery, proceed to cancel the order.
      delivery = null;
    }

    if (delivery && delivery.driverId) {
      // There is already a driver assigned — do not allow customer-side cancel
      throw { status: 400, message: 'Cannot cancel order: a driver has already been assigned.' };
    }

    // Proceed to cancel the order in order-service
    const cancelled = await this.proxyRequest('order', 'PATCH', `/api/orders/${orderId}/cancel`, { reason });

    // If a delivery record existed (but no driver), mark it cancelled as well to keep services in sync
    if (delivery) {
      try {
        await this.proxyRequest('delivery', 'PATCH', `/api/deliveries/${delivery._id}/status`, { status: 'CANCELLED' });
      } catch (e) {
        // Non-fatal: order is cancelled; delivery-service may be out-of-sync temporarily.
      }
    }

    return cancelled;
  }

  async initiatePayment(paymentDto) {
    return this.proxyRequest('payment', 'POST', '/api/payments/initiate', paymentDto);
  }

  async getPayment(paymentId) {
    return this.proxyRequest('payment', 'GET', `/api/payments/${paymentId}`);
  }

  async getPaymentByOrderId(orderId) {
    return this.proxyRequest('payment', 'GET', `/api/payments/order/${orderId}`);
  }

  async handlePaymentCallback(paymentId, callbackData) {
    return this.proxyRequest('payment', 'POST', `/api/payments/${paymentId}/callback`, callbackData);
  }

  async handleSepayWebhook(callbackData, authorization) {
    return this.proxyRequest('payment', 'POST', `/api/payments/callback`, callbackData, {
      ...(authorization ? { Authorization: authorization } : {})
    });
  }

  async retryPayment(paymentId) {
    return this.proxyRequest('payment', 'PATCH', `/api/payments/${paymentId}/retry`, {});
  }

  async refundPayment(paymentId, reason) {
    return this.proxyRequest('payment', 'POST', `/api/payments/${paymentId}/refund`, { reason });
  }

  async getDelivery(deliveryId) {
    return this.proxyRequest('delivery', 'GET', `/api/deliveries/${deliveryId}`);
  }

  async getDeliveryByOrder(orderId) {
    return this.proxyRequest('delivery', 'GET', `/api/deliveries/order/${orderId}`);
  }

  async createDelivery(orderData) {
    return this.proxyRequest('delivery', 'POST', '/api/deliveries', orderData);
  }

  async startDelivery(deliveryId, data) {
    return this.proxyRequest('delivery', 'POST', `/api/deliveries/${deliveryId}/start`, data);
  }

  // Driver-related proxies
  async getAvailableDeliveries() {
    return this.proxyRequest('delivery', 'GET', '/api/deliveries/available');
  }

  async getDriverHistory(driverId) {
    return this.proxyRequest('delivery', 'GET', `/api/deliveries/driver/${driverId}/history`);
  }

  async assignDelivery(deliveryId, driverId) {
    return this.proxyRequest('delivery', 'PATCH', `/api/deliveries/${deliveryId}/assign`, { driverId });
  }

  async markArrived(deliveryId) {
    return this.proxyRequest('delivery', 'PATCH', `/api/deliveries/${deliveryId}/arrived`, {});
  }

  async markPicked(deliveryId) {
    return this.proxyRequest('delivery', 'PATCH', `/api/deliveries/${deliveryId}/picked`, {});
  }

  async completeDeliveryRequest(deliveryId) {
    return this.proxyRequest('delivery', 'PATCH', `/api/deliveries/${deliveryId}/complete`, {});
  }
}

module.exports = { GatewayService };