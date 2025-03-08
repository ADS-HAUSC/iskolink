import { MongoClient } from 'mongodb';
import "dotenv/config";

const mongoUserName = process.env.USER_MONGO;
const mongoPassword = process.env.USER_PASSWORD;
const mongoUri = `mongodb+srv://${mongoUserName}:${mongoPassword}@hau-db.lo4ig.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(mongoUri, { monitorCommands: true });
const databaseName = "ads-hausc";

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');
    return client.db(databaseName);
  } 
  catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

export const getEventsData = async () => {
  try {
    const database = client.db(databaseName);
    const collection = database.collection("activities.events");
    const events = await collection.find({}).toArray();
    console.log(`Retrieved ${events.length} events from database`);
    return events;
  } 
  catch (error) {
    console.error("Error fetching events data:", error);
    throw error;
  }
};

export const closeConnection = async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } 
  catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
};