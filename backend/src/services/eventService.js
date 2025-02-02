/**
 * @fileoverview Event Service
 * @description Event service for interacting with the events database.
 */

const { eventsGroupPhotosDb } = require('../db/db');

/**
 * @function getGroupPhotoIds - Get the IDs of all group photos from the database.
 * @returns {Promise<Array<number>>} The IDs of all group photos.
 * @throws {Error} Throws an error if the group photos cannot be retrieved.
 */
const getGroupPhotoIds = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      eventsGroupPhotosDb.all(
        'SELECT id FROM events_group_photos',
        (error, rows) => {
          if (error) {
            return reject(error);
          } else {
            const ids = rows.map((row) => row.id);
            return resolve(ids);
          }
        },
      );
    });

    return result;
  } catch (error) {
    console.error('Error in getting group photo IDs: ', error);
    throw error;
  }
};

/**
 * @function getGroupPhotoById - Get a group photo by ID from the database.
 * @param {number} id - The ID of the group photo.
 * @returns {Promise<Object>} The group photo. (Base64 encoded)
 * @throws {Error} Throws an error if the group photo cannot be retrieved.
 */
const getGroupPhotoById = async (id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      eventsGroupPhotosDb.get(
        'SELECT * FROM events_group_photos WHERE id = ?',
        [id],
        (error, row) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(row);
          }
        },
      );
    });

    return result;
  } catch (error) {
    console.error('Error in getting group photo by ID: ', error);
    throw error;
  }
};

/**
 * @function addGroupPhoto - Add a group photo to the database.
 * @param {string} photo - The group photo. (Base64 encoded)
 * @param {string} [date] - The date of the photo.
 * @param {string} [description] - The description of the photo.
 * @returns {Promise<number>} The ID of the added group photo.
 * @throws {Error} Throws an error if the group photo cannot be added.
 */
const addGroupPhoto = async (photo, date = null, description = null) => {
  try {
    const result = await new Promise((resolve, reject) => {
      eventsGroupPhotosDb.run(
        'INSERT INTO events_group_photos (photo, date, description) VALUES (?, ?, ?)',
        [photo, date, description],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(this.lastID);
          }
        },
      );
    });

    return result;
  } catch (error) {
    console.error('Error in adding group photo: ', error);
    throw error;
  }
};

/**
 * @function removeGroupPhoto - Remove a group photo from the database.
 * @param {number} id - The ID of the group photo to remove.
 * @returns {Promise<void>}
 * @throws {Error} Throws an error if the group photo cannot be removed.
 */
const removeGroupPhoto = async (id) => {
  try {
    await new Promise((resolve, reject) => {
      eventsGroupPhotosDb.run(
        'DELETE FROM events_group_photos WHERE id = ?',
        [id],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            return resolve();
          }
        },
      );
    });
  } catch (error) {
    console.error('Error in removing group photo: ', error);
    throw error;
  }
};

module.exports = {
  getGroupPhotoIds,
  getGroupPhotoById,
  addGroupPhoto,
  removeGroupPhoto,
};
