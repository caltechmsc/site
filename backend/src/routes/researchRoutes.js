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
router.get('/about', researchControllers.getResearchAbout);
router.get('/:id', researchControllers.getResearchDetails);

router.put('/', researchControllers.updateResearch);
router.put('/about', researchControllers.updateResearchAbout);

module.exports = router;
