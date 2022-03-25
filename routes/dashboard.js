const express = require('express');
const router = express.Router();
const {} = require('../controllers/dashboard');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const user = req.session.id;
  res.send('respond with a resource');
});

module.exports = router;