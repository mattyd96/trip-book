var express = require('express');
var router = express.Router();
const models = require('../models');
const authMiddleware = require("../middlewares/auth")

/* GET home page. */
router.get('/', authMiddleware.authorize, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
