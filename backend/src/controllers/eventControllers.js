/**
 * @fileoverview Event Controllers
 * @description Controllers for events management.
 */

const eventsService = require('../services/eventService');

const validationUtils = require('../utils/validationUtils');

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

/**
 * @function addGroupPhoto - Add a group photo.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
const addGroupPhoto = async (req, res) => {
  const { photo } = req.body;

  // Check if the photo is valid
  if (!validationUtils.validateBase64Image(photo)) {
    return res.badRequest('Invalid photo.', 'INVALID_PHOTO');
  }

  // Add the group photo
  try {
    const groupPhoto = await eventsService.addGroupPhoto(photo);
    return res.created(groupPhoto, 'Group photo added successfully.');
  } catch (error) {
    console.error('Error adding group photo: ', error);
    return res.internalServerError(
      'Error adding group photo.',
      'ADD_GROUP_PHOTO_ERROR',
    );
  }
};

/**
 * @function removeGroupPhoto - Remove a group photo.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
const removeGroupPhoto = async (req, res) => {
  const { index } = req.params;

  // Check if the index is valid
  if (typeof index !== 'number') {
    return res.badRequest('Invalid index.', 'INVALID_INDEX');
  }

  // Remove the group photo
  try {
    // Check if the index is out of bounds
    const groupPhotos = await eventsService.getGroupPhotos();
    if (index < 0 || index >= groupPhotos.length) {
      return res.notFound('Group photo not found.', 'GROUP_PHOTO_NOT_FOUND');
    }

    // If the index is valid, remove the group photo
    const updatedGroupPhotos = await eventsService.removeGroupPhoto(index);
    return res.success(updatedGroupPhotos, 'Group photo removed successfully.');
  } catch (error) {
    console.error('Error removing group photo: ', error);
    return res.internalServerError(
      'Error removing group photo.',
      'REMOVE_GROUP_PHOTO_ERROR',
    );
  }
};

module.exports = {
  getGroupPhotos,
  addGroupPhoto,
  removeGroupPhoto,
};
