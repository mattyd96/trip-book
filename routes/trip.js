const express = require('express');
const router = express.Router();
const controller = require('../controllers/trip');
const { userAuth, userAuthFetch } = require("../middlewares/auth");

/* GET all trips and render page */
router.get('/', function(req, res, next) {
  const user = req.session.id;
  res.send('respond with a resource');
});

//-------------------------- Trip routes -------------------//
// GET a single trip
router.get('/:id', controller.getTrip);

// POST add a trip
router.post('/add', controller.addTrip);

// DELETE a trip
router.delete('/:id/delete', controller.deleteTrip);

//------------------------- kanban routes ------------------//
// GET Kanban of trip
router.get('/:id/kanban', controller.getKanban);

// POST add item to kanban
router.post('/:id/kanban/add', controller.addKanbanItem);

// DELETE delete item from kanban
router.delete('/:id/kanban/delete', controller.deleteKanbanItem);

// PUT reorder items in kanban 
router.put('/:id/kanban/reorder', controller.reorderKanbanItem);

//------------------------ Gallery routes ------------------//
// GET Gallery of trip
router.get('/:id/gallery', controller.getGallery);

// POST add picture to gallery
router.post('/:id/gallery/add', controller.addImage);

// DELETE delete picture from gallery
router.delete(':id/gallery/delete', controller.deleteImage);



module.exports = router;