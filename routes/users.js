const express = require('express');
const router = express.Router();
const { User } = require("../models")
const uuid = require("uuid")
const {} = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST user login */
router.post('/login', async function (req, res, next) {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username: username } })
  if (!user) {
      // If the username isn't present, return an HTTP unauthorized code
      res.status(401).end()
      return
  }

  if (!user.checkPassword(password)) {
      res.status(401).end()
      return
  }

  const sessionToken = uuid.v4()
  const now = new Date()
  const expiresAt = new Date(+now + 3600 * 1000)

  res.cookie("session_token", sessionToken, { expires: expiresAt })

  res.send('logged in successfully');
});

module.exports = router;
