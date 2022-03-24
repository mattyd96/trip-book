var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const user = req.session.id;
  res.send('respond with a resource');
});

module.exports = router;