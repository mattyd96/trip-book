const express = require('express');
const router = express.Router();
const { User } = require("../models");
const controller = require('../controllers/users');

// GET User -> might not use this one
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST user login
router.post('/login', controller.login);

// POST user signup
router.post('/signup', controller.signup);

// POST user logout
router.post('/logout', controller.logout);

module.exports = router;
