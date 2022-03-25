var express = require('express');
var router = express.Router();
const controller = require('../controllers/trip');

/* GET all trips and render page */
router.get('/', function(req, res, next) {
  const user = req.session.id;
  res.send('respond with a resource');
});

//-------------------------- Trip routes -------------------//
// GET a single trip
router.get('/:id', );

// POST add a trip
router.post('/add',);

// DELETE a trip
router.delete('/:id/delete',);

//------------------------- kanban routes ------------------//
// GET Kanban of trip
router.get('/:id/kanban',);

// POST add item to kanban
router.post('/:id/kanban/add',);

// DELETE delete item from kanban
router.delete('/:id/kanban/delete',);

// PUT reorder items in kanban 
router.put('/:id/kanban/reorder',);

//------------------------ Gallery routes ------------------//
// GET Gallery of trip
router.get('/:id/gallery',);

// POST add picture to gallery
router.post('/:id/gallery/add',);

// DELETE delete picture from gallery
router.delete(':id/gallery/delete',);



module.exports = router;