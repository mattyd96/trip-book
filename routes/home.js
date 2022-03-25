const express = require('express');
const router = express.Router();
const { renderHome } = require('../controllers/home');
const models = require('../models');
const { userAuth, userAuthFetch } = require("../middlewares/auth")

/* GET home page. */
router.get('/', userAuth, renderHome);



// test route to see if kanban will render correctly
router.get('/kanban', (req, res) => {res.render('kanban', {style: 'kanban'})});

module.exports = router;