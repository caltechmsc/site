/**
 * @fileoverview Auth Routes
 * @description Routes for user authentication.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const authControllers = require('../controllers/authControllers');

const RATE_LIMIT_MAX_15 = 15;
const RATE_LIMIT_WINDOW_1_HOUR = 3600000; // 1 hour (60 * 60 * 1000)

router.use(rateLimiter(RATE_LIMIT_MAX_15, RATE_LIMIT_WINDOW_1_HOUR));

router.post('/login', authControllers.loginAdmin);

module.exports = router;
