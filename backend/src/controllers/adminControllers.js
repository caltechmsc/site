/**
 * @fileoverview Admin Controllers
 * @description Controllers for admin management.
 */

const adminService = require('../services/adminService');

const validationUtils = require('../utils/validationUtils');

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
    console.error('Error getting admins: ', error);
    return res.internalServerError('Error getting admins.', 'GET_ADMINS_ERROR');
  }
};

/**
 * @function createAdmin - Create an admin.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email is valid
  if (!validationUtils.validateEmail(email)) {
    return res.badRequest('Invalid email address.', 'INVALID_EMAIL');
  }

  // Check if the password is valid
  if (!validationUtils.validatePassword(password)) {
    return res.badRequest('Invalid password.', 'INVALID_PASSWORD');
  }

  // Create the admin
  try {
    // Check if the admin already exists
    const existingAdmin = await adminService.getAdminByEmail(email);
    if (existingAdmin) {
      return res.conflict('Admin already exists.', 'ADMIN_EXISTS');
    }

    // If the admin does not exist, create a new admin
    const admin = await adminService.createAdmin(email, password);
    return res.created(admin, 'Admin created successfully.');
  } catch (error) {
    console.error('Error creating admin: ', error);
    return res.internalServerError(
      'Error creating admin.',
      'CREATE_ADMIN_ERROR',
    );
  }
};

module.exports = {
  getAdmins,
  createAdmin,
};
