/**
 * @fileoverview Member Controllers
 * @description Controllers for members management.
 */

const memberService = require('../services/memberService');

const validationUtils = require('../utils/validationUtils');

/**
 * @function getMembers - Get all members.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getMembers = async (req, res) => {
  try {
    const members = await memberService.getMembers();
    return res.success(members, 'Members retrieved successfully.');
  } catch (error) {
    console.error('Error getting members: ', error);
    return res.internalServerError(
      'Error getting members.',
      'GET_MEMBERS_ERROR',
    );
  }
};

module.exports = {
  getMembers,
};
