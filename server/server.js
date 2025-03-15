// server.js
import express from 'express';
import cors from 'cors';
import { connectToDatabase, closeConnection } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// API routes
import activitiesRoute from './routes/activities.js';
import formsRoute from './routes/forms.js';

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

// Updated to use the API routes imported (-API endpoint to get activities-)
app.use("/api/activities", activitiesRoute)
app.use("/api/forms", formsRoute)

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