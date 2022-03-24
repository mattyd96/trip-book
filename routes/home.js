var express = require('express');
var router = express.Router();
const { renderHome } = require('../controllers/index');
const models = require('../models');
const authMiddleware = require("../middlewares/auth")

/* GET home page. */
router.get('/', /*authMiddleware.authorize,*/ renderHome);



// test route to see if kanban will render correctly
router.get('/kanban', (req, res) => {res.render('kanban', {style: 'kanban'})});

module.exports = router;