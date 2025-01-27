/**
 * @fileoverview Publication Controllers
 * @description Controllers for papers list management.
 */

const publicationService = require('../services/publicationService');

/**
 * @function getPublications - Get the papers list.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getPublications = async (req, res) => {
  try {
    const publications = await publicationService.getPublications();
    return res.success(publications, 'Publications retrieved successfully.');
  } catch (error) {
    console.error('Error getting publications: ', error);
    return res.internalServerError(
      'Error getting publications.',
      'GET_PUBLICATIONS_ERROR',
    );
  }
};

module.exports = {
  getPublications,
};
