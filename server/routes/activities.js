// Activities API Routes

import express from 'express';
import Activity from '../models/Activity.js';
import cloudinary from 'cloudinary';

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
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ msg: "Activity not found" });
    }

    console.log(`Attempting to delete images for activity: ${activity.title}`);
    const deleteImagePromises = [];

    const getPublicIdFromUrl = (url) => {
      const pathParts = url.split('/');
      const filename = pathParts[pathParts.length - 1];
      return filename.split('.')[0];
    };

    if (activity.img1) {
      const publicId1 = getPublicIdFromUrl(activity.img1);
      deleteImagePromises.push(new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(publicId1, (err, result) => {
          if (err) {
            console.error('Error deleting image from cloud:', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      }));
    }

    if (activity.img2) {
      const publicId2 = getPublicIdFromUrl(activity.img2);
      deleteImagePromises.push(new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(publicId2, (err, result) => {
          if (err) {
            console.error('Error deleting image from cloud:', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      }));
    }

    if (activity.img3) {
      const publicId3 = getPublicIdFromUrl(activity.img3);
      deleteImagePromises.push(new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(publicId3, (err, result) => {
          if (err) {
            console.error('Error deleting image from cloud:', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      }));
    }

    await Promise.all(deleteImagePromises);
    await Activity.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Activity and associated images successfully deleted" });
  }
  
  catch (error) {
    console.error("Error deleting activity.", error);
    res.status(500).json({ message: 'Failed to delete activity.' });
  }
});

export default activitiesRoute;