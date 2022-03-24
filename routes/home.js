var express = require('express');
var router = express.Router();
const { renderHome } = require('../controllers/index');
const models = require('../models');
const authMiddleware = require("../middlewares/auth")

/* GET home page. */
router.get('/', /*authMiddleware.authorize,*/ renderHome);

module.exports = router;