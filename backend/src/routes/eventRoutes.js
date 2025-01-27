/**
 * @fileoverview Event Routes
 * @description Routes for events management.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const eventControllers = require('../controllers/eventControllers');

router.use(rateLimiter());

router.get('/group-photos', eventControllers.getGroupPhotos);

router.post('/group-photos', eventControllers.addGroupPhoto);
router.delete('/group-photos/:index', eventControllers.removeGroupPhoto);

module.exports = router;
