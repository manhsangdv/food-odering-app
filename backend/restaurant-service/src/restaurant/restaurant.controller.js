// @ts-nocheck

const { Controller, Get, Post, Patch, Delete, Param, Body, Query, HttpException, HttpStatus, Inject } = require('@nestjs/common');
const { RestaurantService } = require('./restaurant.service');

@Controller('api/restaurants')
class RestaurantController {
  constructor(@Inject(RestaurantService) restaurantService) {
    this.restaurantService = restaurantService;
  }

  @Post()
  async createRestaurant(@Body() createDto) {
    if (!createDto.ownerId || !createDto.name || !createDto.location) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.createRestaurant(createDto);
  }

  @Get()
  async getRestaurants(@Query('admin') admin) {
    // If query param admin=true is provided, return all restaurants (for admin panel)
    const showAll = admin === 'true' || admin === true;
    return this.restaurantService.findAllRestaurants(showAll);
  }

  @Get('search/keyword')
  async searchRestaurants(@Query('q') keyword) {
    if (!keyword) {
      throw new HttpException('Search keyword required', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.searchRestaurants(keyword);
  }

  @Get('search/location')
  async searchByLocation(@Query('lat') lat, @Query('lng') lng, @Query('distance') distance) {
    if (!lat || !lng) {
      throw new HttpException('Location coordinates required', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.findRestaurantsByLocation(parseFloat(lat), parseFloat(lng), parseInt(distance) || 5000);
  }

  @Get('menu')
  async getAllMenuItems(@Query('q') keyword) {
    return this.restaurantService.getAllMenuItems(keyword);
  }

  @Get(':id')
  async getRestaurant(@Param('id') id) {
    const restaurant = await this.restaurantService.findRestaurantById(id);
    if (!restaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }
    return restaurant;
  }

  @Patch(':id')
  async updateRestaurant(@Param('id') id, @Body() updateDto) {
    return this.restaurantService.updateRestaurant(id, updateDto);
  }

  @Patch(':id/status')
  async toggleStatus(@Param('id') id, @Body() body) {
    const { isActive } = body;
    if (isActive === undefined) {
      throw new HttpException('isActive field required', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.toggleRestaurantStatus(id, isActive);
  }

  @Patch(':id/verify')
  async verifyRestaurant(@Param('id') id) {
    return this.restaurantService.verifyRestaurant(id);
  }

  @Post(':id/menu')
  async addMenuItem(@Param('id') id, @Body() menuItemDto) {
    // Normalize category values (accept Vietnamese or human labels)
    const categoryMap = {
      'món khai vị': 'APPETIZER',
      'khai vị': 'APPETIZER',
      'appetizer': 'APPETIZER',
      'món chính': 'MAIN',
      'chính': 'MAIN',
      'main': 'MAIN',
      'món tráng miệng': 'DESSERT',
      'tráng miệng': 'DESSERT',
      'dessert': 'DESSERT',
      'đồ uống': 'BEVERAGE',
      'đồ uống/ thức uống': 'BEVERAGE',
      'beverage': 'BEVERAGE',
      'combo': 'COMBO'
    };

    if (menuItemDto && menuItemDto.category && typeof menuItemDto.category === 'string') {
      const raw = menuItemDto.category.trim().toLowerCase();
      if (categoryMap[raw]) menuItemDto.category = categoryMap[raw];
      else menuItemDto.category = menuItemDto.category.toUpperCase();
    }

    if (!menuItemDto.name || !menuItemDto.price || !menuItemDto.category) {
      throw new HttpException('Missing required menu fields', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.restaurantService.addMenuItem(id, menuItemDto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to add menu item', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/menu')
  async getMenu(@Param('id') id) {
    return this.restaurantService.getMenu(id);
  }

  @Get(':id/menu/category/:category')
  async getMenuByCategory(@Param('id') id, @Param('category') category) {
    return this.restaurantService.getMenuByCategory(id, category.toUpperCase());
  }

  @Patch('menu/:menuItemId')
  async updateMenuItem(@Param('menuItemId') menuItemId, @Body() updateDto) {
    return this.restaurantService.updateMenuItem(menuItemId, updateDto);
  }

  @Delete('menu/:menuItemId')
  async deleteMenuItem(@Param('menuItemId') menuItemId) {
    return this.restaurantService.deleteMenuItem(menuItemId);
  }

  @Patch('menu/:menuItemId/availability')
  async toggleMenuAvailability(@Param('menuItemId') menuItemId, @Body() body) {
    const { isAvailable } = body;
    if (isAvailable === undefined) {
      throw new HttpException('isAvailable field required', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.toggleMenuItemAvailability(menuItemId, isAvailable);
  }

  @Get(':id/stats')
  async getStats(@Param('id') id) {
    return this.restaurantService.getRestaurantStats(id);
  }
}

module.exports = { RestaurantController };
