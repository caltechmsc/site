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

/**
 * @function getResearchAbout - Get the about information for a research area.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getResearchAbout = async (req, res) => {
  try {
    const research = await researchService.getResearchAbout();
    return res.success(
      research,
      'Research about information retrieved successfully.',
    );
  } catch (error) {
    console.error('Error getting research about information: ', error);
    return res.internalServerError(
      'Error getting research about information.',
      'GET_RESEARCH_ABOUT_ERROR',
    );
  }
};

/**
 * @function updateResearchAreas - Update the research areas in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateResearchAreas = async (req, res) => {
  const { areas } = req.body;

  // Check if the areas is valid
  if (typeof areas !== 'object') {
    return res.badRequest('Invalid research areas.', 'INVALID_AREAS');
  }

  // Update the research areas
  try {
    const updatedAreas = await researchService.updateResearchAreas(areas);
    return res.success(updatedAreas, 'Research areas updated successfully.');
  } catch (error) {
    console.error('Error updating research areas: ', error);
    return res.internalServerError(
      'Error updating research areas.',
      'UPDATE_RESEARCH_AREAS_ERROR',
    );
  }
};

module.exports = {
  getResearch,
  getResearchAbout,
  updateResearchAreas,
};
