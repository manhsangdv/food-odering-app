// restaurant-service/src/app.module.js
const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { RestaurantModule } = require('./restaurant/restaurant.module');
const { HealthModule } = require('./health/health.module');

const mongoUri =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/restaurant-service?directConnection=true&serverSelectionTimeoutMS=5000';

console.log('>>> MONGODB URI restaurant-service =', mongoUri);

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    RestaurantModule,
    HealthModule,
  ],
})
class AppModule {}

module.exports = { AppModule };
