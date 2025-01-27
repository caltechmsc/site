/**
 * @fileoverview Routes Index
 * @description Index file for routes.
 */

const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const aboutRoutes = require('./aboutRoutes');
const memberRoutes = require('./memberRoutes');

router.use('/auth', authRoutes);
router.use('/admins', adminRoutes);
router.use('/about', aboutRoutes);
router.use('/members', memberRoutes);

router.use('*', (req, res) => {
  res.notFound();
});

module.exports = router;
