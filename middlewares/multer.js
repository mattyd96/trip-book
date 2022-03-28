const multer = require("multer");
const path = require('path');

// multer storage
const storage = multer.diskStorage({
  destination: `${__dirname}/../public/images/`,
  filename: (req, file, cb) => {
    const ranString = Math.random().toString().split('.');
    const filename = `${ranString[1]}${file.originalname}`;
    cb(null, filename);
  }
});

// upload middleware
const uploadImage = multer({storage}).single('photo');

module.exports = { uploadImage };