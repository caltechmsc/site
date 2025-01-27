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

router.get('/crawl-status', publicationControllers.getCrawlStatus);
router.post('/re-crawl', publicationControllers.reCrawl);

module.exports = router;
