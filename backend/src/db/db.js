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

// Connect to the admins, members, and papers databases
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
const papersDb = new sqlite3.Database(dbPath + '/papers.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the papers database.');
  }
});

// Close the admins, members, and papers databases
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

  papersDb.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Closed the papers database connection.');
    }
  });
};

// Create the admins, members, and papers tables if they do not exist
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
papersDb.serialize(() => {
  papersDb.run(
    'CREATE TABLE IF NOT EXISTS papers (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, authors TEXT NOT NULL, abstract TEXT, thumbnail TEXT)',
  );
});

module.exports = { adminsDb, membersDb, papersDb, closeDbs };
