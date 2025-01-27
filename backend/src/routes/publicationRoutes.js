/**
 * @fileoverview Publication Routes
 * @description Routes for papers list management.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const publicationControllers = require('../controllers/publicationControllers');

router.use(rateLimiter());

router.get('/', publicationControllers.getPublications);

module.exports = router;
