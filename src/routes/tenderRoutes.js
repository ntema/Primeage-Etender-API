const tenderRoute = require("express").Router();
const upload = require("../config/multer");
const createTenderController = require("../controllers/tenderController/createTenderController");
const getAllTenderController = require("../controllers/tenderController/getAllTenderController");
const getAllViewedTenderOfAUserController = require("../controllers/tenderController/getAllViewedTenderOfAUserController");
const userisAuthenticated = require("../middlewares/authMiddleware/userIsAuthenticated")
const createViewedTenderOfUserController = require("../controllers/tenderController/createViewedTenderOfUserController");
tenderRoute.post(
  "/create-tender",
  userisAuthenticated,
  upload.single("fileupload"),
  createTenderController
);
tenderRoute.post(
  "/user-viewed-tender",
  userisAuthenticated,
  createViewedTenderOfUserController
);
tenderRoute.get("/getAllTenders", getAllTenderController);
tenderRoute.get(
  "/user-viewed-tender",
  userisAuthenticated,
  getAllViewedTenderOfAUserController
);
module.exports = tenderRoute;
