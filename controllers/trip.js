const {Trip, Item, User} = require('../models');
const { Op } = require('sequelize');

const itemSort = (a, b) => {
  return a.index - b.index;
}

module.exports = {
  getTrip: async (req,res) => {
    try{
      // get trip with id
      let trip = await Trip.findAll({where: {id: req.params.id}});

      // reduce results
      trip = trip.map((t) => t.get({ plain: true }));

      // render trip page -> for now it doesn't exist, uncomment when made
      //res.render('trip', {trip_info: trip[0]});
    } catch (err) {}
  },
  addTrip: (req,res) => {},
  deleteTrip: (req,res) => {},
  getKanban: async (req,res) => {
    try {
      let items = await Item.findAll({
        where: {trip_id: req.params.id},
        include: [{ model: User, attributes: ['username']}]
      });

      //console.log(items);

      // reduce results
      items = items.map((item) => item.get({ plain: true }));

      //empty arrays for each kanban column
      const c1ItemsList = [];
      const c2ItemsList = [];
      const c3ItemsList = [];

      // push each item into appropriate column
      items.forEach(item => {
        item.column == 1 ? c1ItemsList.push(item) :
        item.column == 2 ? c2ItemsList.push(item) :
        c3ItemsList.push(item);
      });

      // sort by index in kanban (item.index)
      c1ItemsList.sort(itemSort);
      c2ItemsList.sort(itemSort);
      c3ItemsList.sort(itemSort);

      console.log(c1ItemsList);

      //render
      res.render('kanban', {c1ItemsList, c2ItemsList, c3ItemsList, style: 'kanban'});
      //res.json({c1ItemsList, c2ItemsList, c3ItemsList});

    } catch (err) {}
  },
  addKanbanItem: (req,res) => {},
  deleteKanbanItem: (req,res) => {},
  reorderKanbanItem: async (req,res) => {
    let {itemId, newIndex, oldIndex, oldC, newC, currentTrip} = req.body;
    oldC = parseInt(oldC.split('')[1]);
    newC = parseInt(newC.split('')[1]);
  
    try {
      // update moved item
      await Item.update(
        { index: newIndex, column: newC },
        { where: {id: itemId} }
      );

      //update old column of moved item
      const oldColumnItems = await Item.findAll({where: { trip_id: currentTrip, column: oldC }});
      oldColumnItems.forEach(item => {
        if(item.index > oldIndex) {
          Item.update(
            { index: item.index - 1},
            { where: {id: item.id} }
          );
        }
      });

      //update old column of moved item
      const newColumnItems = await Item.findAll({where: { trip_id: currentTrip, column: newC, id: {[Op.not]: itemId} }});
      newColumnItems.forEach(item => {
        if(item.index >= newIndex) {
          Item.update(
            { index: item.index + 1},
            { where: {id: item.id} }
          );
        }
      });
      
      //respond
      res.status(200).end();
    } catch (err) {
      res.status(500).end();
    }
  },
  getGallery: (req,res) => {},
  addImage: (req,res) => {},
  deleteImage: (req,res) => {},
}