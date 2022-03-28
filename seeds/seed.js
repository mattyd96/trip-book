const sequelize = require('../config/connection');
const { User, Trip, UserTrip, Item } = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const userTripData = require('./userTripData.json');
const itemData = require('./itemData.json');

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

  await Item.bulkCreate(itemData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();