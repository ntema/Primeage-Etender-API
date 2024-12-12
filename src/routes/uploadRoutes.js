const uploadRouter = require('express').Router();
const cloudinary  = require("../config/cloudinaryConfig");
const upload = require('../config/multer');

uploadRouter.post('/upload',upload.single("image"),(req, res) => {
    cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          success: false,
          message: "Error",
        });
      }
      res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result,
      });
    });
})

module.exports = uploadRouter;