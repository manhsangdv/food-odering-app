const { Controller, Post, Get, Param, Body, Patch, HttpException, HttpStatus, Inject } = require('@nestjs/common');
const { MessagePattern, Payload } = require('@nestjs/microservices');
const { OrderService } = require('./order.service');

@Controller('api/orders')
class OrderController {
  constructor(@Inject(OrderService) orderService) {
    this.orderService = orderService;
  }

  @Post()
  async createOrder(@Body() createDto) {
    try {
      if (!createDto.customerId || !createDto.restaurantId || !createDto.items || createDto.items.length === 0) {
        throw new HttpException('Missing required fields: customerId, restaurantId, items', HttpStatus.BAD_REQUEST);
      }

      // Validate items structure
      createDto.items.forEach((item, idx) => {
        if (!item.menuItemId || !item.name || item.price === undefined || !item.quantity) {
          throw new HttpException(`Invalid item at index ${idx}: missing menuItemId, name, price, or quantity`, HttpStatus.BAD_REQUEST);
        }
      });

      return await this.orderService.createOrder(createDto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to create order', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getOrder(@Param('id') id) {
    const order = await this.orderService.getOrderById(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  @Get('customer/:customerId')
  async getCustomerOrders(@Param('customerId') customerId) {
    return this.orderService.getOrdersByCustomer(customerId);
  }

  @Get('restaurant/:restaurantId')
  async getRestaurantOrders(@Param('restaurantId') restaurantId) {
    return this.orderService.getOrdersByRestaurant(restaurantId);
  }

  @Patch(':id/confirm')
  async confirmOrder(@Param('id') id) {
    return this.orderService.confirmOrder(id);
  }

  @Patch(':id/preparing')
  async startPreparing(@Param('id') id) {
    return this.orderService.startPreparing(id);
  }

  @Patch(':id/ready')
  async markReady(@Param('id') id) {
    return this.orderService.startReady(id);
  }

  @Patch(':id/delivering')
  async startDelivery(@Param('id') id, @Body() body) {
    const { distanceKm, etaMinutes } = body;
    if (distanceKm === undefined || etaMinutes === undefined) {
      throw new HttpException('Missing distance or ETA', HttpStatus.BAD_REQUEST);
    }
    return this.orderService.startDelivery(id, distanceKm, etaMinutes);
  }

  @Patch(':id/complete')
  async completeOrder(@Param('id') id) {
    return this.orderService.completeOrder(id);
  }

  @Patch(':id/cancel')
  async cancelOrder(@Param('id') id, @Body() body) {
    const { reason } = body;
    try {
      return await this.orderService.cancelOrder(id, reason || 'No reason provided');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @MessagePattern('payment_confirmed')
  async handlePaymentConfirmed(@Payload() data) {
    return this.orderService.markOrderAsPaid(data.orderId, data.paymentId);
  }

  @MessagePattern('delivery_status_changed')
  async handleDeliveryStatusChange(@Payload() data) {
    return this.orderService.handleDeliveryStatusChange(data);
  }

  @Get('stats/restaurant/:restaurantId')
  async getRestaurantStats(@Param('restaurantId') restaurantId, @Body() body) {
    const { startDate, endDate } = body;
    return this.orderService.getOrderStats(restaurantId, new Date(startDate), new Date(endDate));
  }
}

module.exports = { OrderController };
