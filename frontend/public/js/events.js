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
   * @function getGroupPhotoIds - Sends a get group photo IDs request to the backend.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getGroupPhotoIds() {
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
   * @function getGroupPhotoById - Sends a get group photo by ID request to the backend.
   * @param {number} id - The ID of the photo to retrieve.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async getGroupPhotoById(id) {
    const response = await fetch(`${this.apiURL}/events/group-photos/${id}`, {
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
   * @param {string} photo - The photo to add (Base64 encoded).
   * @param {string} [date] - The optional date of the photo.
   * @param {string} [description] - The optional description of the photo.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async addGroupPhoto(photo, date = null, description = null) {
    const response = await fetch(`${this.apiURL}/events/group-photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ photo, date, description }),
    });

    const data = await response.json();
    return data;
  }

  /**
   * @function updateGroupPhotoDescription - Sends an update group photo description request to the backend.
   * @param {number} id - The ID of the photo to update.
   * @param {string} description - The new description of the photo.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateGroupPhotoDescription(id, description) {
    const response = await fetch(
      `${this.apiURL}/events/group-photos/${id}/description`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      },
    );

    const data = await response.json();
    return data;
  }

  /**
   * @function updateGroupPhotoDate - Sends an update group photo date request to the backend.
   * @param {number} id - The ID of the photo to update.
   * @param {string} date - The new date of the photo.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async updateGroupPhotoDate(id, date) {
    const response = await fetch(
      `${this.apiURL}/events/group-photos/${id}/date`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      },
    );

    const data = await response.json();
    return data;
  }

  /**
   * @function removeGroupPhoto - Sends a remove group photo request to the backend.
   * @param {number} id - The ID of the photo to remove.
   * @returns {Promise<Object>} - The response from the backend.
   */
  async removeGroupPhoto(id) {
    const response = await fetch(`${this.apiURL}/events/group-photos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  }
}
