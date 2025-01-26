/**
 * @fileoverview Routes Index
 * @description Index file for routes.
 */

const express = require('express');
const router = express.Router();

router.use('*', (req, res) => {
  res.notFound();
});

module.exports = router;
