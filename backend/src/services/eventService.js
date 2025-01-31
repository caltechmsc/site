/**
 * @fileoverview Event Service
 * @description Event service for interacting with the events database.
 */

const { eventsGroupPhotosDb } = require('../db/lowdb');

/**
 * @function getGroupPhotos - Get the group photos from the database.
 * @returns {Promise<Array<string>>} The group photos. (Base64 encoded)
 * @throws {Error} Throws an error if the group photos cannot be retrieved.
 */
const getGroupPhotos = async () => {
  try {
    const events = (await eventsGroupPhotosDb).read();

    return events.photos;
  } catch (error) {
    console.error('Error in getting group photos: ', error);
    throw error;
  }
};

/**
 * @function addGroupPhoto - Add a group photo to the database.
 * @param {string} photo - The group photo. (Base64 encoded)
 * @returns {Promise<Array<string>>} The updated group photos.
 * @throws {Error} Throws an error if the group photo cannot be added.
 */
const addGroupPhoto = async (photo) => {
  try {
    const events = (await eventsGroupPhotosDb).read();

    events.photos.unshift(photo);
    (await eventsGroupPhotosDb).write();
    return events.photos;
  } catch (error) {
    console.error('Error in adding group photo: ', error);
    throw error;
  }
};

/**
 * @function removeGroupPhoto - Remove a group photo from the database.
 * @param {number} index - The index of the group photo to remove.
 * @returns {Promise<Array<string>>} The updated group photos.
 * @throws {Error} Throws an error if the group photo cannot be removed.
 */
const removeGroupPhoto = async (index) => {
  try {
    const events = (await eventsGroupPhotosDb).read();

    events.photos.splice(index, 1);
    (await eventsGroupPhotosDb).write();
    return events.photos;
  } catch (error) {
    console.error('Error in removing group photo: ', error);
    throw error;
  }
};

module.exports = {
  getGroupPhotos,
  addGroupPhoto,
  removeGroupPhoto,
};
