"use strict";

require('dotenv').config();
require('reflect-metadata');
const {
  NestFactory
} = require('@nestjs/core');
const {
  Transport
} = require('@nestjs/microservices');
const {
  AppModule
} = require('./app.module');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Bật CORS cho phép mọi nguồn (để dễ test)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  });

  // 2. Cấu hình kết nối RabbitMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672'],
      queue: process.env.ORDER_QUEUE || 'order_queue',
      // Queue riêng của Order Service
      queueOptions: {
        durable: false
      }
    }
  });

  // 3. Cấu hình Port chuẩn 3001
  const port = process.env.PORT || process.env.ORDER_SERVICE_PORT || 3001;

  // 4. Mở cổng HTTP trước (QUAN TRỌNG: 0.0.0.0)
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Order Service HTTP is running on port ${port}`);

  // 5. Khởi động RabbitMQ sau (tránh treo ứng dụng)
  try {
    await app.startAllMicroservices();
    console.log('✅ RabbitMQ connected successfully!');
  } catch (e) {
    console.error('❌ RabbitMQ connection failed:', e.message);
  }
}
bootstrap().catch(err => console.error('❌ Bootstrap error:', err));