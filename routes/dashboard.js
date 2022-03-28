const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboard');
const { userAuth, userAutheFetch } = require('../middlewares/auth');

// GET user dashboard -> populate and render
router.get('/', userAuth, controller.getDash);

module.exports = router;