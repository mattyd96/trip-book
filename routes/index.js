const express = require('express');
const router = express.Router();

// route requires -> require new route files here
const homeRoutes = require('./home');
const userRoutes = require('./users');
const tripRoutes = require('./trip');
const galleryRoutes = require('./galleries');
const dashRoutes = require('./dashboard');

// use routes -> add in new routes here
router.use('/galleries', galleryRoutes); // galleries
router.use('/trips', tripRoutes); // trip pages
router.use('/dashboard', dashRoutes); //user dashboard
router.use('/users', userRoutes); // login logout
router.use('/', homeRoutes); //home page


module.exports = router;
