const { Trip, User } = require("../models");

module.exports = {
  getDash: async (req, res) => {
    try {
      // get all user trip
      let trips = await Trip.findAll({
        where: { creator_id: req.session.user_id },
        include: [{ model: User, attributes: ["username", "id"] }],
      });

      // reduce results
      trips = trips.map((t) => t.get({ plain: true }));

      // render trip page -> for now it doesn't exist, uncomment when made
      res.json(trips);
      //res.render('trips', {trip_info: trips, logged_in: req.session.logged_in});
    } catch (err) {}
  },
  // add a trip
  addTrip: async (req, res) => {
    try {
      //create trip
      await Trip.create({
        creator_id: req.session.user_id,
        name: req.body.name,
      });
      // respond
      res.status(200).end();
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
