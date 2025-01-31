/**
 * @fileoverview Events Class
 * @description Events class to send events requests to the backend.
 */

class Events {
  /**
   * @constructor - Initializes the Event class.
   * @param {Object} app - The App class.
   */
  constructor(app) {
    this.app = app;
    this.baseURL = app.baseURL;
    this.apiURL = app.apiURL;
  }

  /**
   * @function getGroupPhotos - Sends a get group photos request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getGroupPhotos() {
    const response = await fetch(`${this.apiURL}/events/group-photos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function addGroupPhoto - Sends an add group photo request to the backend.
   * @param {Object} photo - The photo to add.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async addGroupPhoto(photo) {
    const response = await fetch(`${this.apiURL}/events/group-photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photo),
    });

    const data = await response.json();

    return data;
  }

  /**
   * @function removeGroupPhoto - Sends a remove group photo request to the backend.
   * @param {number} index - The index of the photo to remove.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async removeGroupPhoto(index) {
    const response = await fetch(
      `${this.apiURL}/events/group-photos/${index}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    return data;
  }
}
