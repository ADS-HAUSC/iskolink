// Activities API Routes

import express from 'express';
import Activity from '../models/Activity.js'

const activitiesRoute = express.Router();

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
    res.status(200).json(activities);
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
    res.status(200).json(activity);
  } 
  catch (error) {
    console.error("Error fetching activity data:", error);
    res.status(500).json({ message: 'Failed to fetch activity' });
  }
});

// Create an activity
activitiesRoute.post('/new', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    console.log(`Saved ${activity.title} to database`);
    res.status(200).json(activity);
  } 
  catch (error) {
    console.error("Error saving activity data:", error);
    res.status(500).json({ message: 'Failed to save activity' });
  }
});


// Update an activity
activitiesRoute.put('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(activity)
    console.log(`Updated ${activity.title} from database`);
  }
  catch (error) {
    console.error("Error updating activity data:", error);
    res.status(500).json({ message: 'Failed to update activity' });
  }
});

// Delete a specific activity
activitiesRoute.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ msg: "Activity not found" });
    }
    res.status(200).json({ msg: "Activity successfully deleted", activity });
    console.log(`Updated ${activity.title} from database`);
  }
  catch (error) {
    console.error("Error updating activity data:", error);
    res.status(500).json({ message: 'Failed to update activity' });
  }
});

export default activitiesRoute;