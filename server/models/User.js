import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: String,
    hash: String,
    salt: String
});

// Generate password hash
userSchema.methods.createPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Validate password
userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

// Generate JWT token for authentication
userSchema.methods.generateJWT = function() {
    return jwt.sign(
        { id: this._id, username: this.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // Token expires in 1 hour
    );
};

const User = model('User', userSchema);
export default User;