// Upload API route made with <3 by Jimwel L. Valdez (jimvdz). Copyright (c) 2025. All rights reserved.

import express from 'express';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { authenticateAdmin } from '../middlewares/authMiddleware.js'

dotenv.config();
const uploadRoute = express.Router();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// API to handle image upload to Cloudinary
uploadRoute.post('/', authenticateAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  cloudinary.v2.uploader.upload(
    req.file.path,
    {
      public_id: Date.now() + '-' + req.file.originalname.replace(path.extname(req.file.originalname), ''),
      eager: [
        { width: 800, crop: 'scale', format: 'webp' }
      ],
    },
    (error, result) => {
      if (error) {
        console.log('Error uploading to Cloudinary:', error);
        return res.status(500).json({ error: error.message });
      }
  
      console.log('File uploaded successfully');
  
      return res.status(200).json({
        filePath: result.eager[0].secure_url
      });
    }
  );  
});

export default uploadRoute;