const { Controller, Get, Param, Patch, Post, Body, Inject, HttpException, HttpStatus } = require('@nestjs/common');
const { MessagePattern, Payload, Ctx } = require('@nestjs/microservices');
const { DeliveryService } = require('./delivery.service');

@Controller('api/deliveries')
class DeliveryController {
  constructor(@Inject(DeliveryService) deliveryService) {
    this.deliveryService = deliveryService;
  }

  @MessagePattern('order_paid')
  async handleOrderPaid(@Payload() data) {
    try {
      return await this.deliveryService.createDelivery(data);
    } catch (error) {
      console.error('Error creating delivery:', error);
    }
  }

  // Also create delivery when an order is created for COD flows
  @MessagePattern('order_created')
  async handleOrderCreated(@Payload() data) {
    try {
      // For COD (or non-online) orders, create a delivery so drivers can pick up
      return await this.deliveryService.createDelivery(data);
    } catch (error) {
      console.error('Error creating delivery from order_created:', error);
    }
  }

  // Drivers: list available deliveries (no driver assigned, newly created/confirmed)
  @Get('available')
  async getAvailable() {
    return this.deliveryService.getAvailableDeliveries();
  }

  // Allow creating delivery via HTTP (fallback for when events are missed)
  @Post()
  async createDeliveryHttp(@Body() orderData) {
    try {
      return await this.deliveryService.createDelivery(orderData);
    } catch (error) {
      console.error('Error creating delivery via HTTP:', error);
      throw new HttpException('Failed to create delivery', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Drivers: list own delivery history (by driverId)
  @Get('driver/:driverId/history')
  async getDriverHistory(@Param('driverId') driverId) {
    return this.deliveryService.getDeliveriesByDriver(driverId);
  }

  @Get(':id')
  async getDelivery(@Param('id') id) {
    const delivery = await this.deliveryService.getDeliveryById(id);
    if (!delivery) {
      throw new HttpException('Delivery not found', HttpStatus.NOT_FOUND);
    }
    return delivery;
  }

  // Driver accepts/assigns a delivery
  @Patch(':id/assign')
  async assignDriver(@Param('id') id, @Body() body) {
    const { driverId } = body;
    if (!driverId) throw new HttpException('driverId required', HttpStatus.BAD_REQUEST);
    return this.deliveryService.assignDriver(id, driverId);
  }

  // Driver marks arrived at restaurant
  @Patch(':id/arrived')
  async markArrived(@Param('id') id) {
    return this.deliveryService.markArrived(id);
  }

  // Driver marks picked up
  @Patch(':id/picked')
  async markPicked(@Param('id') id) {
    return this.deliveryService.markPicked(id);
  }

  // Driver completes delivery
  @Patch(':id/complete')
  async complete(@Param('id') id) {
    return this.deliveryService.completeDelivery(id);
  }

  @Get('order/:orderId')
  async getByOrder(@Param('orderId') orderId) {
    const delivery = await this.deliveryService.getDeliveryByOrderId(orderId);
    if (!delivery) {
      throw new HttpException('Delivery not found', HttpStatus.NOT_FOUND);
    }
    return delivery;
  }

  @Post(':id/start')
  async startDelivery(@Param('id') id, @Body() body) {
    const { restaurantLat, restaurantLng, customerLat, customerLng } = body;
    if (!restaurantLat || !restaurantLng || !customerLat || !customerLng) {
      throw new HttpException('Missing location coordinates', HttpStatus.BAD_REQUEST);
    }
    return this.deliveryService.startDelivery(id, restaurantLat, restaurantLng, customerLat, customerLng);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id, @Body() body) {
    const { status } = body;
    if (!status) {
      throw new HttpException('Status is required', HttpStatus.BAD_REQUEST);
    }
    return this.deliveryService.updateStatus(id, status);
  }

  @Get('restaurant/:restaurantId/active')
  async getRestaurantDeliveries(@Param('restaurantId') restaurantId) {
    return this.deliveryService.getDeliveriesByRestaurant(restaurantId, 'DELIVERING');
  }
}

module.exports = { DeliveryController };
