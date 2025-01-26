/**
 * @fileoverview Admin Controllers
 * @description Controllers for admin management.
 */

const adminService = require('../services/adminService');

/**
 * @function getAdmins - Get all admins.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    return res.success(admins, 'Admins retrieved successfully.');
  } catch (error) {
    console.error('Error in getting admins: ', error);
    return res.internalServerError(
      'Error in getting admins.',
      'GET_ADMINS_ERROR',
    );
  }
};

module.exports = {
  getAdmins,
};
