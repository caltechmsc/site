/**
 * @fileoverview Research Service
 * @description Research service for interacting with the research database.
 */

const { researchDb } = require('../db/lowdb');

/**
 * @function getResearchAreas - Get the research areas from the database.
 * @returns {Promise<Object>} The research areas.
 * @throws {Error} Throws an error if the research areas cannot be retrieved.
 */
const getResearchAreas = async () => {
  try {
    const research = (await researchDb).read();

    return research.areas;
  } catch (error) {
    console.error('Error in getting research areas: ', error);
    throw error;
  }
};

/**
 * @function getResearchAbout - Get the about information for a research area.
 * @returns {Promise<Object>} The about information for a research area.
 * @throws {Error} Throws an error if the about information cannot be retrieved.
 */
const getResearchAbout = async () => {
  try {
    const research = (await researchDb).read();

    return research.about;
  } catch (error) {
    console.error('Error in getting research about information: ', error);
    throw error;
  }
};

/**
 * @function updateResearchAreas - Update the research areas in the database.
 * @param {Object} areas - The research areas.
 * @returns {Promise<Object>} The updated research areas.
 * @throws {Error} Throws an error if the research areas cannot be updated.
 */
const updateResearchAreas = async (areas) => {
  try {
    const research = (await researchDb).read();

    research.areas = areas;
    await researchDb.write();
    return research.areas;
  } catch (error) {
    console.error('Error in updating research areas: ', error);
    throw error;
  }
};

/**
 * @function updateResearchAbout - Update the about information for a research area.
 * @param {Object} about - The about information for a research area.
 * @returns {Promise<Object>} The updated about information for a research area.
 * @throws {Error} Throws an error if the about information cannot be updated.
 */
const updateResearchAbout = async (about) => {
  try {
    const research = (await researchDb).read();

    research.about = about;
    await researchDb.write();
    return research.about;
  } catch (error) {
    console.error('Error in updating research about information: ', error);
    throw error;
  }
};

module.exports = {
  getResearchAreas,
  getResearchAbout,
  updateResearchAreas,
  updateResearchAbout,
};
