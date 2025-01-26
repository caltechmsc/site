/**
 * @fileoverview Member Service
 * @description Member service for interacting with the members database.
 */

const { membersDb } = require('../db/db');

/**
 * @function createMember - Create a new member in the database.
 * @param {Object} member - The member information.
 * @returns {Promise<Object>} The created member.
 * @throws {Error} Throws an error if the member creation fails.
 */
const createMember = async (member) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const statement = membersDb.prepare(
        'INSERT INTO members (name, position, education, area, email, organization, country, website, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      );

      statement.run(
        member.name,
        member.position,
        member.education,
        member.area,
        member.email,
        member.organization,
        member.country,
        member.website,
        member.photo,
        (error) => {
          statement.finalize();
          if (error) {
            return reject(error);
          }
          return resolve({ id: this.lastID, ...member });
        },
      );
    });

    return result;
  } catch (error) {
    console.error('Error in creating member: ', error);
    throw error;
  }
};

/**
 * @function getMembers - Get all members from the database.
 * @returns {Promise<Array<Object>>} The members in the database.
 * @throws {Error} Throws an error if the members cannot be retrieved.
 */
const getMembers = async () => {
  try {
    const members = await new Promise((resolve, reject) => {
      membersDb.all('SELECT * FROM members', (error, rows) => {
        if (error) {
          return reject(error);
        }
        return resolve(rows);
      });
    });

    return members;
  } catch (error) {
    console.error('Error in getting members: ', error);
    throw error;
  }
};

/**
 * @function getMemberById - Get a member by their id.
 * @param {number} id - The id of the member.
 * @returns {Promise<Object>} The member with the specified id.
 * @throws {Error} Throws an error if the member cannot be retrieved.
 */
const getMemberById = async (id) => {
  try {
    const member = await new Promise((resolve, reject) => {
      membersDb.get(
        'SELECT * FROM members WHERE id = ?',
        [id],
        (error, row) => {
          if (error) {
            return reject(error);
          }
          return resolve(row);
        },
      );
    });

    return member;
  } catch (error) {
    console.error('Error in getting member by id: ', error);
    throw error;
  }
};

/**
 * @function updateMember - Update a member in the database.
 * @param {number} id - The id of the member.
 * @param {Object} member - The updated member information.
 * @returns {Promise<Object>} The updated member.
 * @throws {Error} Throws an error if the member cannot be updated.
 */
const updateMember = async (id, member) => {
  try {
    await new Promise((resolve, reject) => {
      membersDb.run(
        'UPDATE members SET name = ?, position = ?, education = ?, area = ?, email = ?, organization = ?, country = ?, website = ?, photo = ? WHERE id = ?',
        [
          member.name,
          member.position,
          member.education,
          member.area,
          member.email,
          member.organization,
          member.country,
          member.website,
          member.photo,
          id,
        ],
        (error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        },
      );
    });

    return member;
  } catch (error) {
    console.error('Error in updating member: ', error);
    throw error;
  }
};

/**
 * @function deleteMember - Delete a member from the database.
 * @param {number} id - The id of the member.
 * @returns {Promise<void>} A promise that resolves when the member is deleted.
 * @throws {Error} Throws an error if the member cannot be deleted.
 */
const deleteMember = async (id) => {
  try {
    await new Promise((resolve, reject) => {
      membersDb.run('DELETE FROM members WHERE id = ?', [id], (error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      });
    });
  } catch (error) {
    console.error('Error in deleting member: ', error);
    throw error;
  }
};

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
