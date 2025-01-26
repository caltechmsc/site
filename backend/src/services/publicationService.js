/**
 * @fileoverview Publication Service
 * @description Publication service for interacting with the publications database.
 */

const { publicationsDb } = require('../db/lowdb');

/**
 * @function getPublications - Get all publications from the database.
 * @returns {Promise<Array<Object>>} The publications in the database.
 * @throws {Error} Throws an error if the publications cannot be retrieved.
 */
const getPublications = async () => {
  try {
    const publications = (await publicationsDb).read();

    return publications.publications;
  } catch (error) {
    console.error('Error in getting publications: ', error);
    throw error;
  }
};

/**
 * @function getCrawlStatus - Get the status of the publication crawler.
 * @returns {Promise<Object>} The status of the publication crawler.
 * @throws {Error} Throws an error if the status cannot be retrieved.
 */
const getCrawlStatus = async () => {
  try {
    const publications = (await publicationsDb).read();

    return publications.crawlStatus;
  } catch (error) {
    console.error('Error in getting crawl status: ', error);
    throw error;
  }
};

/**
 * @function updatePublications - Update the publications in the database.
 * @param {Array<Object>} publications - The publications.
 * @returns {Promise<Array<Object>>} The updated publications.
 * @throws {Error} Throws an error if the publications cannot be updated.
 */
const updatePublications = async (publications) => {
  try {
    const publicationsData = (await publicationsDb).read();

    publicationsData.publications = publications;
    await publicationsDb.write();
    return publicationsData.publications;
  } catch (error) {
    console.error('Error in updating publications: ', error);
    throw error;
  }
};

/**
 * @function updateCrawlStatus - Update the status of the publication crawler.
 * @param {Object} crawlStatus - The status of the publication crawler.
 * @returns {Promise<Object>} The updated status of the publication crawler.
 * @throws {Error} Throws an error if the status cannot be updated.
 */
const updateCrawlStatus = async (crawlStatus) => {
  try {
    const publications = (await publicationsDb).read();

    publications.crawlStatus = {
      status: crawlStatus.status,
      lastCrawled: crawlStatus.lastCrawled,
      lastUpdated: crawlStatus.lastUpdated,
      error: crawlStatus.error,
      message: crawlStatus.message,
    };
    await publicationsDb.write();
    return publications.crawlStatus;
  } catch (error) {
    console.error('Error in updating crawl status: ', error);
    throw error;
  }
};

module.exports = {
  getPublications,
  getCrawlStatus,
  updatePublications,
  updateCrawlStatus,
};
