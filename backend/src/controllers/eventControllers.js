/**
 * @fileoverview Event Controllers
 * @description Controllers for events management.
 */

const eventsService = require('../services/eventService');

/**
 * @function getGroupPhotos - Get the group photos.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
const getGroupPhotos = async (req, res) => {
  try {
    const groupPhotos = await eventsService.getGroupPhotos();
    return res.success(groupPhotos, 'Group photos retrieved successfully.');
  } catch (error) {
    console.error('Error getting group photos: ', error);
    return res.internalServerError(
      'Error getting group photos.',
      'GET_GROUP_PHOTOS_ERROR',
    );
  }
};

module.exports = {
  getGroupPhotos,
};
