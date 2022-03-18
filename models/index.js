const User = require('./User');
const Picture = require('./Picture');
const Trip = require('./Trip');
const Itinerary = require('./Itinerary');
const Item = require('./Item');
const UserTrip = require('./UserTrip');

//User has many Trips through UserTrip
User.belongsToMany(Trip, {through: UserTrip, foreignKey: 'user_id'});

//User has many itinerary items
User.hasMany(Picture, {foreignKey: 'user_id'});

//User has many Pictures
User.hasMany(Item, {foreignKey: 'user_id'});

//Trip has many users through UserTrip
Trip.belongsToMany(User, {through: UserTrip, foreignKey: 'trip_id'});

//Trip has one itinerary
Trip.hasOne(Itinerary, {foreignKey: 'trip_id'});

//Trip has many Pictures
Trip.hasMany(Picture, {foreignKey: 'trip_id'});

//Itinerary has many items
Itinerary.hasMany(Item, {foreignKey: 'Itinerary_id', onDelete: 'CASCADE'});

module.exports = { User, Picture, Trip, Itinerary, Item, UserTrip };