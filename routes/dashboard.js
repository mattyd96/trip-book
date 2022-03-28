const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboard');

// GET user dashboard -> populate and render
router.get('/', controller.getDash);

module.exports = router;