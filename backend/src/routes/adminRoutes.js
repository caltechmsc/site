/**
 * @fileoverview Admin Routes
 * @description Routes for admin management.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const adminControllers = require('../controllers/adminControllers');

router.use(rateLimiter());

router.get('/', adminControllers.getAdmins);

router.post('/', adminControllers.createAdmin);

module.exports = router;
