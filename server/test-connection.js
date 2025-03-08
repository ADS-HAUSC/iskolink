import { connectToDatabase, getEventsData, closeConnection } from './db.js';

const testConnection = async () => {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    console.log('Database connection test successful');
    
    // Get events data
    const events = await getEventsData();
    console.log('Events data:', events);
    
    // Close the connection
    await closeConnection();
  } catch (error) {
    console.error('Error testing database connection:', error);
  }
};

testConnection();