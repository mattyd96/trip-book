const sequelize = require('../config/connection');
const { User, Trip, UserTrip, Itinerary } = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const userTripData = require('./userTripData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Trip.bulkCreate(tripData, {
    individualHooks: true,
    returning: true,
  });

  await UserTrip.bulkCreate(userTripData, {
    individualHooks: true,
    returning: true,
  });

  // await Itinerary.bulkCreate(ItineraryData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedDatabase();