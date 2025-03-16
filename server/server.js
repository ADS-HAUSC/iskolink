// server.js
import express from 'express';
import cors from 'cors';
import { connectToDatabase, closeConnection } from './db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
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

// Ensure 'public/uploads' folder exists
const uploadDir = path.join(__dirname, '../client/public/images/activities-img');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../client/public/images/activities-img'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

const upload = multer({ storage: storage });

// Updated to use the API routes imported (-API endpoint to get activities-)
app.use("/api/activities", activitiesRoute)
app.use("/api/forms", formsRoute)
app.use("/api/users", usersRoute)
app.use("/api/auth", authRoute)
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

// API to handle image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
  }
  const filePath = `images/activities-img/${req.file.filename}`; // File path stored in database
  res.json({ filePath });
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