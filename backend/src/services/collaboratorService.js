/**
 * @fileoverview Collaborator Service
 * @description Collaborator service for interacting with the collaborators database.
 */

const { collaboratorsDb } = require('../db/db');
const collaboratorsLowDb = require('../db/lowdb').collaboratorsDb;

/**
 * @function createCollaborator - Create a new collaborator in the database.
 * @param {Object} collaborator - The collaborator information.
 * @returns {Promise<Object>} The created collaborator.
 * @throws {Error} Throws an error if the collaborator creation fails.
 */
const createCollaborator = async (collaborator) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const statement = collaboratorsDb.prepare(
        'INSERT INTO collaborators (organization, country, leader, email, website, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)',
      );

      statement.run(
        collaborator.organization,
        collaborator.country,
        collaborator.leader,
        collaborator.email,
        collaborator.website,
        collaborator.latitude,
        collaborator.longitude,
        (error) => {
          statement.finalize();
          if (error) {
            return reject(error);
          }
          return resolve({ id: this.lastID, ...collaborator });
        },
      );
    });

    return result;
  } catch (error) {
    console.error('Error in creating collaborator: ', error);
    throw error;
  }
};

/**
 * @function getCollaborators - Get all collaborators from the database.
 * @returns {Promise<Array<Object>>} The collaborators in the database.
 * @throws {Error} Throws an error if the collaborators cannot be retrieved.
 */
const getCollaborators = async () => {
  try {
    const collaborators = await new Promise((resolve, reject) => {
      collaboratorsDb.all('SELECT * FROM collaborators', (error, rows) => {
        if (error) {
          return reject(error);
        }
        return resolve(rows);
      });
    });

    return collaborators;
  } catch (error) {
    console.error('Error in getting collaborators: ', error);
    throw error;
  }
};

/**
 * @function getCollaborator - Get a collaborator from the database.
 * @param {number} id - The id of the collaborator.
 * @returns {Promise<Object>} The collaborator with the specified id.
 * @throws {Error} Throws an error if the collaborator cannot be retrieved.
 */
const getCollaborator = async (id) => {
  try {
    const collaborator = await new Promise((resolve, reject) => {
      collaboratorsDb.get(
        'SELECT * FROM collaborators WHERE id = ?',
        [id],
        (error, row) => {
          if (error) {
            return reject(error);
          }
          return resolve(row);
        },
      );
    });

    return collaborator;
  } catch (error) {
    console.error('Error in getting collaborator: ', error);
    throw error;
  }
};

/**
 * @function updateCollaborator - Update a collaborator in the database.
 * @param {number} id - The id of the collaborator.
 * @param {Object} collaborator - The collaborator information.
 * @returns {Promise<Object>} The updated collaborator.
 * @throws {Error} Throws an error if the collaborator update fails.
 */
const updateCollaborator = async (id, collaborator) => {
  try {
    await new Promise((resolve, reject) => {
      const statement = collaboratorsDb.prepare(
        'UPDATE collaborators SET organization = ?, country = ?, leader = ?, email = ?, website = ?, latitude = ?, longitude = ? WHERE id = ?',
      );

      statement.run(
        collaborator.organization,
        collaborator.country,
        collaborator.leader,
        collaborator.email,
        collaborator.website,
        collaborator.latitude,
        collaborator.longitude,
        id,
        (error) => {
          statement.finalize();
          if (error) {
            return reject(error);
          }
          return resolve();
        },
      );
    });

    return collaborator;
  } catch (error) {
    console.error('Error in updating collaborator: ', error);
    throw error;
  }
};

/**
 * @function deleteCollaborator - Delete a collaborator from the database.
 * @param {number} id - The id of the collaborator.
 * @returns {Promise<void>} A promise that resolves when the collaborator is deleted.
 * @throws {Error} Throws an error if the collaborator cannot be deleted.
 */
const deleteCollaborator = async (id) => {
  try {
    await new Promise((resolve, reject) => {
      collaboratorsDb.run(
        'DELETE FROM collaborators WHERE id = ?',
        [id],
        (error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        },
      );
    });
  } catch (error) {
    console.error('Error in deleting collaborator: ', error);
    throw error;
  }
};

/**
 * @function getCollaboratorsAbout - Get the about information for the collaborators.
 * @returns {Promise<Object>} The about information for the collaborators.
 * @throws {Error} Throws an error if the about information cannot be retrieved.
 */
const getCollaboratorsAbout = async () => {
  try {
    const about = (await collaboratorsLowDb).read();

    return about.about;
  } catch (error) {
    console.error(
      'Error in getting about information for collaborators: ',
      error,
    );
    throw error;
  }
};

/**
 * @function updateCollaboratorsAbout - Update the about information for the collaborators.
 * @param {Object} about - The about information for the collaborators.
 * @returns {Promise<Object>} The updated about information for the collaborators.
 * @throws {Error} Throws an error if the about information cannot be updated.
 */
const updateCollaboratorsAbout = async (about) => {
  try {
    const aboutCollaborators = (await collaboratorsLowDb).read();

    aboutCollaborators.about = about;
    (await collaboratorsLowDb).write();
    return about.about;
  } catch (error) {
    console.error(
      'Error in updating about information for collaborators: ',
      error,
    );
    throw error;
  }
};

module.exports = {
  createCollaborator,
  getCollaborators,
  getCollaborator,
  updateCollaborator,
  deleteCollaborator,
  getCollaboratorsAbout,
  updateCollaboratorsAbout,
};
