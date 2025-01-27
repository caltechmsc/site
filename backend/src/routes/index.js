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
const collaboratorRoutes = require('./collaboratorRoutes');
const researchRoutes = require('./researchRoutes');
const publicationRoutes = require('./publicationRoutes');

router.use('/auth', authRoutes);
router.use('/admins', adminRoutes);
router.use('/about', aboutRoutes);
router.use('/members', memberRoutes);
router.use('/collaborators', collaboratorRoutes);
router.use('/research', researchRoutes);
router.use('/publications', publicationRoutes);

router.use('*', (req, res) => {
  res.notFound();
});

module.exports = router;
