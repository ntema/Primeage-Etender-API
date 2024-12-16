const multer = require("multer");
const path = require("path");

//file storage
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//file upload
const upload = multer({ storage: storage });

module.exports = upload;

