/**
 * @fileoverview Research Controllers
 * @description Controllers for research management.
 */

const researchService = require('../services/researchService');

/**
 * @function getResearch - Get the research areas object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getResearch = async (req, res) => {
  try {
    const research = await researchService.getResearchAreas();
    return res.success(research, 'Research areas retrieved successfully.');
  } catch (error) {
    console.error('Error getting research areas: ', error);
    return res.internalServerError(
      'Error getting research areas.',
      'GET_RESEARCH_ERROR',
    );
  }
};

module.exports = {
  getResearch,
};
