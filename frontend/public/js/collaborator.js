/**
 * @fileoverview Collaborator Class
 * @description Collaborator class to send collaborators requests to the backend.
 */

class Collaborator {
  /**
   * @constructor - Initializes the Collaborator class.
   * @param {Object} app - The App class.
   */
  constructor(app) {
    this.app = app;
    this.baseURL = app.baseURL;
    this.apiURL = app.apiURL;
  }

  /**
   * @function getCollaborators - Sends a get collaborators request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getCollaborators() {
    const response = await fetch(`${this.apiURL}/collaborators`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function createCollaborator - Sends a create collaborator request to the backend.
   * @param {Object} collaborator - The collaborator to create.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async createCollaborator(collaborator) {
    const response = await fetch(`${this.apiURL}/collaborators`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collaborator),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function updateCollaborator - Sends an update collaborator request to the backend.
   * @param {number} id - The id of the collaborator.
   * @param {Object} collaborator - The collaborator to update.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateCollaborator(id, collaborator) {
    const response = await fetch(`${this.apiURL}/collaborators/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collaborator),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function deleteCollaborator - Sends a delete collaborator request to the backend.
   * @param {number} id - The id of the collaborator.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async deleteCollaborator(id) {
    const response = await fetch(`${this.apiURL}/collaborators/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function getAboutCollaborator - Sends a get about collaborator request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getAboutCollaborator() {
    const response = await fetch(`${this.apiURL}/collaborators/about`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function updateAboutCollaborator - Sends an update about collaborator request to the backend.
   * @param {Object} about - The new about of collaborator.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateAboutCollaborator(about) {
    const response = await fetch(`${this.apiURL}/collaborators/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ about }),
    });

    const data = await response.json();

    return data;
  }
}
