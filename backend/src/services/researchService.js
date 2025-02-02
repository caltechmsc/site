/**
 * @fileoverview Research Service
 * @description Research service for interacting with the research database.
 */

const { researchDb } = require('../db/lowdb');

/**
 * @function getResearchAreas - Get the research areas from the database. (no details fields)
 * @returns {Promise<Object>} The research areas.
 * @throws {Error} Throws an error if the research areas cannot be retrieved.
 */
const getResearchAreas = async () => {
  try {
    const research = (await researchDb).read();

    const researchAreas = Object.keys(research.areas).map((key) => {
      const area = research.areas[key];
      return {
        id: area.id,
        relatedPapers: area.relatedPapers,
      };
    });

    return researchAreas;
  } catch (error) {
    console.error('Error in getting research areas: ', error);
    throw error;
  }
};

/**
 * @function getDetailedResearchAreas - Get the research areas from the database. (with details fields)
 * @returns {Promise<Object>} The research areas.
 * @throws {Error} Throws an error if the research areas cannot be retrieved.
 */
const getDetailedResearchAreas = async () => {
  try {
    const research = (await researchDb).read();

    return research.areas;
  } catch (error) {
    console.error('Error in getting research areas: ', error);
    throw error;
  }
};

/**
 * @function getResearchAreaDetails - Get the research areas from the database. (with details fields)
 * @param {string} id - The research area ID.
 * @returns {Promise<Object>} The research area details.
 * @throws {Error} Throws an error if the research area cannot be retrieved.
 */
const getResearchAreaDetails = async (id) => {
  try {
    const research = (await researchDb).read();

    const area = research.areas[id];

    if (!area) {
      return null;
    }

    return area;
  } catch (error) {
    console.error('Error in getting research area details: ', error);
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
    (await researchDb).write();
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
    (await researchDb).write();
    return research.about;
  } catch (error) {
    console.error('Error in updating research about information: ', error);
    throw error;
  }
};

module.exports = {
  getResearchAreas,
  getDetailedResearchAreas,
  getResearchAreaDetails,
  getResearchAbout,
  updateResearchAreas,
  updateResearchAbout,
};
