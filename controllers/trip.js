const { Trip, Item, User, UserTrip, Picture } = require("../models");
const { Op } = require("sequelize");
const path = require("path");
const { findAll } = require("../models/User");

// helper function to sort items in kanban
const itemSort = (a, b) => {
  return a.index - b.index;
};

module.exports = {
  // get Trip and render trip page
  getTrip: async (req, res) => {
    try {
      // get trip with id
      let trip = await Trip.findAll({
        where: { id: req.params.id },
        include: [{ model: User, attributes: ["username", "id"] }],
      });

      // reduce results
      trip = trip.map((t) => t.get({ plain: true }));

      const creator = req.session.id === trip[0].creator_id;

      // render trip page -> for now it doesn't exist, uncomment when made
      //res.json(trip);
      res.render("trip", {
        trip_info: trip[0],
        creator,
        logged_in: req.session.logged_in,
      });
    } catch (err) {}
  },

  getAllUserTrips: async (req, res) => {
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

  // delete a trip
  deleteTrip: async (req, res) => {
    try {
      await Trip.destroy({ where: { id: req.body.id } });

      res.status(200).end();
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // render kanban with items
  getKanban: async (req, res) => {
    try {
      // get all items
      let items = await Item.findAll({
        where: { trip_id: req.params.id },
        include: [{ model: User, attributes: ["username"] }],
      });

      // reduce results
      items = items.map((item) => item.get({ plain: true }));

      //empty arrays for each kanban column
      const c1ItemsList = [];
      const c2ItemsList = [];
      const c3ItemsList = [];

      // push each item into appropriate column
      items.forEach((item) => {
        item.column == 1
          ? c1ItemsList.push(item)
          : item.column == 2
          ? c2ItemsList.push(item)
          : c3ItemsList.push(item);
      });

      // sort by index in kanban (item.index)
      c1ItemsList.sort(itemSort);
      c2ItemsList.sort(itemSort);
      c3ItemsList.sort(itemSort);

      //render
      res.render("kanban", {
        c1ItemsList,
        c2ItemsList,
        c3ItemsList,
        style: "kanban",
        logged_in: req.session.logged_in,
        currentUser: req.session.user_id,
      });
    } catch (err) {}
  },

  // add an item to the kanban
  addKanbanItem: async (req, res) => {
    try {
      // create item
      await Item.create({
        user_id: req.session.user_id,
        trip_id: req.params.id,
        info: req.body.content,
        title: req.body.title,
        column: 1,
        index: req.body.index,
      });
      //respond
      res.status(200).end();
    } catch (err) {
      res.status(500).end();
    }
  },

  // delete and item from the kanban
  deleteKanbanItem: async (req, res) => {
    try {
      //find item and get info
      const [item] = await Item.findAll({ where: { id: req.body.target } });
      const { column, index } = item;

      // delete item
      await Item.destroy({ where: { id: req.body.target } });

      // reorder remaining items in column
      const items = await Item.findAll({
        where: { column: column, trip_id: req.params.id },
      });

      // decrease the index of all items with a higher index than the deleted one
      items.forEach((item) => {
        if (item.index > index) {
          Item.update({ index: item.index - 1 }, { where: { id: item.id } });
        }
      });

      //respond
      res.status(200).end();
    } catch (err) {
      res.status(500).end();
    }
  },

  // reorder kanban items -> activated when dragged on client side
  reorderKanbanItem: async (req, res) => {
    // get items from request body -> convert column classes into numbers for database
    let { itemId, newIndex, oldIndex, oldC, newC, currentTrip } = req.body;
    oldC = parseInt(oldC.split("")[1]);
    newC = parseInt(newC.split("")[1]);

    try {
      // update moved item
      await Item.update(
        { index: newIndex, column: newC },
        { where: { id: itemId } }
      );

      const oldColumnItems = await Item.findAll({
        where: { trip_id: currentTrip, column: oldC, id: { [Op.not]: itemId } },
      });
      const newColumnItems = await Item.findAll({
        where: { trip_id: currentTrip, column: newC, id: { [Op.not]: itemId } },
      });

      if (oldC === newC) {
        //update same column of moved item
        oldColumnItems.forEach((item) => {
          if (newIndex < oldIndex) {
            if (item.index >= newIndex && item.index < oldIndex) {
              Item.update(
                { index: item.index + 1 },
                { where: { id: item.id } }
              );
            }
          } else if (newIndex > oldIndex) {
            if (item.index <= newIndex && item.index >= oldIndex) {
              Item.update(
                { index: item.index - 1 },
                { where: { id: item.id } }
              );
            }
          }
        });
      } else {
        //update old column of moved item
        oldColumnItems.forEach((item) => {
          if (item.index > oldIndex) {
            Item.update({ index: item.index - 1 }, { where: { id: item.id } });
          }
        });

        //update new column of moved item
        newColumnItems.forEach((item) => {
          if (item.index >= newIndex) {
            Item.update({ index: item.index + 1 }, { where: { id: item.id } });
          }
        });
      }

      //respond
      res.status(200).end();
    } catch (err) {
      res.status(500).end();
    }
  },

  //--------------------------------- Trip User Controllers ------------------------------------//

  // add user to trip
  addUser: async (req, res) => {
    try {
      const [user] = await User.findAll({ where: { username: req.body.user } });
      const exists = await UserTrip.findAll({
        where: { user_id: user.id, trip_id: req.params.id },
      });

      if (exists.length !== 0) {
        res.status(200).end();
        return;
      }

      await UserTrip.create({ user_id: user.id, trip_id: req.params.id });

      res.status(200).end();
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //remove user from trip
  removeUser: async (req, res) => {
    try {
      await UserTrip.destroy({
        where: { user_id: req.body.user, trip_id: req.params.id },
      });
      res.status(200).end();
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //--------------------------------- Gallery controllers --------------------------------------//
  getGallery: async (req, res) => {
    try {
      let pictures = await Picture.findAll({
        where: { trip_id: req.params.id },
      });

      // reduce results
      pictures = pictures.map((picture) => picture.get({ plain: true }));

      res.render("gallery", { pictures, logged_in: req.session.logged_in });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addImage: async (req, res) => {
    const user = req.session.user_id;
    const trip = req.params.id;
    const filename = req.file.filename;
    const link = `/images/${filename}`;

    try {
      await Picture.create({
        user_id: user,
        trip_id: trip,
        name: filename,
        link: link,
      });

      res.status(200).end();
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteImage: (req, res) => {},
};
