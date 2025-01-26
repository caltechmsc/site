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

// Connect to the admins, and members databases
const adminsDb = new sqlite3.Database(dbPath + '/admins.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the admins database.');
  }
});
const membersDb = new sqlite3.Database(dbPath + '/members.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the members database.');
  }
});

// Close the admins, and members databases
const closeDbs = () => {
  adminsDb.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Closed the admins database connection.');
    }
  });

  membersDb.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Closed the members database connection.');
    }
  });
};

// Create the admins, and members tables if they do not exist
adminsDb.serialize(() => {
  adminsDb.run(
    'CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)',
  );
});
membersDb.serialize(() => {
  membersDb.run(
    'CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, identity TEXT NOT NULL, email TEXT NOT NULL, expertise TEXT NOT NULL, profile TEXT)',
  );
});

module.exports = { adminsDb, membersDb, closeDbs };
