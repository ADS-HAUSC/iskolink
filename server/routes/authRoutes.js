// Auth API routes made with <3 by Jimwel L. Valdez (jimvdz). Copyright (c) 2025. All rights reserved.

import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticateAdmin } from '../middlewares/authMiddleware.js'

dotenv.config();

const authRoute = express.Router();

authRoute.post('/admin-login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await User.findOne({ username });

        if (!admin) {
            console.log("Admin not found in the database.");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!admin.validatePassword(password)) {
            console.log("Password validation failed.");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = admin.generateJWT();
        console.log("Token generated successfully.");

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Para maverify if yung token ng user is valid
authRoute.get('/verify-token', authenticateAdmin, (req, res) => {
    res.json({ valid: true, user: req.admin });
  });

export default authRoute;