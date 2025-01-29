/**
 * @fileoverview JWT Utils
 * @description Utility functions for handling JWT operations.
 */

const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const googleOAuthClient = jwksClient({
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
});

/**
 * @function generateToken - Generate a JWT with the specified payload.
 * @param {Object} payload - The payload to include in the JWT.
 * @param {string} secret - The secret key to sign the JWT with.
 * @param {string} expiresIn - The expiration time for the JWT.
 * @returns {string} - The generated JWT.
 */
const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * @function decodeToken - Decode a JWT and return the payload.
 * @param {string} token - The JWT to decode.
 * @returns {Object} - The payload from the JWT.
 * @throws {Error} - Throws an error if the JWT is invalid.
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * @function verifyToken - Verify a JWT and return the payload.
 * @param {string} token - The JWT to verify.
 * @param {string} secret - The secret key to verify the JWT with.
 * @returns {Object} - The payload from the JWT.
 * @throws {Error} - Throws an error if the JWT is invalid.
 */
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

/**
 * @function getKey - Get the signing key for a JWT.
 * @param {Object} header - The header of the JWT.
 * @param {Function} callback - The callback function.
 */
function getKey(header, callback) {
  googleOAuthClient.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key.publicKey || key.rsaPublicKey;
    return callback(null, signingKey);
  });
}

/**
 * @module verifyGoogleToken - Verify a Google OAuth token.
 * @param {string} token - The Google OAuth token to verify.
 * @returns {Object} - The payload from the Google OAuth token.
 * @throws {Error} - Throws an error if the token is invalid.
 */
const verifyGoogleToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

module.exports = { generateToken, decodeToken, verifyToken, verifyGoogleToken };
