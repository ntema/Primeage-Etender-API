const authRouter = require("express").Router();
const {register} = require("../controllers/authController/registerController");
const {login} = require("../controllers/authController/loginController");
const { changePassword } = require("../controllers/authController/changePassword");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/changepassword", changePassword);

module.exports = authRouter;
