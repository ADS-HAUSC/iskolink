// server.js
import express from 'express';
import cors from 'cors';
import { connectToDatabase, getEventsData, closeConnection } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connection
let db;

// Connect to database on server start
const initDatabase = async () => {
  try {
    db = await connectToDatabase();
    console.log('Database initialized');
  } catch (error) {
    console.error('Failed to initialize database', error);
    process.exit(1);
  }
};

// API endpoint to get events
app.get('/api/events', async (req, res) => {
  try {
    const events = await getEventsData();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await closeConnection();
  process.exit(0);
});

// Start the server
const startServer = async () => {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();