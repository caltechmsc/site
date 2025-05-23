/**
 * @fileoverview Member Routes
 * @description Routes for members management.
 */

const express = require('express');
const router = express.Router();

const rateLimiter = require('../utils/rateLimiter');

const memberControllers = require('../controllers/memberControllers');

router.use(rateLimiter());

router.get('/', memberControllers.getMembers);

router.post('/', memberControllers.createMember);

router.put('/:id', memberControllers.updateMember);

router.delete('/:id', memberControllers.deleteMember);

module.exports = router;
