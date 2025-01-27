/**
 * @fileoverview Collaborator Routes
 * @description Routes for collaborators management.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const collaboratorControllers = require('../controllers/collaboratorControllers');

router.use(rateLimiter());

router.get('/', collaboratorControllers.getCollaborators);
router.post('/', collaboratorControllers.createCollaborator);

module.exports = router;
