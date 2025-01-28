/**
 * @fileoverview Admin Class
 * @description Admin class to send admin requests to the backend.
 */

class Admin {
  /**
   * @constructor - Initializes the Admin class.
   * @param {Object} app - The App class.
   */
  constructor(app) {
    this.app = app;
    this.baseURL = app.baseURL;
    this.apiURL = app.apiURL;
  }

  /**
   * @function getAdmins - Sends a get admins request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getAdmins() {
    const response = await fetch(`${this.apiURL}/admins`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function createAdmin - Sends a create admin request to the backend.
   * @param {string} email - The email of the admin.
   * @param {string} password - The password of the admin.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async createAdmin(email, password) {
    const response = await fetch(`${this.apiURL}/admins`, {
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
   * @function updateAdminEmail - Sends an update admin email request to the backend.
   * @param {string} id - The id of the admin.
   * @param {string} email - The new email of the admin.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateAdminEmail(id, email) {
    const response = await fetch(`${this.apiURL}/admins/${id}/email`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function updateAdminPassword - Sends an update admin password request to the backend.
   * @param {string} id - The id of the admin.
   * @param {string} password - The new password of the admin.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateAdminPassword(id, password) {
    const response = await fetch(`${this.apiURL}/admins/${id}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function deleteAdmin - Sends a delete admin request to the backend.
   * @param {string} id - The id of the admin.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async deleteAdmin(id) {
    const response = await fetch(`${this.apiURL}/admins/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }
}
