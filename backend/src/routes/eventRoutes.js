/**
 * @fileoverview Event Routes
 * @description Routes for events management.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const eventControllers = require('../controllers/eventControllers');

router.use(rateLimiter());

router.get('/group-photos', eventControllers.getGroupPhotoIds);
router.get('/group-photos/:id', eventControllers.getGroupPhotoById);

router.post('/group-photos', eventControllers.addGroupPhoto);

router.put('/group-photos/:id/description', eventControllers.updateGroupPhotoDescription);
router.put('/group-photos/:id/date', eventControllers.updateGroupPhotoDate);

router.delete('/group-photos/:id', eventControllers.removeGroupPhoto);

module.exports = router;
