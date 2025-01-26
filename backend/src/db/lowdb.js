/**
 * @fileoverview Database Connection (LowDB)
 * @description Database connection and initialization.
 */

const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../data');

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

  // Dynamically import LowDB when needed
  const { JSONFilePreset } = await import('lowdb/node');

  // Initialize the database and store the connection
  const dbConnection = await JSONFilePreset(
    path.join(dbPath, `${dbName}.json`),
    defaultValue,
  );
  dbInstances[dbName] = dbConnection; // Store the connection

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
      await dbInstances[dbName].write();
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
