// restaurant-service/src/main.js
require('dotenv').config();
require('reflect-metadata');
const { NestFactory } = require('@nestjs/core');
const { Transport } = require('@nestjs/microservices');
const { AppModule } = require('./app.module');

// Track current app for graceful shutdown from signal handlers
let __currentApp = null;

// Global process handlers to surface reasons for termination in logs
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('SIGTERM', async () => {
  console.warn('Received SIGTERM, attempting graceful shutdown...');
  try {
    if (__currentApp) {
      await __currentApp.close();
      console.log('Application closed gracefully');
    }
  } catch (e) {
    console.error('Error during graceful shutdown:', e);
  }
  process.exit(0);
});
process.on('SIGINT', async () => {
  console.warn('Received SIGINT, shutting down...');
  try {
    if (__currentApp) {
      await __currentApp.close();
    }
  } catch (e) {
    console.error('Error during shutdown:', e);
  }
  process.exit(0);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  __currentApp = app;

  // 1. Bật CORS
  app.enableCors({
    origin: '*', // Cho phép tất cả để test cho dễ
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // 2. Cấu hình RabbitMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672'],
      queue: process.env.RESTAURANT_QUEUE || 'restaurant_queue',
      queueOptions: { durable: false },
    },
  });

  // 3. Cấu hình Port chuẩn 3002
  const port = process.env.PORT || process.env.RESTAURANT_SERVICE_PORT || 3002;

  // 4. Mở cổng HTTP trước (QUAN TRỌNG: phải có '0.0.0.0')
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Restaurant Service HTTP is running on port ${port}`);

  // 5. Khởi động RabbitMQ sau
  try {
    await app.startAllMicroservices();
    console.log('✅ RabbitMQ connected successfully!');
  } catch (e) {
    console.error('❌ RabbitMQ connection failed:', e.message);
  }
}

bootstrap().catch(err => console.error('❌ Bootstrap error:', err));