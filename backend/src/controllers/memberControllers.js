/**
 * @fileoverview Member Controllers
 * @description Controllers for members management.
 */

const memberService = require('../services/memberService');

const validationUtils = require('../utils/validationUtils');

/**
 * @function getMembers - Get all members.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getMembers = async (req, res) => {
  try {
    const members = await memberService.getMembers();
    return res.success(members, 'Members retrieved successfully.');
  } catch (error) {
    console.error('Error getting members: ', error);
    return res.internalServerError(
      'Error getting members.',
      'GET_MEMBERS_ERROR',
    );
  }
};

/**
 * @function createMember - Create a member.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createMember = async (req, res) => {
  const {
    name,
    position,
    education,
    area,
    email,
    organization,
    country,
    website,
    photo,
  } = req.body;

  // Check if the name is valid
  if (typeof name !== 'string') {
    return res.badRequest('Invalid name.', 'INVALID_NAME');
  }

  // Check if the position is valid
  if (typeof position !== 'string') {
    return res.badRequest('Invalid position.', 'INVALID_POSITION');
  }

  // Check if the education is valid
  if (typeof education !== 'string') {
    return res.badRequest('Invalid education.', 'INVALID_EDUCATION');
  }

  // Check if the area is valid
  if (typeof area !== 'string') {
    return res.badRequest('Invalid area.', 'INVALID_AREA');
  }

  // Check if the email is valid
  if (!validationUtils.validateEmail(email)) {
    return res.badRequest('Invalid email address.', 'INVALID_EMAIL');
  }

  // Check if the organization is valid
  if (typeof organization !== 'string') {
    return res.badRequest('Invalid organization.', 'INVALID_ORGANIZATION');
  }

  // Check if the country is valid
  if (typeof country !== 'string') {
    return res.badRequest('Invalid country.', 'INVALID_COUNTRY');
  }

  // Check if the website is valid
  if (!validationUtils.validateURL(website)) {
    return res.badRequest('Invalid website.', 'INVALID_WEBSITE');
  }

  // Check if the photo is valid
  if (!validationUtils.validateBase64Image(photo)) {
    return res.badRequest('Invalid photo.', 'INVALID_PHOTO');
  }

  // Create the member
  try {
    const member = await memberService.createMember({
      name,
      position,
      education,
      area,
      email,
      organization,
      country,
      website,
      photo,
    });
    return res.created(member, 'Member created successfully.');
  } catch (error) {
    console.error('Error creating member: ', error);
    return res.internalServerError(
      'Error creating member.',
      'CREATE_MEMBER_ERROR',
    );
  }
};

/**
 * @function updateMember - Update a member.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateMember = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    position,
    education,
    area,
    email,
    organization,
    country,
    website,
    photo,
  } = req.body;

  // Check if the name is valid
  if (typeof name !== 'string') {
    return res.badRequest('Invalid name.', 'INVALID_NAME');
  }

  // Check if the position is valid
  if (typeof position !== 'string') {
    return res.badRequest('Invalid position.', 'INVALID_POSITION');
  }

  // Check if the education is valid
  if (typeof education !== 'string') {
    return res.badRequest('Invalid education.', 'INVALID_EDUCATION');
  }

  // Check if the area is valid
  if (typeof area !== 'string') {
    return res.badRequest('Invalid area.', 'INVALID_AREA');
  }

  // Check if the email is valid
  if (!validationUtils.validateEmail(email)) {
    return res.badRequest('Invalid email address.', 'INVALID_EMAIL');
  }

  // Check if the organization is valid
  if (typeof organization !== 'string') {
    return res.badRequest('Invalid organization.', 'INVALID_ORGANIZATION');
  }

  // Check if the country is valid
  if (typeof country !== 'string') {
    return res.badRequest('Invalid country.', 'INVALID_COUNTRY');
  }

  // Check if the website is valid
  if (!validationUtils.validateURL(website)) {
    return res.badRequest('Invalid website.', 'INVALID_WEBSITE');
  }

  // Check if the photo is valid
  if (!validationUtils.validateBase64Image(photo)) {
    return res.badRequest('Invalid photo.', 'INVALID_PHOTO');
  }

  // Update the member
  try {
    // Check if the member exists
    const memberExists = await memberService.getMemberById(id);
    if (!memberExists) {
      return res.notFound('Member not found.', 'MEMBER_NOT_FOUND');
    }

    // If the member exists, update the member
    const member = await memberService.updateMember(id, {
      name,
      position,
      education,
      area,
      email,
      organization,
      country,
      website,
      photo,
    });
    return res.success(member, 'Member updated successfully.');
  } catch (error) {
    console.error('Error updating member: ', error);
    return res.internalServerError(
      'Error updating member.',
      'UPDATE_MEMBER_ERROR',
    );
  }
};

module.exports = {
  getMembers,
  createMember,
  updateMember,
};
