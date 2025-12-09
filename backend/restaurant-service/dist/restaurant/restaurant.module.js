"use strict";

var _dec, _class;
const {
  Module
} = require('@nestjs/common');
const {
  MongooseModule
} = require('@nestjs/mongoose');
const {
  RestaurantController
} = require('./restaurant.controller');
const {
  RestaurantService
} = require('./restaurant.service');
const {
  RestaurantSchema
} = require('./schemas/restaurant.schema');
const {
  MenuSchema
} = require('./schemas/menu.schema');

/**
 * Feature module encapsulating restaurant and menu persistence logic
 * along with the HTTP controllers. By organizing code into modules
 * we keep responsibilities separated and enable easier testing and
 * maintenance.
 */
let RestaurantModule = (_dec = Module({
  imports: [
  // Register the Mongoose schemas with Nest. MongooseModule will
  // automatically create the associated models at runtime. Notice
  // that we register both the Restaurant and Menu schemas here.
  MongooseModule.forFeature([{
    name: 'Restaurant',
    schema: RestaurantSchema
  }, {
    name: 'Menu',
    schema: MenuSchema
  }])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService]
}), _dec(_class = class RestaurantModule {}) || _class);
module.exports = {
  RestaurantModule
};