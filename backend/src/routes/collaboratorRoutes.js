/**
 * @fileoverview Collaborator Routes
 * @description Routes for collaborators management.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const collaboratorControllers = require('../controllers/collaboratorControllers');

router.use(rateLimiter());

router.get('/about', collaboratorControllers.getAbout);
router.put('/about', collaboratorControllers.updateAbout);

router.get('/', collaboratorControllers.getCollaborators);
router.post('/', collaboratorControllers.createCollaborator);
router.put('/:id', collaboratorControllers.updateCollaborator);
router.delete('/:id', collaboratorControllers.deleteCollaborator);

module.exports = router;
