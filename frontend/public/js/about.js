/**
 * @fileoverview About Class
 * @description About class to send about requests to the backend.
 */

class About {
  /**
   * @constructor - Initializes the About class.
   * @param {Object} app - The App class.
   */
  constructor(app) {
    this.app = app;
    this.baseURL = app.baseURL;
    this.apiURL = app.apiURL;
  }

  /**
   * @function getAboutWag - Sends a get about wag request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getAboutWag() {
    const response = await fetch(`${this.apiURL}/about/wag`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function getWagCv - Sends a get wag cv request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getWagCv() {
    const response = await fetch(`${this.apiURL}/about/wag/cv`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function getAboutMsc - Sends a get about msc request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getAboutMsc() {
    const response = await fetch(`${this.apiURL}/about/msc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function updateWagBio - Sends an update wag bio request to the backend.
   * @param {string} bio - The new bio of wag.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateWagBio(bio) {
    const response = await fetch(`${this.apiURL}/about/wag/bio`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio }),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function updateWagAbout - Sends an update wag about request to the backend.
   * @param {string} about - The new about of wag.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateWagAbout(about) {
    const response = await fetch(`${this.apiURL}/about/wag/about`, {
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
   * @function updateWagCv - Sends an update wag cv request to the backend.
   * @param {string} cv - The new cv of wag.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateWagCv(cv) {
    const response = await fetch(`${this.apiURL}/about/wag/cv`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cv }),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function updateWagPhoto - Sends an update wag photo request to the backend.
   * @param {string} photo - The new photo of wag.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateWagPhoto(photo) {
    const response = await fetch(`${this.apiURL}/about/wag/photo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ photo }),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function updateMsc - Sends an update msc about request to the backend.
   * @param {string} about - The new about of msc.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateMsc(about) {
    const response = await fetch(`${this.apiURL}/about/msc`, {
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
