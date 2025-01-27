/**
 * @fileoverview Collaborator Controllers
 * @description Controllers for collaborator management.
 */

const collaboratorService = require('../services/collaboratorService');

const validationUtils = require('../utils/validationUtils');

/**
 * @function getCollaborators - Get all collaborators.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getCollaborators = async (req, res) => {
  try {
    const collaborators = await collaboratorService.getCollaborators();
    return res.success(collaborators, 'Collaborators retrieved successfully.');
  } catch (error) {
    console.error('Error getting collaborators: ', error);
    return res.internalServerError(
      'Error getting collaborators.',
      'GET_COLLABORATORS_ERROR',
    );
  }
};

/**
 * @function createCollaborator - Create a collaborator.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createCollaborator = async (req, res) => {
  const { organization, country, leader, email, website, latitude, longitude } =
    req.body;

  // Check if the organization is valid
  if (typeof organization !== 'string' || organization.length === 0) {
    return res.badRequest('Invalid organization.', 'INVALID_ORGANIZATION');
  }

  // Check if the country is valid
  if (typeof country !== 'string' || country.length === 0) {
    return res.badRequest('Invalid country.', 'INVALID_COUNTRY');
  }

  // Check if the leader is valid
  if (typeof leader !== 'string' || leader.length === 0) {
    return res.badRequest('Invalid leader.', 'INVALID_LEADER');
  }

  // Check if the email is valid
  if (!validationUtils.validateEmail(email)) {
    return res.badRequest('Invalid email address.', 'INVALID_EMAIL');
  }

  // Check if the website is valid
  if (website !== undefined && !validationUtils.validateURL(website)) {
    return res.badRequest('Invalid website.', 'INVALID_WEBSITE');
  }

  // Check if the latitude and longitude are valid
  if (
    !(latitude === undefined && longitude === undefined) &&
    !validationUtils.validateCoordinates(latitude, longitude)
  ) {
    return res.badRequest('Invalid coordinates.', 'INVALID_COORDINATES');
  }

  // Create the collaborator
  try {
    const collaborator = await collaboratorService.createCollaborator({
      organization,
      country,
      leader,
      email,
      website,
      latitude,
      longitude,
    });
    return res.success(collaborator, 'Collaborator created successfully.');
  } catch (error) {
    console.error('Error creating collaborator: ', error);
    return res.internalServerError(
      'Error creating collaborator.',
      'CREATE_COLLABORATOR_ERROR',
    );
  }
};

/**
 * @function updateCollaborator - Update a collaborator.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateCollaborator = async (req, res) => {
  const { id } = req.params;
  const { organization, country, leader, email, website, latitude, longitude } =
    req.body;

  // Check if the organization is valid
  if (typeof organization !== 'string' || organization.length === 0) {
    return res.badRequest('Invalid organization.', 'INVALID_ORGANIZATION');
  }

  // Check if the country is valid
  if (typeof country !== 'string' || country.length === 0) {
    return res.badRequest('Invalid country.', 'INVALID_COUNTRY');
  }

  // Check if the leader is valid
  if (typeof leader !== 'string' || leader.length === 0) {
    return res.badRequest('Invalid leader.', 'INVALID_LEADER');
  }

  // Check if the email is valid
  if (!validationUtils.validateEmail(email)) {
    return res.badRequest('Invalid email address.', 'INVALID_EMAIL');
  }

  // Check if the website is valid
  if (website !== undefined && !validationUtils.validateURL(website)) {
    return res.badRequest('Invalid website.', 'INVALID_WEBSITE');
  }

  // Check if the latitude and longitude are valid
  if (
    !(latitude === undefined && longitude === undefined) &&
    !validationUtils.validateCoordinates(latitude, longitude)
  ) {
    return res.badRequest('Invalid coordinates.', 'INVALID_COORDINATES');
  }

  // Update the collaborator
  try {
    // Check if the collaborator exists
    const collaboratorExists =
      await collaboratorService.getCollaboratorById(id);
    if (!collaboratorExists) {
      return res.notFound('Collaborator not found.', 'COLLABORATOR_NOT_FOUND');
    }

    // If the collaborator exists, update it
    const collaborator = await collaboratorService.updateCollaborator(id, {
      organization,
      country,
      leader,
      email,
      website,
      latitude,
      longitude,
    });
    return res.success(collaborator, 'Collaborator updated successfully.');
  } catch (error) {
    console.error('Error updating collaborator: ', error);
    return res.internalServerError(
      'Error updating collaborator.',
      'UPDATE_COLLABORATOR_ERROR',
    );
  }
};

/**
 * @function deleteCollaborator - Delete a collaborator.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteCollaborator = async (req, res) => {
  const { id } = req.params;

  // Delete the collaborator
  try {
    // Check if the collaborator exists
    const collaboratorExists =
      await collaboratorService.getCollaboratorById(id);
    if (!collaboratorExists) {
      return res.notFound('Collaborator not found.', 'COLLABORATOR_NOT_FOUND');
    }

    // If the collaborator exists, delete it
    await collaboratorService.deleteCollaborator(id);
    return res.success(null, 'Collaborator deleted successfully.');
  } catch (error) {
    console.error('Error deleting collaborator: ', error);
    return res.internalServerError(
      'Error deleting collaborator.',
      'DELETE_COLLABORATOR_ERROR',
    );
  }
};

/**
 * @function getAbout - Get the about information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAbout = async (req, res) => {
  try {
    const about = await collaboratorService.getCollaboratorsAbout();
    return res.success(about, 'About information retrieved successfully.');
  } catch (error) {
    console.error('Error getting about information: ', error);
    return res.internalServerError(
      'Error getting about information.',
      'GET_ABOUT_ERROR',
    );
  }
};

/**
 * @function updateAbout - Update the about information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateAbout = async (req, res) => {
  const { about } = req.body;

  // Check if the about is valid
  if (typeof about !== 'object') {
    return res.badRequest('Invalid about data.', 'INVALID_ABOUT');
  }

  // Update the about information
  try {
    const updatedAbout =
      await collaboratorService.updateCollaboratorsAbout(about);
    return res.success(updatedAbout, 'About information updated successfully.');
  } catch (error) {
    console.error('Error updating about information: ', error);
    return res.internalServerError(
      'Error updating about information.',
      'UPDATE_ABOUT_ERROR',
    );
  }
};

module.exports = {
  getCollaborators,
  createCollaborator,
  updateCollaborator,
  deleteCollaborator,
  getAbout,
  updateAbout,
};
