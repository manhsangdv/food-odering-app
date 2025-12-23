const { Controller, Get } = require('@nestjs/common');
const { HealthCheck, HealthCheckService, MongooseHealthIndicator } = require('@nestjs/terminus');

@Controller('health')
class HealthController {
  constructor(health, mongoose) {
    this.health = health;
    this.mongoose = mongoose;
  }

  @Get()
  @HealthCheck()
  check() {
    try {
      return this.health.check([
        () => this.mongoose.pingCheck('mongodb')
      ]);
    } catch (error) {
      return {
        status: 'error',
        details: error.message
      };
    }
  }
}

module.exports = { HealthController };
