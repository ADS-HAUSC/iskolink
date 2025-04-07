// Middleware to authenticate admin in API requests. Made with <3 by Jimwel L. Valdez (jimvdz).

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateAdmin = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.admin = decoded; // Store admin info in request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
