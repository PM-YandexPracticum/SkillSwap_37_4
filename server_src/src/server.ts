// server/src/server.ts
import express from 'express';
import cors from 'cors';
import { database } from './database/db';
import { userRoutes } from './routes/user';
import { cardRoutes } from './routes/cards';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Инициализация приложения
async function initializeApp() {
  try {
    // Подключаемся к базе данных
    await database.connect();
    
    // Инициализируем таблицы и данные
    await database.initialize();
    
    // Подключаем маршруты
    app.use('/api/users', userRoutes);
    app.use('/api/cards', cardRoutes);
    
    // app.use('/api/exchanges', userRoutes);

    // app.use('/api/notify', userRoutes);
    
    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
      });
    });
    
    // Запускаем сервер
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
    
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  }
}

// Обработка graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  try {
    await database.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down...');
  try {
    await database.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Запуск приложения
initializeApp().catch(console.error);