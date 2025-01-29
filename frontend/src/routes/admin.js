/**
 * @fileoverview Admin Routes
 * @description Admin routes.
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('pages/admin/dashboard');
});

router.get('/login', (req, res) => {
  return res.render('pages/admin/login', {
    redirect: req.query.redirect,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
  });
});

router.get('/logout', (req, res) => {
  return res.render('pages/admin/logout');
});

module.exports = router;
