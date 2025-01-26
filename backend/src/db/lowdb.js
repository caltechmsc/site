/**
 * @fileoverview Database Connection (Simulate LowDB)
 * @description Database connection and initialization.
 */

const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../data');

const JSON_SPACING = 2;

// Create the data directory if it does not exist
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath);
}

// Store the database connection instances
const dbInstances = {};

/**
 * @function getDbConnection - Get the database connection instance.
 * @param {string} dbName - The name of the database.
 * @param {Object} defaultValue - The default value for the database.
 * @returns {Promise<Object>} The database connection instance.
 */
const getDbConnection = async (dbName, defaultValue) => {
  // If the database is already initialized, return the existing instance
  if (dbInstances[dbName]) {
    return dbInstances[dbName];
  }

  const filePath = path.join(dbPath, `${dbName}.json`);

  // If the database file does not exist, create it with default value
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      JSON.stringify(defaultValue, null, JSON_SPACING),
    );
  }

  // Read the existing data from the database file
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Database instance to store and retrieve data
  const dbConnection = {
    data,
    // Function to save the data back to the file
    write: (overwriteData = dbConnection.data) => {
      fs.writeFileSync(
        filePath,
        JSON.stringify(overwriteData, null, JSON_SPACING),
      );
    },
    // Function to read data from the file
    read: () => {
      return dbConnection.data;
    },
  };

  // Store the connection instance
  dbInstances[dbName] = dbConnection;

  return dbConnection;
};

// Initialize and get the database connections
const aboutWagDb = getDbConnection('about_wag', {
  bio: '',
  about: null,
  cv: null,
  photo: null,
});
const aboutMscDb = getDbConnection('about_msc', {
  about: null,
});
const collaboratorsDb = getDbConnection('collaborators', {
  about: null,
});
const researchDb = getDbConnection('research', {
  about: null,
  areas: {},
});
const publicationsDb = getDbConnection('publications', {
  publications: [],
  crawlingStatus: {
    status: 'idle',
    lastCrawled: null,
    lastUpdated: null,
    error: false,
    message: null,
  },
});
const eventsGroupPhotosDb = getDbConnection('events_group_photos', {
  photos: [],
});

// Function to close all open connections
const closeDbs = async () => {
  try {
    for (const dbName in dbInstances) {
      dbInstances[dbName].write(); // Save data back to the file
    }
    console.log('Closed all lowdb connections.');
  } catch (error) {
    console.error('Error closing databases:', error.message);
    throw error;
  }
};

module.exports = {
  aboutWagDb,
  aboutMscDb,
  collaboratorsDb,
  researchDb,
  publicationsDb,
  eventsGroupPhotosDb,
  closeDbs,
};
