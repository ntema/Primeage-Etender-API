const tenderRoute = require("express").Router();
const upload = require("../config/multer");
const createTenderController = require("../controllers/tenderController/createTenderController");
const getAllTenderController = require("../controllers/tenderController/getAllTenderController");
const userisAuthenticated = require("../middlewares/authMiddleware/userIsAuthenticated")
tenderRoute.post(
  "/create-tender",userisAuthenticated,
  upload.single("image"),
  createTenderController
);

tenderRoute.get("/getAllTenders", getAllTenderController);

module.exports = tenderRoute;
