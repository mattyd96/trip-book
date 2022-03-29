const { Trip, User, UserTrip } = require("../models");

module.exports = {
  getDash: async (req, res) => {
    try {
      // get all user trip

      let user = await User.findAll({
        where: { id: req.session.user_id },
        include: [{ model: Trip }],
      });

      // reduce results
      const trips = user.map((t) => t.get({ plain: true }));
      // render trip page -> for now it doesn't exist, uncomment when made
      // res.json(trips[0].trips);
      res.render("dashboard", {
        trip_info: trips[0].trips,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
    }
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
