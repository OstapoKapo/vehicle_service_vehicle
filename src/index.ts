import express from 'express';
import dotenv from 'dotenv'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './common/middleware/error.middleware.js';
import helmet from 'helmet';
import vehicleRouter from './routes/vehicleRoute.js';
import { startConsumers } from './consumers/userConsummer.js';
import { initRabbit } from './services/rabbitmq.service.js';

dotenv.config();
const app = express();
app.use(cookieParser()); 
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3002;


app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use('/api/vehicles', vehicleRouter);
app.use(errorMiddleware); 

(async () => {
  try {
    await initRabbit();
    
    
    await startConsumers(); 
    
    app.listen(PORT, () => {
      console.log(`User service запущено на порті ${PORT}`);
    });

  } catch (error) {
    console.error('FATAL ERROR: Failed to initialize service or RabbitMQ:', error);
    process.exit(1);
  }
})();