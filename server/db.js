import { MongoClient } from 'mongodb';
import mongoose from 'mongoose'
import "dotenv/config";

const mongoUserName = process.env.USER_MONGO;
const mongoPassword = process.env.USER_PASSWORD;
const databaseName = "ads-hausc";
const mongoUri = `mongodb+srv://${mongoUserName}:${mongoPassword}@hau-db.lo4ig.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
export const client = mongoose;

export const connectToDatabase = async () => {
  try {
    await client.connect(mongoUri);
    console.log('Connected to MongoDB successfully');
    return client.connection.db;
  } 
  catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

export const closeConnection = async () => {
  try {
    await client.connection.close();
    console.log('MongoDB connection closed');
  } 
  catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
};