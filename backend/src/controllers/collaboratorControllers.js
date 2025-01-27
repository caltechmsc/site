/**
 * @fileoverview Collaborator Controllers
 * @description Controllers for collaborator management.
 */

const collaboratorService = require('../services/collaboratorService');

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

module.exports = {
  getCollaborators,
};
