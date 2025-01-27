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

module.exports = {
  getCollaborators,
  createCollaborator,
};
