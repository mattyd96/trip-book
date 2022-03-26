const express = require('express');
const router = express.Router();
const { renderHome } = require('../controllers/home');
const models = require('../models');

/* GET home page. */
router.get('/', renderHome);



// test route to see if kanban will render correctly
router.get('/kanban', (req, res) => {res.render('kanban', {style: 'kanban'})});

module.exports = router;