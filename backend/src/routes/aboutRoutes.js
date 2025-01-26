/**
 * @fileoverview About Routes
 * @description Routes for the about pages.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const aboutControllers = require('../controllers/aboutControllers');

router.use(rateLimiter());

router.get('/wag', aboutControllers.getWag);
router.get('/wag/cv', aboutControllers.getWagCv);
router.get('/msc', aboutControllers.getMsc);

module.exports = router;
