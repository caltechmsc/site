/**
 * @fileoverview Event Controllers
 * @description Controllers for events management.
 */

const eventsService = require('../services/eventService');

const validationUtils = require('../utils/validationUtils');

/**
 * @function getGroupPhotoIds - Get the IDs of all group photos.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
const getGroupPhotoIds = async (req, res) => {
  try {
    const groupPhotoIds = await eventsService.getGroupPhotoIds();
    return res.success(
      groupPhotoIds,
      'Group photo IDs retrieved successfully.',
    );
  } catch (error) {
    console.error('Error getting group photo IDs: ', error);
    return res.internalServerError(
      'Error getting group photo IDs.',
      'GET_GROUP_PHOTO_IDS_ERROR',
    );
  }
};

/**
 * @function getGroupPhotoById - Get a group photo by ID.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
const getGroupPhotoById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Check if the ID is valid
  if (isNaN(id)) {
    return res.badRequest('Invalid ID.', 'INVALID_ID');
  }

  try {
    const groupPhoto = await eventsService.getGroupPhotoById(id);
    if (!groupPhoto) {
      return res.notFound('Group photo not found.', 'GROUP_PHOTO_NOT_FOUND');
    }
    return res.success(groupPhoto, 'Group photo retrieved successfully.');
  } catch (error) {
    console.error('Error getting group photo by ID: ', error);
    return res.internalServerError(
      'Error getting group photo by ID.',
      'GET_GROUP_PHOTO_BY_ID_ERROR',
    );
  }
};

/**
 * @function addGroupPhoto - Add a group photo.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
const addGroupPhoto = async (req, res) => {
  const { photo, date, description } = req.body;

  // Check if the photo is valid
  if (!validationUtils.validateBase64Image(photo)) {
    return res.badRequest('Invalid photo.', 'INVALID_PHOTO');
  }

  // Add the group photo
  try {
    const groupPhotoId = await eventsService.addGroupPhoto(
      photo,
      date,
      description,
    );
    return res.created(groupPhotoId, 'Group photo added successfully.');
  } catch (error) {
    console.error('Error adding group photo: ', error);
    return res.internalServerError(
      'Error adding group photo.',
      'ADD_GROUP_PHOTO_ERROR',
    );
  }
};

/**
 * @function updateGroupPhotoDescription - Update the description of a group photo.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
const updateGroupPhotoDescription = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description } = req.body;

  // Check if the ID is valid
  if (isNaN(id)) {
    return res.badRequest('Invalid ID.', 'INVALID_ID');
  }

  // Update the group photo description
  try {
    const groupPhoto = await eventsService.getGroupPhotoById(id);
    if (!groupPhoto) {
      return res.notFound('Group photo not found.', 'GROUP_PHOTO_NOT_FOUND');
    }

    await eventsService.updateGroupPhotoDescription(id, description);
    return res.success(null, 'Group photo description updated successfully.');
  } catch (error) {
    console.error('Error updating group photo description: ', error);
    return res.internalServerError(
      'Error updating group photo description.',
      'UPDATE_GROUP_PHOTO_DESCRIPTION_ERROR',
    );
  }
};

/**
 * @function updateGroupPhotoDate - Update the date of a group photo.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
const updateGroupPhotoDate = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { date } = req.body;

  // Check if the ID is valid
  if (isNaN(id)) {
    return res.badRequest('Invalid ID.', 'INVALID_ID');
  }

  // Update the group photo date
  try {
    const groupPhoto = await eventsService.getGroupPhotoById(id);
    if (!groupPhoto) {
      return res.notFound('Group photo not found.', 'GROUP_PHOTO_NOT_FOUND');
    }

    await eventsService.updateGroupPhotoDate(id, date);
    return res.success(null, 'Group photo date updated successfully.');
  } catch (error) {
    console.error('Error updating group photo date: ', error);
    return res.internalServerError(
      'Error updating group photo date.',
      'UPDATE_GROUP_PHOTO_DATE_ERROR',
    );
  }
};

/**
 * @function removeGroupPhoto - Remove a group photo.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
const removeGroupPhoto = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Check if the ID is valid
  if (isNaN(id)) {
    return res.badRequest('Invalid ID.', 'INVALID_ID');
  }

  // Remove the group photo
  try {
    const groupPhoto = await eventsService.getGroupPhotoById(id);
    if (!groupPhoto) {
      return res.notFound('Group photo not found.', 'GROUP_PHOTO_NOT_FOUND');
    }

    await eventsService.removeGroupPhoto(id);
    return res.success(null, 'Group photo removed successfully.');
  } catch (error) {
    console.error('Error removing group photo: ', error);
    return res.internalServerError(
      'Error removing group photo.',
      'REMOVE_GROUP_PHOTO_ERROR',
    );
  }
};

module.exports = {
  getGroupPhotoIds,
  getGroupPhotoById,
  addGroupPhoto,
  updateGroupPhotoDescription,
  updateGroupPhotoDate,
  removeGroupPhoto,
};
