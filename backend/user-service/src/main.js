require('dotenv').config();
require('reflect-metadata');

const { NestFactory } = require('@nestjs/core');
const { Transport } = require('@nestjs/microservices');
const { AppModule } = require('./app.module');
// Graceful handlers and global error logging
let __currentApp = null;
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('SIGTERM', async () => {
  console.warn('Received SIGTERM, shutting down gracefully...');
  try { if (__currentApp) await __currentApp.close(); } catch (e) { console.error(e); }
  process.exit(0);
});
process.on('SIGINT', async () => {
  console.warn('Received SIGINT, shutting down...');
  try { if (__currentApp) await __currentApp.close(); } catch (e) { console.error(e); }
  process.exit(0);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  __currentApp = app;

  // 1. Bật CORS để tránh lỗi chặn truy cập (tùy chọn nhưng nên có)
  app.enableCors();

  // 2. Cấu hình kết nối RabbitMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      // Lưu ý: fallback là rabbitmq (tên service) thay vì localhost
      urls: [process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672'],
      queue: process.env.USER_QUEUE || 'user_queue',
      queueOptions: { durable: false },
    },
  });

  // 3. Khởi động Microservice (RabbitMQ)
  await app.startAllMicroservices();

  // 4. QUAN TRỌNG NHẤT: Lắng nghe trên địa chỉ '0.0.0.0'
  const port = process.env.PORT || process.env.USER_SERVICE_PORT || 3003;
  await app.listen(port, '0.0.0.0');

  console.log(`✅ User Service is running on: ${await app.getUrl()}`);
}

bootstrap().catch(err => console.error('❌ Bootstrap error:', err));