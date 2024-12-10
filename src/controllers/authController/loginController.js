const authservices = require("../../services/authservices/authservice");
const {
  loginValidator,
} = require("../../validators/authvalidator/loginValidator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  TOKEN_SECRET,
  TOKEN_EXPIRATION_TIME,
} = require("../../config/constants");
const { Wallet } = require("../../models/walletSchema");

module.exports.login = async (req, res, next) => {
  try {
    const { error, value } = loginValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }
    const user = await authservices.getUserByEmail({ email: value.email });
    // await authservices.getuserbyemail({ email: value.email }).select("+password");
    if (!user) {
      return res.status(400).json({
        error: {
          status: "error",
          message: "Invalid credentials",
        },
      });
    }
    const isPassword = await bcrypt.compare(value.password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        error: {
          status: "error",
          message: "Invalid credentials",
        },
      });
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRATION_TIME,
    });
    const id = user.id;

    const userWallet = await Wallet.findOne({ owned_by: id });
    console.log(userWallet);
    return res.status(200).json({
      ststus: "success",
      data: { user, token, userWallet },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
