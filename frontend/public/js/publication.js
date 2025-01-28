/**
 * @fileoverview Publication Class
 * @description Publication class to send publication requests to the backend.
 */

class Publication {
  /**
   * @constructor - Initializes the Publication class.
   * @param {Object} app - The App class.
   */
  constructor(app) {
    this.app = app;
    this.baseURL = app.baseURL;
    this.apiURL = app.apiURL;
  }

  /**
   * @function getPublications - Sends a get publications request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getPublications() {
    const response = await fetch(`${this.apiURL}/publications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function getCrawlStatus - Sends a get crawl status request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getCrawlStatus() {
    const response = await fetch(`${this.apiURL}/publications/crawl-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function requestReCrawl - Sends a request re-crawl request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async requestReCrawl() {
    const response = await fetch(`${this.apiURL}/publications/re-crawl`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }
}
