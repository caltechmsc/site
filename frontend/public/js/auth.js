/**
 * @fileoverview Authentication Class
 * @description Authentication class to send authentication requests to the backend.
 */

class Authentication {
  /**
   * @constructor - Initializes the Auth class.
   * @param {Object} app - The App class.
   */
  constructor(app) {
    this.app = app;
    this.baseURL = app.baseURL;
    this.apiURL = app.apiURL;
  }

  /**
   * @function login - Sends a login request to the backend.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async login(email, password) {
    const response = await fetch(`${this.apiURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function oauth - Sends an OAuth request to the backend.
   * @param {string} token - The OAuth token.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async oauth(token) {
    const response = await fetch(`${this.apiURL}/auth/oauth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    return data;
  }
}
