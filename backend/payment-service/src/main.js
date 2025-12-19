require('dotenv').config();
require('reflect-metadata');

const { NestFactory } = require('@nestjs/core');
const { Transport } = require('@nestjs/microservices');
const { AppModule } = require('./app.module');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Bật CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // 2. Cấu hình RabbitMQ
  // Payment Service sẽ lắng nghe trên 'payment_queue'
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672'],
      queue: process.env.PAYMENT_QUEUE || 'payment_queue', 
      queueOptions: { durable: false }
    }
  });

  // 3. Cấu hình Port chuẩn 3005
  const port = process.env.PORT || process.env.PAYMENT_SERVICE_PORT || 3005;

  // 4. Mở cổng HTTP trước (QUAN TRỌNG: 0.0.0.0)
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Payment Service HTTP is running on port ${port}`);

  // 5. Khởi động RabbitMQ sau
  try {
    await app.startAllMicroservices();
    console.log('✅ RabbitMQ connected successfully!');
  } catch (e) {
    console.error('❌ RabbitMQ connection failed:', e.message);
  }
}

bootstrap().catch(err => console.error('❌ Bootstrap error:', err));