import { connectToDatabase, closeConnection } from './db.js';
import { getActivitiesData } from './routes/activities.js'

const testConnection = async () => {
  try {
    // Connect to the database
    await connectToDatabase();
    console.log('Database connection test successful');
    
    // Get activities data
    const activities = await getActivitiesData();
    console.log('Activities data:', activities);
    
    // Close the connection
    await closeConnection();
  } catch (error) {
    console.error('Error testing database connection:', error);
  }
};

testConnection();