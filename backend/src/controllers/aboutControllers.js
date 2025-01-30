/**
 * @fileoverview About Controllers
 * @description Controllers for the about pages.
 */

const aboutService = require('../services/aboutService');

const validationUtils = require('../utils/validationUtils');

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

/**
 * @function updateWagAbout - Update the wag about.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateWagAbout = async (req, res) => {
  const { about } = req.body;

  // Check if the about is valid
  if (typeof about !== 'object') {
    return res.badRequest('Invalid about data.', 'INVALID_ABOUT');
  }

  try {
    const updatedAbout = await aboutService.updateAboutWagAbout(about);
    return res.success(
      {
        about: updatedAbout,
      },
      'About updated successfully.',
    );
  } catch (error) {
    console.error('Error updating about: ', error);
    return res.internalServerError(
      'Error updating about.',
      'UPDATE_ABOUT_ERROR',
    );
  }
};

const updateWagCv = async (req, res) => {
  const { cv } = req.body;

  // Check if the cv is valid
  if (typeof cv !== 'string') {
    return res.badRequest('Invalid CV data.', 'INVALID_CV');
  }

  try {
    const updatedCv = await aboutService.updateWagCv(cv);
    return res.success(
      {
        cv: updatedCv,
      },
      'CV updated successfully.',
    );
  } catch (error) {
    console.error('Error updating cv: ', error);
    return res.internalServerError('Error updating CV.', 'UPDATE_CV_ERROR');
  }
};

/**
 * @function updateWagPhoto - Update the wag photo.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateWagPhoto = async (req, res) => {
  const { photo } = req.body;

  // Check if the photo is valid
  if (!validationUtils.validateBase64Image(photo)) {
    return res.badRequest('Invalid photo.', 'INVALID_PHOTO');
  }

  try {
    const updatedPhoto = await aboutService.updateAboutWagPhoto(photo);
    return res.success(
      {
        photo: updatedPhoto,
      },
      'Photo updated successfully.',
    );
  } catch (error) {
    console.error('Error updating photo: ', error);
    return res.internalServerError(
      'Error updating photo.',
      'UPDATE_PHOTO_ERROR',
    );
  }
};

/**
 * @function updateMsc - Update about msc.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateMsc = async (req, res) => {
  const { about } = req.body;

  // Check if the msc about is valid
  if (typeof about !== 'object') {
    return res.badRequest('Invalid MSC data.', 'INVALID_MSC');
  }

  try {
    const updatedMsc = await aboutService.updateAboutMsc(about);
    return res.success(
      {
        about: updatedMsc,
      },
      'MSC updated successfully.',
    );
  } catch (error) {
    console.error('Error updating msc: ', error);
    return res.internalServerError('Error updating MSC.', 'UPDATE_MSC_ERROR');
  }
};

module.exports = {
  getWag,
  getWagCv,
  getMsc,
  updateWagBio,
  updateWagAbout,
  updateWagCv,
  updateWagPhoto,
  updateMsc,
};
