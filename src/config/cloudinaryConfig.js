const cloudinary = require("cloudinary").v2;
const constants  = require("./constants");

cloudinary.config({
  CLOUD_NAME: constants.CLOUD_NAME,
  API_KEY: constants.API_KEY,
  API_SECRET: constants.API_SECRET,
});

module.exports = cloudinary;
