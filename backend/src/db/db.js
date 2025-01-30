/**
 * @fileoverview Database Connection (SQLite3)
 * @description Database connection and initialization.
 */

const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '../../data');

// Create the data directory if it does not exist
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath);
}

// Connect to the admins, members, and collaborators databases
const adminsDb = new sqlite3.Database(dbPath + '/admins.db', (error) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log('Connected to the admins database.');
  }
});
const membersDb = new sqlite3.Database(dbPath + '/members.db', (error) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log('Connected to the members database.');
  }
});
const collaboratorsDb = new sqlite3.Database(
  dbPath + '/collaborators.db',
  (error) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log('Connected to the collaborators database.');
    }
  },
);

// Function to close all database connections
const closeDbs = async () => {
  const closePromises = [
    new Promise((resolve, reject) => {
      adminsDb.close((error) => {
        if (error) {
          console.error(error.message);
          reject(error);
        } else {
          console.log('Closed the admins database connection.');
          resolve();
        }
      });
    }),
    new Promise((resolve, reject) => {
      membersDb.close((error) => {
        if (error) {
          console.error(error.message);
          reject(error);
        } else {
          console.log('Closed the members database connection.');
          resolve();
        }
      });
    }),
    new Promise((resolve, reject) => {
      collaboratorsDb.close((error) => {
        if (error) {
          console.error(error.message);
          reject(error);
        } else {
          console.log('Closed the collaborators database connection.');
          resolve();
        }
      });
    }),
  ];

  try {
    await Promise.all(closePromises);
  } catch (error) {
    console.error('Error closing databases:', error);
    throw error;
  }
};

// Create the admins, members, and collaborators tables if they do not exist
adminsDb.serialize(() => {
  adminsDb.run(
    'CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)',
  );
});
membersDb.serialize(() => {
  membersDb.run(
    'CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, position TEXT NOT NULL, education TEXT NOT NULL, area TEXT NOT NULL, email TEXT NOT NULL, organization TEXT, country TEXT, website TEXT, photo TEXT)',
  );
});
collaboratorsDb.serialize(() => {
  collaboratorsDb.run(
    'CREATE TABLE IF NOT EXISTS collaborators (id INTEGER PRIMARY KEY AUTOINCREMENT, organization TEXT NOT NULL, country TEXT NOT NULL, leader TEXT NOT NULL, email TEXT NOT NULL, website TEXT, latitude REAL, longitude REAL)',
  );
});

module.exports = { adminsDb, membersDb, collaboratorsDb, closeDbs };
