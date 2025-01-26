/**
 * @fileoverview Auth Controllers
 * @description Controllers for user authentication.
 */

const adminService = require('../services/adminService');

const jwtUtils = require('../utils/jwtUtils');
const validationUtils = require('../utils/validationUtils');

/**
 * @function loginAdmin - Login an admin.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email is valid
  if (!validationUtils.validateEmail(email)) {
    return res.badRequest('Invalid email address.', 'INVALID_EMAIL');
  }

  // Check if the password is valid
  if (!validationUtils.validatePassword(password)) {
    return res.badRequest('Invalid password.', 'INVALID_PASSWORD');
  }

  // Login the admin
  try {
    const admin = await adminService.loginAdmin(email, password);
    const secret = await adminService.getRefreshTokenSecret(
      admin.id,
      process.env.JWT_SECRET,
    );

    return res.success(
      {
        admin,
        refreshToken: jwtUtils.generateToken(
          {
            id: admin.id,
          },
          secret,
          '30d',
        ),
        accessToken: jwtUtils.generateToken(
          {
            id: admin.id,
          },
          process.env.JWT_SECRET,
          '15m',
        ),
      },
      'Admin logged in successfully.',
    );
  } catch (error) {
    if (error.message === 'Admin not found') {
      return res.notFound('Admin not found.', 'ADMIN_NOT_FOUND');
    }
    if (error.message === 'Invalid password') {
      return res.unauthorized('Invalid password.', 'INVALID_PASSWORD');
    }
    return res.internalServerError('Error logging in admin.', 'LOGIN_ERROR');
  }
};

module.exports = {
  loginAdmin,
};
