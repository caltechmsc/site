/**
 * @fileoverview About Service
 * @description About service for interacting with the about database.
 */

const { aboutWagDb, aboutMscDb } = require('../db/lowdb');

/**
 * @function getAboutWag - Get the about information for William Andrew Goddard III.
 * @returns {Promise<Object>} The about information for William Andrew Goddard III.
 * @throws {Error} Throws an error if the about information cannot be retrieved.
 */
const getAboutWag = async () => {
  try {
    const aboutWag = (await aboutWagDb).read();

    return {
      bio: aboutWag.bio,
      about: aboutWag.about,
      photo: aboutWag.photo,
    };
  } catch (error) {
    console.error('Error in getting about information for WAG: ', error);
    throw error;
  }
};

/**
 * @function getWagCv - Get the CV for William Andrew Goddard III.
 * @returns {Promise<string>} The CV for William Andrew Goddard III. (Base64 encoded)
 * @throws {Error} Throws an error if the CV cannot be retrieved.
 */
const getWagCv = async () => {
  try {
    const aboutWag = (await aboutWagDb).read();

    return aboutWag.cv;
  } catch (error) {
    console.error('Error in getting CV for WAG: ', error);
    throw error;
  }
};

/**
 * @function getAboutMsc - Get the about information for the Materials and Process Simulation Center.
 * @returns {Promise<Object>} The about information for the Materials and Process Simulation Center.
 * @throws {Error} Throws an error if the about information cannot be retrieved.
 */
const getAboutMsc = async () => {
  try {
    const aboutMsc = (await aboutMscDb).read();

    return aboutMsc.about;
  } catch (error) {
    console.error('Error in getting about information for MSC: ', error);
    throw error;
  }
};

/**
 * @function updateAboutWagBio - Update the bio for William Andrew Goddard III.
 * @param {string} bio - The bio for William Andrew Goddard III.
 * @returns {Promise<string>} The updated bio for William Andrew Goddard III.
 * @throws {Error} Throws an error if the bio cannot be updated.
 */
const updateAboutWagBio = async (bio) => {
  try {
    const aboutWag = (await aboutWagDb).read();

    aboutWag.bio = bio;
    (await aboutWagDb).write();
    return aboutWag.bio;
  } catch (error) {
    console.error('Error in updating bio for WAG: ', error);
    throw error;
  }
};

/**
 * @function updateAboutWagAbout - Update the about information for William Andrew Goddard III.
 * @param {Object} about - The about information for William Andrew Goddard III.
 * @returns {Promise<Object>} The updated about information for William Andrew Goddard III.
 * @throws {Error} Throws an error if the about information cannot be updated.
 */
const updateAboutWagAbout = async (about) => {
  try {
    const aboutWag = (await aboutWagDb).read();

    aboutWag.about = about;
    (await aboutWagDb).write();
    return aboutWag.about;
  } catch (error) {
    console.error('Error in updating about information for WAG: ', error);
    throw error;
  }
};

/**
 * @function updateAboutWagPhoto - Update the photo for William Andrew Goddard III.
 * @param {string} photo - The photo for William Andrew Goddard III. (Base64 encoded)
 * @returns {Promise<string>} The updated photo for William Andrew Goddard III.
 * @throws {Error} Throws an error if the photo cannot be updated.
 */
const updateAboutWagPhoto = async (photo) => {
  try {
    const aboutWag = (await aboutWagDb).read();

    aboutWag.photo = photo;
    (await aboutWagDb).write();
    return aboutWag.photo;
  } catch (error) {
    console.error('Error in updating photo for WAG: ', error);
    throw error;
  }
};

/**
 * @function updateWagCv - Update the CV for William Andrew Goddard III.
 * @param {string} cv - The CV for William Andrew Goddard III. (Base64 encoded)
 * @returns {Promise<void>} A promise that resolves when the CV is updated.
 * @throws {Error} Throws an error if the CV cannot be updated.
 */
const updateWagCv = async (cv) => {
  try {
    const aboutWag = (await aboutWagDb).read();

    aboutWag.cv = cv;
    (await aboutWagDb).write();
    return aboutWag.cv;
  } catch (error) {
    console.error('Error in updating CV for WAG: ', error);
    throw error;
  }
};

/**
 * @function updateAboutMsc - Update the about information for the Materials and Process Simulation Center.
 * @param {Object} aboutMsc - The about information for the Materials and Process Simulation Center.
 * @returns {Promise<Object>} The updated about information for the Materials and Process Simulation Center.
 * @throws {Error} Throws an error if the about information cannot be updated.
 */
const updateAboutMsc = async (aboutMsc) => {
  try {
    const currentAboutMsc = (await aboutMscDb).read();

    currentAboutMsc.about = aboutMsc;
    (await aboutMscDb).write();
    return aboutMsc.about;
  } catch (error) {
    console.error('Error in updating about information for MSC: ', error);
    throw error;
  }
};

module.exports = {
  getAboutWag,
  getWagCv,
  getAboutMsc,
  updateAboutWagBio,
  updateAboutWagAbout,
  updateAboutWagPhoto,
  updateWagCv,
  updateAboutMsc,
};
