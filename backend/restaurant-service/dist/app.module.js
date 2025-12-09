"use strict";

var _dec, _class;
// restaurant-service/src/app.module.js
const {
  Module
} = require('@nestjs/common');
const {
  MongooseModule
} = require('@nestjs/mongoose');
const {
  RestaurantModule
} = require('./restaurant/restaurant.module');
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/restaurant-service?directConnection=true&serverSelectionTimeoutMS=5000';
console.log('>>> MONGODB URI restaurant-service =', mongoUri);
let AppModule = (_dec = Module({
  imports: [MongooseModule.forRoot(mongoUri), RestaurantModule]
}), _dec(_class = class AppModule {}) || _class);
module.exports = {
  AppModule
};