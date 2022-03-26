const { userTrip, UserTrip } = require('../models');
const { Op } = require('sequelize');

// general redirect on server side
const userAuth = (req, res, next) => {
    console.log(`hi: ${req.session.logged_in}`);
    req.session.logged_in ? next() : res.status(302).redirect('/');
};
// general redirect message for fetch request response -> redirect initiated on client side
const userAuthFetch = (req, res, next) => {
    console.log(`hi: ${req.session.logged_in}`);
    req.session.logged_in ? next() : res.status(302).end();
};

// auth to see if user has access to trip
const tripAuth = async (req, res, next) => {
    const validation = await UserTrip.findAll({where: {[Op.and]: [{trip_id: req.params.id}, {user_id: req.session.id}]}});
    validation.length !== 0 ? next() : res.status(302).redirect('/dashboard');
};

// auth to see if user has acces to trip for fetch requests
const tripAuthFetch = async (req, res, next) => {
    const validation =  await UserTrip.findAll({where: {[Op.and]: [{trip_id: req.params.id}, {user_id: req.session.id}]}});
    validation.length !== 0 ? next() : res.status(302).end();
};


module.exports = { userAuth, userAuthFetch, tripAuth, tripAuthFetch };