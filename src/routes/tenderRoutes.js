const tenderRoute = require("express").Router();
const {upload} = require("../config/multer");
const createTenderController = require("../controllers/tenderController/createTenderController");
const getAllTenderController = require("../controllers/tenderController/getAllTenderController");
const getAllTenderOfAUserController = require("../controllers/tenderController/getAllTenderOfAUserController");
const userisAuthenticated = require("../middlewares/authMiddleware/userIsAuthenticated")
const userAccessedTenderController = require('../controllers/tenderController/userAccessedTenderController')
tenderRoute.post(
  "/create-tender",userisAuthenticated,
  upload.single("image"),
  createTenderController
);
tenderRoute.post("/user-access-tender",userisAuthenticated, userAccessedTenderController);
tenderRoute.get("/getAllTenders", getAllTenderController);
tenderRoute.get(
  "/user-access-tender",
  userisAuthenticated,
  getAllTenderOfAUserController
);
module.exports = tenderRoute;
