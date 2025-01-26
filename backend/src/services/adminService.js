/**
 * @fileoverview Admin Service
 * @description Admin service for interacting with the admin database.
 */

const { adminsDb } = require('../db/db');

const { hashPassword, verifyPassword } = require('../utils/passwordHashUtils');

/**
 * @function createAdmin - Create a new admin in the database.
 * @param {string} email - The email of the admin.
 * @param {string} password - The password of the admin.
 * @returns {Promise<Object>} The created admin.
 * @throws {Error} Throws an error if the admin creation fails.
 */
const createAdmin = async (email, password) => {
  try {
    const hashedPassword = await hashPassword(password);

    const result = await new Promise((resolve, reject) => {
      const statement = adminsDb.prepare(
        'INSERT INTO admins (email, password) VALUES (?, ?)',
      );

      statement.run(email, hashedPassword, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve({ id: this.lastID, email });
      });
    });

    return result;
  } catch (error) {
    console.error('Error in creating admin: ', error);
    throw error;
  }
};

/**
 * @function loginAdmin - Login an admin.
 * @param {string} email - The email of the admin.
 * @param {string} password - The password of the admin.
 * @returns {Promise<Object>} The logged in admin.
 * @throws {Error} Throws an error if the login fails.
 */
const loginAdmin = async (email, password) => {
  try {
    const admin = await new Promise((resolve, reject) => {
      adminsDb.get(
        'SELECT * FROM admins WHERE email = ?',
        [email],
        (error, row) => {
          if (error) {
            return reject(error);
          }
          return resolve(row);
        },
      );
    });

    if (!admin) {
      throw new Error('Admin not found');
    }

    const isValidPassword = await verifyPassword(password, admin.password);

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    delete admin.password;

    return admin;
  } catch (error) {
    console.error('Error in logging in admin: ', error);
    throw error;
  }
};

/**
 * @function getRefreshTokenSecret - Get the refresh token secret for an admin. (Secret key + user Password)
 * @param {string} id - The id of the admin.
 * @param {string} secret - The secret key to sign the JWT with.
 * @returns {Promise<string>} The refresh token secret.
 * @throws {Error} Throws an error if the refresh token secret retrieval fails.
 */
const getRefreshTokenSecret = async (id, secret) => {
  try {
    const admin = await new Promise((resolve, reject) => {
      adminsDb.get('SELECT * FROM admins WHERE id = ?', [id], (error, row) => {
        if (error) {
          return reject(error);
        }
        return resolve(row);
      });
    });

    if (!admin) {
      throw new Error('Admin not found');
    }

    return `${secret}-${admin.password}`;
  } catch (error) {
    console.error('Error in getting refresh token secret: ', error);
    throw error;
  }
};

/**
 * @function getAdminById - Get an admin by id.
 * @param {string} id - The id of the admin.
 * @returns {Promise<Object>} The admin.
 * @throws {Error} Throws an error if the admin retrieval fails.
 */
const getAdminById = async (id) => {
  try {
    const admin = await new Promise((resolve, reject) => {
      adminsDb.get('SELECT * FROM admins WHERE id = ?', [id], (error, row) => {
        if (error) {
          return reject(error);
        }
        return resolve(row);
      });
    });

    if (!admin) {
      throw new Error('Admin not found');
    }

    delete admin.password;

    return admin;
  } catch (error) {
    console.error('Error in getting admin by id: ', error);
    throw error;
  }
};

/**
 * @function getAdminByEmail - Get an admin by email.
 * @param {string} email - The email of the admin.
 * @returns {Promise<Object>} The admin.
 * @throws {Error} Throws an error if the admin retrieval fails.
 */
const getAdminByEmail = async (email) => {
  try {
    const admin = await new Promise((resolve, reject) => {
      adminsDb.get(
        'SELECT * FROM admins WHERE email = ?',
        [email],
        (error, row) => {
          if (error) {
            return reject(error);
          }
          return resolve(row);
        },
      );
    });

    if (!admin) {
      throw new Error('Admin not found');
    }

    delete admin.password;

    return admin;
  } catch (error) {
    console.error('Error in getting admin by email: ', error);
    throw error;
  }
};

/**
 * @function updateAdminEmail - Update an admin's email.
 * @param {string} id - The id of the admin.
 * @param {string} email - The new email of the admin.
 * @returns {Promise<Object>} The updated admin.
 * @throws {Error} Throws an error if the admin update fails.
 */
const updateAdminEmail = async (id, email) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const statement = adminsDb.prepare(
        'UPDATE admins SET email = ? WHERE id = ?',
      );

      statement.run(email, id, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve({ id, email });
      });
    });

    return result;
  } catch (error) {
    console.error('Error in updating admin email: ', error);
    throw error;
  }
};

/**
 * @function updateAdminPassword - Update an admin's password.
 * @param {string} id - The id of the admin.
 * @param {string} password - The new password of the admin.
 * @returns {Promise<Object>} The updated admin.
 * @throws {Error} Throws an error if the admin update fails.
 */
const updateAdminPassword = async (id, password) => {
  try {
    const hashedPassword = await hashPassword(password);

    const result = await new Promise((resolve, reject) => {
      const statement = adminsDb.prepare(
        'UPDATE admins SET password = ? WHERE id = ?',
      );

      statement.run(hashedPassword, id, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve({ id });
      });
    });

    return result;
  } catch (error) {
    console.error('Error in updating admin password: ', error);
    throw error;
  }
};

/**
 * @function deleteAdmin - Delete an admin.
 * @param {string} id - The id of the admin.
 * @returns {Promise<Object>} The deleted admin.
 * @throws {Error} Throws an error if the admin deletion fails.
 */
const deleteAdmin = async (id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const statement = adminsDb.prepare('DELETE FROM admins WHERE id = ?');

      statement.run(id, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve({ id });
      });
    });

    return result;
  } catch (error) {
    console.error('Error in deleting admin: ', error);
    throw error;
  }
};

/**
 * @function getAllAdmins - Get all admins.
 * @returns {Promise<Array<Object>>} The admins.
 * @throws {Error} Throws an error if the admin retrieval fails.
 */
const getAllAdmins = async () => {
  try {
    const admins = await new Promise((resolve, reject) => {
      adminsDb.all('SELECT * FROM admins', (error, rows) => {
        if (error) {
          return reject(error);
        }
        return resolve(rows);
      });
    });

    admins.forEach((admin) => {
      delete admin.password;
    });

    return admins;
  } catch (error) {
    console.error('Error in getting all admins: ', error);
    throw error;
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
  getRefreshTokenSecret,
  getAdminById,
  getAdminByEmail,
  updateAdminEmail,
  updateAdminPassword,
  deleteAdmin,
  getAllAdmins,
};
