require('dotenv').config();
require('reflect-metadata');

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');
const wsBroadcast = require('./ws-broadcast');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  const allowedOrigins = String(process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  const port = process.env.PORT || process.env.GATEWAY_PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`API Gateway listening on port ${port}`);

  // Initialize WebSocket server attached to the same HTTP server
  try {
    const server = app.getHttpServer();
    wsBroadcast.init(server);
    console.log('WebSocket server initialized on API Gateway');
  } catch (e) {
    console.warn('Failed to initialize WebSocket server:', e.message || e);
  }
}

bootstrap().catch(err => console.error('Bootstrap error:', err));
