/**
 * @fileoverview Member Class
 * @description Member class to send members requests to the backend.
 */

class Member {
  /**
   * @constructor - Initializes the Member class.
   * @param {Object} app - The App class.
   */
  constructor(app) {
    this.app = app;
    this.baseURL = app.baseURL;
    this.apiURL = app.apiURL;
  }

  /**
   * @function getMembers - Sends a get members request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getMembers() {
    const response = await fetch(`${this.apiURL}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function createMember - Sends a create member request to the backend.
   * @param {Object} member - The member to create.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async createMember(member) {
    const response = await fetch(`${this.apiURL}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function updateMember - Sends an update member request to the backend.
   * @param {number} id - The id of the member.
   * @param {Object} member - The member to update.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateMember(id, member) {
    const response = await fetch(`${this.apiURL}/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function deleteMember - Sends a delete member request to the backend.
   * @param {number} id - The id of the member.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async deleteMember(id) {
    const response = await fetch(`${this.apiURL}/members/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }
}
