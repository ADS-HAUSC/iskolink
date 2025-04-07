// server.js
import express from 'express';
import cors from 'cors';
import { connectToDatabase, closeConnection } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
import activitiesRoute from './routes/activities.js';
import formsRoute from './routes/forms.js';
import usersRoute from './routes/users.js'
import authRoute from './routes/authRoutes.js'
import uploadRoute from './routes/uploadRoutes.js'

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

// Import API routes
app.use("/api/activities", activitiesRoute)
app.use("/api/forms", formsRoute)
app.use("/api/users", usersRoute)
app.use("/api/auth", authRoute)
app.use("/api/upload", uploadRoute)
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

// For purposes of calling or starting Render backend service early na
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Server is running.' });
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