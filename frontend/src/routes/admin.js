/**
 * @fileoverview Admin Routes
 * @description Admin routes.
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('pages/admin/dashboard');
});

router.get('/administrators', (req, res) => {
  return res.render('pages/admin/administrators');
});

router.get('/about/wag', (req, res) => {
  return res.render('pages/admin/about-wag');
});

router.get('/about/msc', (req, res) => {
  return res.render('pages/admin/about-msc');
});

router.get('/members', (req, res) => {
  return res.render('pages/admin/members');
});

router.get('/collaborators', (req, res) => {
  return res.render('pages/admin/collaborators');
});

router.get('/collaborators/about', (req, res) => {
  return res.render('pages/admin/collaborators-about');
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
