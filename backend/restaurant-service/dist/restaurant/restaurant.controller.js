"use strict";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _class, _class2;
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
// @ts-nocheck

const {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpException,
  HttpStatus,
  Inject
} = require('@nestjs/common');
const {
  RestaurantService
} = require('./restaurant.service');
let RestaurantController = (_dec = Controller('api/restaurants'), _dec2 = function (target, key) {
  return Inject(RestaurantService)(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [void 0]), _dec5 = Post(), _dec6 = function (target, key) {
  return Body()(target, key, 0);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [void 0]), _dec9 = Get(), _dec0 = function (target, key) {
  return Query('admin')(target, key, 0);
}, _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [void 0]), _dec11 = Get('search/keyword'), _dec12 = function (target, key) {
  return Query('q')(target, key, 0);
}, _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [void 0]), _dec15 = Get('search/location'), _dec16 = function (target, key) {
  return Query('lat')(target, key, 0);
}, _dec17 = function (target, key) {
  return Query('lng')(target, key, 1);
}, _dec18 = function (target, key) {
  return Query('distance')(target, key, 2);
}, _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [void 0, void 0, void 0]), _dec21 = Get('menu'), _dec22 = function (target, key) {
  return Query('q')(target, key, 0);
}, _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [void 0]), _dec25 = Get(':id'), _dec26 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", [void 0]), _dec29 = Patch(':id'), _dec30 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec31 = function (target, key) {
  return Body()(target, key, 1);
}, _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec34 = Patch(':id/status'), _dec35 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec36 = function (target, key) {
  return Body()(target, key, 1);
}, _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec39 = Patch(':id/verify'), _dec40 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec41 = Reflect.metadata("design:type", Function), _dec42 = Reflect.metadata("design:paramtypes", [void 0]), _dec43 = Post(':id/menu'), _dec44 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec45 = function (target, key) {
  return Body()(target, key, 1);
}, _dec46 = Reflect.metadata("design:type", Function), _dec47 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec48 = Get(':id/menu'), _dec49 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec50 = Reflect.metadata("design:type", Function), _dec51 = Reflect.metadata("design:paramtypes", [void 0]), _dec52 = Get(':id/menu/category/:category'), _dec53 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec54 = function (target, key) {
  return Param('category')(target, key, 1);
}, _dec55 = Reflect.metadata("design:type", Function), _dec56 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec57 = Patch('menu/:menuItemId'), _dec58 = function (target, key) {
  return Param('menuItemId')(target, key, 0);
}, _dec59 = function (target, key) {
  return Body()(target, key, 1);
}, _dec60 = Reflect.metadata("design:type", Function), _dec61 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec62 = Delete('menu/:menuItemId'), _dec63 = function (target, key) {
  return Param('menuItemId')(target, key, 0);
}, _dec64 = Reflect.metadata("design:type", Function), _dec65 = Reflect.metadata("design:paramtypes", [void 0]), _dec66 = Patch('menu/:menuItemId/availability'), _dec67 = function (target, key) {
  return Param('menuItemId')(target, key, 0);
}, _dec68 = function (target, key) {
  return Body()(target, key, 1);
}, _dec69 = Reflect.metadata("design:type", Function), _dec70 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec71 = Get(':id/stats'), _dec72 = function (target, key) {
  return Param('id')(target, key, 0);
}, _dec73 = Reflect.metadata("design:type", Function), _dec74 = Reflect.metadata("design:paramtypes", [void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = class RestaurantController {
  constructor(restaurantService) {
    this.restaurantService = restaurantService;
  }
  async createRestaurant(createDto) {
    if (!createDto.ownerId || !createDto.name || !createDto.location) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.createRestaurant(createDto);
  }
  async getRestaurants(admin) {
    // If query param admin=true is provided, return all restaurants (for admin panel)
    const showAll = admin === 'true' || admin === true;
    return this.restaurantService.findAllRestaurants(showAll);
  }
  async searchRestaurants(keyword) {
    if (!keyword) {
      throw new HttpException('Search keyword required', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.searchRestaurants(keyword);
  }
  async searchByLocation(lat, lng, distance) {
    if (!lat || !lng) {
      throw new HttpException('Location coordinates required', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.findRestaurantsByLocation(parseFloat(lat), parseFloat(lng), parseInt(distance) || 5000);
  }
  async getAllMenuItems(keyword) {
    return this.restaurantService.getAllMenuItems(keyword);
  }
  async getRestaurant(id) {
    const restaurant = await this.restaurantService.findRestaurantById(id);
    if (!restaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }
    return restaurant;
  }
  async updateRestaurant(id, updateDto) {
    return this.restaurantService.updateRestaurant(id, updateDto);
  }
  async toggleStatus(id, body) {
    const {
      isActive
    } = body;
    if (isActive === undefined) {
      throw new HttpException('isActive field required', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.toggleRestaurantStatus(id, isActive);
  }
  async verifyRestaurant(id) {
    return this.restaurantService.verifyRestaurant(id);
  }
  async addMenuItem(id, menuItemDto) {
    if (!menuItemDto.name || !menuItemDto.price || !menuItemDto.category) {
      throw new HttpException('Missing required menu fields', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.addMenuItem(id, menuItemDto);
  }
  async getMenu(id) {
    return this.restaurantService.getMenu(id);
  }
  async getMenuByCategory(id, category) {
    return this.restaurantService.getMenuByCategory(id, category.toUpperCase());
  }
  async updateMenuItem(menuItemId, updateDto) {
    return this.restaurantService.updateMenuItem(menuItemId, updateDto);
  }
  async deleteMenuItem(menuItemId) {
    return this.restaurantService.deleteMenuItem(menuItemId);
  }
  async toggleMenuAvailability(menuItemId, body) {
    const {
      isAvailable
    } = body;
    if (isAvailable === undefined) {
      throw new HttpException('isAvailable field required', HttpStatus.BAD_REQUEST);
    }
    return this.restaurantService.toggleMenuItemAvailability(menuItemId, isAvailable);
  }
  async getStats(id) {
    return this.restaurantService.getRestaurantStats(id);
  }
}, _applyDecoratedDescriptor(_class2.prototype, "createRestaurant", [_dec5, _dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "createRestaurant"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRestaurants", [_dec9, _dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "getRestaurants"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchRestaurants", [_dec11, _dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "searchRestaurants"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchByLocation", [_dec15, _dec16, _dec17, _dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "searchByLocation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getAllMenuItems", [_dec21, _dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "getAllMenuItems"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRestaurant", [_dec25, _dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "getRestaurant"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateRestaurant", [_dec29, _dec30, _dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "updateRestaurant"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleStatus", [_dec34, _dec35, _dec36, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verifyRestaurant", [_dec39, _dec40, _dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "verifyRestaurant"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addMenuItem", [_dec43, _dec44, _dec45, _dec46, _dec47], Object.getOwnPropertyDescriptor(_class2.prototype, "addMenuItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMenu", [_dec48, _dec49, _dec50, _dec51], Object.getOwnPropertyDescriptor(_class2.prototype, "getMenu"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMenuByCategory", [_dec52, _dec53, _dec54, _dec55, _dec56], Object.getOwnPropertyDescriptor(_class2.prototype, "getMenuByCategory"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMenuItem", [_dec57, _dec58, _dec59, _dec60, _dec61], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMenuItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteMenuItem", [_dec62, _dec63, _dec64, _dec65], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteMenuItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleMenuAvailability", [_dec66, _dec67, _dec68, _dec69, _dec70], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleMenuAvailability"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getStats", [_dec71, _dec72, _dec73, _dec74], Object.getOwnPropertyDescriptor(_class2.prototype, "getStats"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
module.exports = {
  RestaurantController
};