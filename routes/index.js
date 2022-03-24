var express = require('express');
var router = express.Router();

// route requires -> require new route files here
const homeRoutes = require('./home');
const userRoutes = require('./users');
const tripRoutes = require('./trip');
const galleryRoutes = require('./galleries');

// use routes -> add in new routes here
router.use('/galleries', galleryRoutes);
router.use('/trips', tripRoutes);
router.use('/users', userRoutes);
router.use('/', homeRoutes);


module.exports = router;
