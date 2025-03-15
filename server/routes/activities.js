// Activities API Routes

import express from 'express';
import Activity from '../models/Activity.js'

const activitiesRoute = express.Router();
// const database = client.db(databaseName);

// Function to get activity data;  Also for testing purposes
export const getActivitiesData = async () => {
  try {
    const activities = await Activity.find();
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
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    console.log(`Retrieved ${activity.title} from database`);
    res.json(activity);
  } 
  catch (error) {
    console.error("Error fetching activity data:", error);
    res.status(500).json({ message: 'Failed to fetch activity' });
  }
});

export default activitiesRoute;