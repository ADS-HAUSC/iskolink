// Activities API Routes

import { ObjectId } from 'mongodb';
import express from 'express';
import { client, databaseName } from '../db.js'

const activitiesRoute = express.Router();
const database = client.db(databaseName);
const collection = database.collection("activities");

// Function to get activity data;  Also for testing purposes
export const getActivitiesData = async () => {
  try {
    const activities = await collection.find({}).toArray();
    console.log(`Retrieved ${activities.length} activities from database`);
    return activities;
  } 
  catch (error) {
    console.error("Error fetching activities data:", error);
    throw error;
  }
};


// Get all activities
activitiesRoute.get('/', async (req, res) => {
  try {
    const activities = await getActivitiesData();
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Failed to fetch activities' });
  }
});

// Get one specific activity
activitiesRoute.get('/:id', async (req, res) => {
  try {
    const activity = await collection.findOne({ _id: new ObjectId(req.params.id) });
    console.log(`Retrieved ${activity.title} from database`);
    res.json(activity);
  } 
  catch (error) {
    console.error("Error fetching activity data:", error);
    res.status(500).json({ message: 'Failed to fetch activity' });
  }
});

export default activitiesRoute;