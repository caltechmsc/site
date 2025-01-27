/**
 * @fileoverview Research Routes
 * @description Routes for research management.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const researchControllers = require('../controllers/researchControllers');

router.use(rateLimiter());

router.get('/', researchControllers.getResearch);

module.exports = router;
