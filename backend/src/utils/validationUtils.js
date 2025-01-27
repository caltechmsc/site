/**
 * @fileoverview Validation Utils
 * @description Utility functions for validation.
 */

const MAX_EMAIL_LENGTH = 254; // The maximum length of an email address

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Check if the email is valid (contains an @ symbol and a period)
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[^\s]{8,}$/; // Check if the password is valid (at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character)
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/; // Check if the URL is valid (starts with http or https)
const BASE64_IMAGE_REGEX = /^data:image\/[a-z]+;base64,/; // Check if the image is valid (starts with data:image)

/**
 * @function validateEmail - Validate an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
const validateEmail = (email) => {
  if (!email) {
    // Check if the email is empty
    return false;
  } else if (email.length > MAX_EMAIL_LENGTH) {
    // Check if the email is too long
    return false;
  } else {
    // Check if the email matches the regex pattern
    return EMAIL_REGEX.test(email);
  }
};

/**
 * @function validatePassword - Validate a password.
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
const validatePassword = (password) => {
  if (!password) {
    // Check if the password is empty
    return false;
  } else {
    // Check if the password matches the regex pattern
    return PASSWORD_REGEX.test(password);
  }
};

/**
 * @function validateURL - Validate a URL.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
const validateURL = (url) => {
  if (!url) {
    // Check if the URL is empty
    return false;
  } else {
    // Check if the URL matches the regex pattern
    return URL_REGEX.test(url);
  }
};

/**
 * @function validateBase64Image - Validate a base64 image.
 * @param {string} image - The base64 image to validate.
 * @returns {boolean} - True if the image is valid, false otherwise.
 */
const validateBase64Image = (image) => {
  if (!image) {
    // Check if the image is empty
    return false;
  } else {
    // Check if the image matches the regex pattern
    return BASE64_IMAGE_REGEX.test(image);
  }
};

module.exports = {
  validateEmail,
  validatePassword,
  validateURL,
  validateBase64Image,
};
