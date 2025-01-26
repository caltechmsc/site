/**
 * @fileoverview Database Connection (LowDB)
 * @description Database connection and initialization.
 */

const path = require('path');
const fs = require('fs');
const low = require('lowdb');

const dbPath = path.join(__dirname, '../../data');

// Create the data directory if it does not exist
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath);
}

// Connect to the about_wag, about_msc, collaborators, research, publications_crawling_status, and events_group_photos databases
const aboutWagDb = low(new FileSync(dbPath + '/about_wag.json'));
const aboutMscDb = low(new FileSync(dbPath + '/about_msc.json'));
const collaboratorsDb = low(new FileSync(dbPath + '/collaborators.json'));
const researchDb = low(new FileSync(dbPath + '/research.json'));
const publicationsCrawlingStatusDb = low(
  new FileSync(dbPath + '/publications_crawling_status.json'),
);
const eventsGroupPhotosDb = low(
  new FileSync(dbPath + '/events_group_photos.json'),
);

// Set default values for the about_wag, about_msc, collaborators, research, publications_crawling_status, and events_group_photos databases
aboutWagDb.defaults({ bio: '', about: null, cv: null, photo: null }).write();
aboutMscDb.defaults({ about: null }).write();
collaboratorsDb.defaults({ about: null }).write();
researchDb.defaults({ about: null, areas: {} }).write();
publicationsCrawlingStatusDb
  .defaults({
    status: 'idle',
    lastCrawled: null,
    lastUpdated: null,
    error: false,
    message: null,
  })
  .write();
eventsGroupPhotosDb.defaults({ photos: [] }).write();

// Close the about_wag, about_msc, collaborators, research, publications_crawling_status, and events_group_photos databases
const closeDbs = () => {
  try {
    aboutWagDb.write();
    aboutMscDb.write();
    collaboratorsDb.write();
    researchDb.write();
    publicationsCrawlingStatusDb.write();
    eventsGroupPhotosDb.write();

    console.log('Closed lowdb connections.');
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  aboutWagDb,
  aboutMscDb,
  collaboratorsDb,
  researchDb,
  publicationsCrawlingStatusDb,
  eventsGroupPhotosDb,
  closeDbs,
};
