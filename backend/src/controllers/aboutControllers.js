/**
 * @fileoverview About Controllers
 * @description Controllers for the about pages.
 */

const aboutService = require('../services/aboutService');

/**
 * @function getWag - Get the wag.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getWag = async (req, res) => {
  try {
    const wag = await aboutService.getAboutWag();
    return res.success(wag, 'About WAG retrieved successfully.');
  } catch (error) {
    console.error('Error getting WAG: ', error);
    return res.internalServerError('Error getting WAG.', 'GET_WAG_ERROR');
  }
};

/**
 * @function getWagCv - Get the wag cv.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getWagCv = async (req, res) => {
  try {
    const cv = await aboutService.getWagCv();
    return res.success(cv, 'CV retrieved successfully.');
  } catch (error) {
    console.error('Error getting CV: ', error);
    return res.internalServerError('Error getting CV.', 'GET_CV_ERROR');
  }
};

/**
 * @function getMsc - Get about msc.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getMsc = async (req, res) => {
  try {
    const msc = await aboutService.getAboutMsc();
    return res.success(msc, 'About MSC retrieved successfully.');
  } catch (error) {
    console.error('Error getting MSC: ', error);
    return res.internalServerError('Error getting MSC.', 'GET_MSC_ERROR');
  }
};

/**
 * @function updateWagBio - Update the wag bio.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateWagBio = async (req, res) => {
  const { bio } = req.body;

  // Check if the bio is valid
  if (typeof bio !== 'string') {
    return res.badRequest('Invalid bio.', 'INVALID_BIO');
  }

  try {
    const updatedBio = await aboutService.updateAboutWagBio(bio);
    return res.success(
      {
        bio: updatedBio,
      },
      'Bio updated successfully.',
    );
  } catch (error) {
    console.error('Error updating bio: ', error);
    return res.internalServerError('Error updating bio.', 'UPDATE_BIO_ERROR');
  }
};

module.exports = {
  getWag,
  getWagCv,
  getMsc,
  updateWagBio,
};
