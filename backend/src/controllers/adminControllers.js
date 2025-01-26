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

/**
 * @function updateAdminEmail - Update an admin's email.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateAdminEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  // Check if the email is valid
  if (!validationUtils.validateEmail(email)) {
    return res.badRequest('Invalid email address.', 'INVALID_EMAIL');
  }

  // Update the admin's email
  try {
    // Check if the admin exists
    const adminExists = await adminService.getAdminById(id);
    if (!adminExists) {
      return res.notFound('Admin not found.', 'ADMIN_NOT_FOUND');
    }

    // Check if the email is already in use
    const existingAdmin = await adminService.getAdminByEmail(email);
    if (existingAdmin) {
      return res.conflict('Email already in use.', 'EMAIL_IN_USE');
    }

    // If the email is not in use, update the admin's email
    const admin = await adminService.updateAdminEmail(id, email);
    return res.success(admin, 'Admin email updated successfully.');
  } catch (error) {
    console.error('Error updating admin email: ', error);
    return res.internalServerError(
      'Error updating admin email.',
      'UPDATE_ADMIN_EMAIL_ERROR',
    );
  }
};

/**
 * @function updateAdminPassword - Update an admin's password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateAdminPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  // Check if the password is valid
  if (!validationUtils.validatePassword(password)) {
    return res.badRequest('Invalid password.', 'INVALID_PASSWORD');
  }

  // Update the admin's password
  try {
    // Check if the admin exists
    const adminExists = await adminService.getAdminById(id);
    if (!adminExists) {
      return res.notFound('Admin not found.', 'ADMIN_NOT_FOUND');
    }

    // If the admin exists, update the admin's password
    const admin = await adminService.updateAdminPassword(id, password);
    return res.success(admin, 'Admin password updated successfully.');
  } catch (error) {
    console.error('Error updating admin password: ', error);
    return res.internalServerError(
      'Error updating admin password.',
      'UPDATE_ADMIN_PASSWORD_ERROR',
    );
  }
};

/**
 * @function deleteAdmin - Delete an admin.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  // Delete the admin
  try {
    // Check if the admin exists
    const adminExists = await adminService.getAdminById(id);
    if (!adminExists) {
      return res.notFound('Admin not found.', 'ADMIN_NOT_FOUND');
    }

    // If the admin exists, delete the admin
    await adminService.deleteAdmin(id);
    return res.success(null, 'Admin deleted successfully.');
  } catch (error) {
    console.error('Error deleting admin: ', error);
    return res.internalServerError(
      'Error deleting admin.',
      'DELETE_ADMIN_ERROR',
    );
  }
};

module.exports = {
  getAdmins,
  createAdmin,
  updateAdminEmail,
  updateAdminPassword,
  deleteAdmin,
};
