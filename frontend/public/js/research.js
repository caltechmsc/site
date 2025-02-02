/**
 * @fileoverview Research Class
 * @description Research class to send research requests to the backend.
 */

class Research {
  /**
   * @constructor - Initializes the Research class.
   * @param {Object} app - The App class.
   */
  constructor(app) {
    this.app = app;
    this.baseURL = app.baseURL;
    this.apiURL = app.apiURL;
  }

  /**
   * @function getResearchAbout - Sends a get research about request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getResearchAbout() {
    const response = await fetch(`${this.apiURL}/research/about`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function getResearchAreas - Sends a get research areas request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getResearchAreas() {
    const response = await fetch(`${this.apiURL}/research`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function getResearchAreaDetails - Sends a get research area details request to the backend.
   * @param {string} id - The research area ID.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getResearchAreaDetails(id) {
    const response = await fetch(`${this.apiURL}/research/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function updateResearchAbout - Sends an update research about request to the backend.
   * @param {Object} about - The research about to update.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateResearchAbout(about) {
    const response = await fetch(`${this.apiURL}/research/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ about }),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function updateResearchAreas - Sends an update research areas request to the backend.
   * @param {Object} areas - The research areas to update.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateResearchAreas(areas) {
    const response = await fetch(`${this.apiURL}/research`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ areas }),
    });

    const data = await response.json();

    return data;
  }
}
