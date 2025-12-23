const { Module } = require('@nestjs/common');
const { TerminusModule } = require('@nestjs/terminus');
const { MongooseModule } = require('@nestjs/mongoose');
const { HealthController } = require('./health.controller');

@Module({
  imports: [
    TerminusModule,
    MongooseModule
  ],
  controllers: [HealthController],
})
class HealthModule {}

module.exports = { HealthModule };
