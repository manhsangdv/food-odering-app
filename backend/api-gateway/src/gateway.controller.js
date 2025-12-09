const { Controller, Get, Post, Patch, Body, Param, Headers, HttpException, HttpStatus, Inject, Query } = require('@nestjs/common');
const { GatewayService } = require('./gateway.service');

@Controller('api')
class GatewayController {
  constructor(@Inject(GatewayService) gatewayService) {
    this.gatewayService = gatewayService;
  }

  // ==================== AUTH ENDPOINTS ====================
  @Post('auth/register')
  async register(@Body() registerDto) {
    try {
      return await this.gatewayService.register(registerDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Post('auth/login')
  async login(@Body() loginDto) {
    try {
      return await this.gatewayService.login(loginDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('auth/verify-email')
  async verifyEmail(@Body() body) {
    try {
      return await this.gatewayService.verifyEmail(body);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Post('auth/verify-token')
  async verifyToken(@Headers('authorization') authHeader) {
    // SỬA: Dùng cách viết an toàn (&&) thay vì (?.) để tránh lỗi format
    const token = authHeader && authHeader.replace('Bearer ', '');
    try {
      return await this.gatewayService.verifyToken(token);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  // 👇 ROUTE MỚI CHO PROFILE (Đặt TRƯỚC route :id) 👇
  @Get('auth/profile')
  async getProfileByToken(@Headers('authorization') authHeader) {
    const token = authHeader && authHeader.replace('Bearer ', '');
    if (!token) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }
    try {
      return await this.gatewayService.getProfileByToken(token);
    } catch (error) {
      throw new HttpException(error.message || 'Invalid Token', error.status || HttpStatus.UNAUTHORIZED);
    }
  }
  // 👆 HẾT ROUTE MỚI 👆

  @Get('auth/profile/:id')
  async getProfile(@Param('id') id) {
    try {
      return await this.gatewayService.getProfile(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  @Patch('auth/profile/:id')
  async updateProfile(@Param('id') id, @Body() updateDto) {
    try {
      return await this.gatewayService.updateProfile(id, updateDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  // ==================== RESTAURANT ENDPOINTS ====================
  @Get('restaurants')
  async getRestaurants() {
    try {
      return await this.gatewayService.getRestaurants();
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('restaurants/:id')
  async getRestaurantById(@Param('id') id) {
    try {
      return await this.gatewayService.getRestaurantById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  @Get('restaurants/search')
  async searchRestaurants(@Query('q') keyword) {
    try {
      return await this.gatewayService.searchRestaurants(keyword);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('restaurants/:id/menu')
  async getRestaurantMenu(@Param('id') id) {
    try {
      return await this.gatewayService.getRestaurantMenu(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  @Post('restaurants/:restaurantId/menu')
  async addMenuItem(@Param('restaurantId') restaurantId, @Body() menuItemDto) {
    try {
      return await this.gatewayService.addMenuItem(restaurantId, menuItemDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

    @Post('restaurants')
  async createRestaurant(@Body() restaurantDto) {
    try {
      return await this.gatewayService.createRestaurant(restaurantDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }

    // ==================== ADMIN - RESTAURANTS ====================
  @Get('admin/restaurants')
  async getRestaurantsAdmin() {
    try {
      return await this.gatewayService.getRestaurantsAdmin();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch('admin/restaurants/:id')
  async toggleRestaurantStatus(@Param('id') id, @Body() body) {
    // Frontend đang gửi { active: !currentStatus }
    const { active } = body;
    if (typeof active !== 'boolean') {
      throw new HttpException(
        'active field must be boolean',
        HttpStatus.BAD_REQUEST
      );
    }
    try {
      return await this.gatewayService.toggleRestaurantStatus(id, active);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }

  // ==================== ORDER ENDPOINTS ====================
  @Post('orders')
  async createOrder(@Body() orderDto) {
    try {
      const created = await this.gatewayService.createOrder(orderDto);
      // If order starts in CREATED (e.g., COD), try to create a delivery via delivery-service HTTP
      try {
        if (created && created.status === 'CREATED') {
          // best-effort: notify delivery service so drivers can see it immediately
          await this.gatewayService.createDelivery(created);
        }
      } catch (e) {
        // don't fail order creation if delivery creation fails
        console.warn('Failed to create delivery for order (fallback):', e.message || e);
      }
      return created;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  // New: get orders for the authenticated customer (uses token)
  // NOTE: placed before the ':id' route to avoid accidental route matching of the literal 'customer' value.
  @Get('orders/customer')
  async getCustomerOrdersByToken(@Headers('authorization') authHeader) {
    const token = authHeader && authHeader.replace('Bearer ', '');
    if (!token) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }
    try {
      const profile = await this.gatewayService.getProfileByToken(token);
      const customerId = profile && (profile._id || profile.id);
      if (!customerId) throw new HttpException('Invalid token/profile', HttpStatus.UNAUTHORIZED);
      return await this.gatewayService.getCustomerOrders(customerId);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to fetch customer orders', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id) {
    try {
      return await this.gatewayService.getOrder(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  @Get('customers/:customerId/orders')
  async getCustomerOrders(@Param('customerId') customerId) {
    try {
      return await this.gatewayService.getCustomerOrders(customerId);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  @Patch('orders/:id/confirm')
  async confirmOrder(@Param('id') id) {
    try {
      return await this.gatewayService.confirmOrder(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  // New: get orders for the authenticated customer (uses token)
  @Get('orders/customer')
  async getCustomerOrdersByToken(@Headers('authorization') authHeader) {
    const token = authHeader && authHeader.replace('Bearer ', '');
    if (!token) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }
    try {
      const profile = await this.gatewayService.getProfileByToken(token);
      const customerId = profile && (profile._id || profile.id);
      if (!customerId) throw new HttpException('Invalid token/profile', HttpStatus.UNAUTHORIZED);
      return await this.gatewayService.getCustomerOrders(customerId);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to fetch customer orders', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('orders/:id/cancel')
  async cancelOrder(@Param('id') id, @Body() body) {
    try {
      return await this.gatewayService.cancelOrder(id, body.reason);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  // ==================== PAYMENT ENDPOINTS ====================
  @Post('payments/initiate')
  async initiatePayment(@Body() paymentDto) {
    try {
      return await this.gatewayService.initiatePayment(paymentDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Get('payments/:id')
  async getPayment(@Param('id') id) {
    try {
      return await this.gatewayService.getPayment(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  @Post('payments/:id/callback')
  async handlePaymentCallback(@Param('id') id, @Body() callbackData) {
    try {
      return await this.gatewayService.handlePaymentCallback(id, callbackData);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Post('payments/:id/retry')
  async retryPayment(@Param('id') id) {
    try {
      return await this.gatewayService.retryPayment(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Post('payments/:id/refund')
  async refundPayment(@Param('id') id, @Body() body) {
    try {
      return await this.gatewayService.refundPayment(id, body.reason);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  // ==================== DELIVERY ENDPOINTS ====================
  @Get('deliveries/:id')
  async getDelivery(@Param('id') id) {
    try {
      return await this.gatewayService.getDelivery(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  @Get('deliveries/order/:orderId')
  async getDeliveryByOrder(@Param('orderId') orderId) {
    try {
      return await this.gatewayService.getDeliveryByOrder(orderId);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  // Driver: list available deliveries
  @Get('deliveries/available')
  async getAvailableDeliveries() {
    try {
      return await this.gatewayService.getAvailableDeliveries();
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Driver: get own history by token -> resolve profile then forward
  @Get('deliveries/driver/history')
  async getDriverHistoryByToken(@Headers('authorization') authHeader) {
    const token = authHeader && authHeader.replace('Bearer ', '');
    if (!token) throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    try {
      const profile = await this.gatewayService.getProfileByToken(token);
      const driverId = profile && (profile._id || profile.id);
      if (!driverId || profile.userType !== 'DRIVER') throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      return await this.gatewayService.getDriverHistory(driverId);
    } catch (error) {
      throw new HttpException(error.message || 'Failed', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  // Driver actions (token-based): accept/arrive/pick/complete
  @Patch('deliveries/:id/accept')
  async acceptDelivery(@Param('id') id, @Headers('authorization') authHeader) {
    const token = authHeader && authHeader.replace('Bearer ', '');
    if (!token) throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    try {
      const profile = await this.gatewayService.getProfileByToken(token);
      const driverId = profile && (profile._id || profile.id);
      if (!driverId || profile.userType !== 'DRIVER') throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      return await this.gatewayService.assignDelivery(id, driverId);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to accept', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('deliveries/:id/arrived')
  async arrivedDelivery(@Param('id') id, @Headers('authorization') authHeader) {
    const token = authHeader && authHeader.replace('Bearer ', '');
    if (!token) throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    try {
      const profile = await this.gatewayService.getProfileByToken(token);
      if (!profile || profile.userType !== 'DRIVER') throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      return await this.gatewayService.markArrived(id);
    } catch (error) {
      throw new HttpException(error.message || 'Failed', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('deliveries/:id/picked')
  async pickedDelivery(@Param('id') id, @Headers('authorization') authHeader) {
    const token = authHeader && authHeader.replace('Bearer ', '');
    if (!token) throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    try {
      const profile = await this.gatewayService.getProfileByToken(token);
      if (!profile || profile.userType !== 'DRIVER') throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      return await this.gatewayService.markPicked(id);
    } catch (error) {
      throw new HttpException(error.message || 'Failed', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('deliveries/:id/complete')
  async completeDelivery(@Param('id') id, @Headers('authorization') authHeader) {
    const token = authHeader && authHeader.replace('Bearer ', '');
    if (!token) throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    try {
      const profile = await this.gatewayService.getProfileByToken(token);
      if (!profile || profile.userType !== 'DRIVER') throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      return await this.gatewayService.completeDeliveryRequest(id);
    } catch (error) {
      throw new HttpException(error.message || 'Failed', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Post('deliveries/:id/start')
  async startDelivery(@Param('id') id, @Body() data) {
    try {
      return await this.gatewayService.startDelivery(id, data);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }
}

module.exports = { GatewayController };