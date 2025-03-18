// server.js
import express from 'express';
import cors from 'cors';
import { connectToDatabase, closeConnection } from './db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from 'cloudinary';

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set storage engine for multer
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // unique filename
  },
});

const upload = multer({ storage: storage });

// Updated to use the API routes imported (-API endpoint to get activities-)
app.use("/api/activities", activitiesRoute)
app.use("/api/forms", formsRoute)
app.use("/api/users", usersRoute)
app.use("/api/auth", authRoute)
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

// API to handle image upload to Cloudinary
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log('Uploaded file path:', req.file.path);

  cloudinary.v2.uploader.upload(
    req.file.path,
    {
      public_id: Date.now() + '-' + req.file.originalname.replace(path.extname(req.file.originalname), '')
    },
    (error, result) => {
      if (error) {
        console.log('Error uploading to Cloudinary:', error);
        return res.status(500).json({ error: error.message });
      }
  
      console.log('File uploaded successfully:', result);
  
      return res.status(200).json({
        filePath: result.secure_url
      });
    }
  );  
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