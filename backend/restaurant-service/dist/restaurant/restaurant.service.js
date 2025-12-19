"use strict";

var _dec, _dec2, _dec3, _dec4, _dec5, _class;
const {
  Injectable
} = require('@nestjs/common');
const {
  InjectModel
} = require('@nestjs/mongoose');
const {
  ClientProxyFactory,
  Transport
} = require('@nestjs/microservices');
let RestaurantService = (_dec = Injectable(), _dec2 = function (target, key) {
  return InjectModel('Restaurant')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return InjectModel('Menu')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RestaurantService {
  constructor(restaurantModel, menuModel) {
    this.RestaurantModel = restaurantModel;
    this.MenuModel = menuModel;
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
        queue: process.env.RESTAURANT_QUEUE || 'restaurant_queue',
        queueOptions: {
          durable: false
        }
      }
    });
  }
  async createRestaurant(createDto) {
    const restaurant = new this.RestaurantModel({
      ownerId: createDto.ownerId,
      name: createDto.name,
      description: createDto.description,
      phoneNumber: createDto.phoneNumber,
      email: createDto.email,
      address: createDto.address,
      location: createDto.location,
      operatingHours: createDto.operatingHours,
      logo: createDto.logo,
      banner: createDto.banner,
      isVerified: true,
      verifiedAt: new Date()
    });
    return restaurant.save();
  }
  async findAllRestaurants(showAll = false) {
    if (showAll) {
      return this.RestaurantModel.find({}).exec();
    }
    return this.RestaurantModel.find({
      isActive: true
    }).exec();
  }
  async findRestaurantsByLocation(lat, lng, maxDistance = 5000) {
    return this.RestaurantModel.find({
      isActive: true,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: maxDistance
        }
      }
    }).exec();
  }
  async searchRestaurants(keyword) {
    return this.RestaurantModel.find({
      isActive: true,
      $or: [{
        name: {
          $regex: keyword,
          $options: 'i'
        }
      }, {
        description: {
          $regex: keyword,
          $options: 'i'
        }
      }]
    }).exec();
  }
  async getAllMenuItems(keyword = '') {
    const query = {
      isActive: true,
      isAvailable: true
    };
    const q = String(keyword || '').trim();
    if (q) {
      query.$or = [{
        name: {
          $regex: q,
          $options: 'i'
        }
      }, {
        description: {
          $regex: q,
          $options: 'i'
        }
      }];
    }
    const items = await this.MenuModel.find(query).sort({
      updatedAt: -1
    }).limit(200).populate('restaurantId', 'name isActive').exec();
    return (items || []).filter(it => {
      const r = it && it.restaurantId;
      return r && r.isActive !== false;
    });
  }
  async findRestaurantById(id) {
    return this.RestaurantModel.findById(id).exec();
  }
  async findRestaurantByOwnerId(ownerId) {
    return this.RestaurantModel.findOne({
      ownerId
    }).exec();
  }
  async updateRestaurant(id, updateDto) {
    return this.RestaurantModel.findByIdAndUpdate(id, {
      ...updateDto,
      updatedAt: new Date()
    }, {
      new: true
    }).exec();
  }
  async toggleRestaurantStatus(id, isActive) {
    return this.RestaurantModel.findByIdAndUpdate(id, {
      isActive,
      updatedAt: new Date()
    }, {
      new: true
    }).exec();
  }
  async verifyRestaurant(id) {
    return this.RestaurantModel.findByIdAndUpdate(id, {
      isVerified: true,
      verifiedAt: new Date(),
      updatedAt: new Date()
    }, {
      new: true
    }).exec();
  }
  async addMenuItem(restaurantId, menuItemDto) {
    const menuItem = new this.MenuModel({
      restaurantId,
      name: menuItemDto.name,
      description: menuItemDto.description,
      price: menuItemDto.price,
      category: menuItemDto.category,
      image: menuItemDto.image,
      preparationTime: menuItemDto.preparationTime,
      nutrition: menuItemDto.nutrition,
      allergens: menuItemDto.allergens
    });
    return menuItem.save();
  }
  async updateMenuItem(menuItemId, updateDto) {
    return this.MenuModel.findByIdAndUpdate(menuItemId, {
      ...updateDto,
      updatedAt: new Date()
    }, {
      new: true
    }).exec();
  }
  async deleteMenuItem(menuItemId) {
    return this.MenuModel.findByIdAndDelete(menuItemId).exec();
  }
  async getMenu(restaurantId) {
    return this.MenuModel.find({
      restaurantId,
      isActive: true
    }).exec();
  }
  async getMenuByCategory(restaurantId, category) {
    return this.MenuModel.find({
      restaurantId,
      category,
      isActive: true
    }).exec();
  }
  async toggleMenuItemAvailability(menuItemId, isAvailable) {
    return this.MenuModel.findByIdAndUpdate(menuItemId, {
      isAvailable,
      updatedAt: new Date()
    }, {
      new: true
    }).exec();
  }
  async getRestaurantStats(restaurantId) {
    const restaurant = await this.RestaurantModel.findById(restaurantId).exec();
    const menuItems = await this.MenuModel.countDocuments({
      restaurantId,
      isActive: true
    }).exec();
    return {
      name: restaurant.name,
      rating: restaurant.rating,
      totalReviews: restaurant.totalReviews,
      totalOrders: restaurant.totalOrders,
      menuItemsCount: menuItems,
      isActive: restaurant.isActive,
      isVerified: restaurant.isVerified
    };
  }
  async updateRestaurantRating(restaurantId, newRating) {
    const restaurant = await this.RestaurantModel.findById(restaurantId).exec();
    const updatedRating = (restaurant.rating * restaurant.totalReviews + newRating) / (restaurant.totalReviews + 1);
    return this.RestaurantModel.findByIdAndUpdate(restaurantId, {
      rating: updatedRating,
      totalReviews: restaurant.totalReviews + 1,
      updatedAt: new Date()
    }, {
      new: true
    }).exec();
  }
}) || _class) || _class) || _class) || _class) || _class);
module.exports = {
  RestaurantService
};