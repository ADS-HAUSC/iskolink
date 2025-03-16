import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Admin login route
router.post('/admin-login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await User.findOne({ username });

        // If user is not found
        if (!admin) {
            console.log("Admin not found in the database.");
            return res.status(401).json({ message: "Invalid username" });
        }

        // If validatePassword is missing, this will cause an error
        if (!admin.validatePassword(password)) {
            console.log("Password validation failed.");
            return res.status(401).json({ message: "Invalid password" });
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


export default router;