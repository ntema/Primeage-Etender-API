const authRouter = require("express").Router();
const {register} = require("../controllers/authcontroller/registerController");
const {login} = require("../controllers/authcontroller/loginController");
const { changePassword } = require("../controllers/authcontroller/changePassword");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/changepassword", changePassword);

module.exports = authRouter;
