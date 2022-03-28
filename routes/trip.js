const express = require("express");
const router = express.Router();
const controller = require("../controllers/trip");
const {
  userAuth,
  userAuthFetch,
  tripAuth,
  tripAuthFetch,
} = require("../middlewares/auth");
const { uploadImage } = require("../middlewares/multer");

/* GET all trips and render page */
router.get("/", userAuth, controller.getAllUserTrips);

//-------------------------- Trip routes -------------------//
// GET a single trip
router.get("/:id", controller.getTrip);

// POST add a trip
router.post("/add", controller.addTrip);

// DELETE a trip
router.delete("/delete", controller.deleteTrip);

//----------------------- Trip User routes -----------------//

router.post("/:id/add", userAuth, tripAuth, controller.addUser);

router.delete("/:id/remove", userAuth, tripAuth, controller.removeUser);

//------------------------- kanban routes ------------------//
// GET Kanban of trip
router.get("/:id/kanban", userAuth, tripAuth, controller.getKanban);

// POST add item to kanban
router.post(
  "/:id/kanban/add",
  userAuthFetch,
  tripAuthFetch,
  controller.addKanbanItem
);

// DELETE delete item from kanban
router.delete(
  "/:id/kanban/delete",
  userAuthFetch,
  tripAuthFetch,
  controller.deleteKanbanItem
);

// PUT reorder items in kanban
router.put(
  "/:id/kanban/reorder",
  userAuthFetch,
  tripAuthFetch,
  controller.reorderKanbanItem
);

//------------------------ Gallery routes ------------------//
// GET Gallery of trip
router.get("/:id/gallery", userAuth, tripAuth, controller.getGallery);

// POST add picture to gallery
router.post(
  "/:id/gallery",
  userAuth,
  tripAuth,
  uploadImage,
  controller.addImage
);

// DELETE delete picture from gallery
router.delete(":id/gallery", userAuth, tripAuth, controller.deleteImage);

module.exports = router;
