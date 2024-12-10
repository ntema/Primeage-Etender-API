const {
  registerValidator,
} = require("../../validators/authvalidator/registerValidator");
const authservices = require("../../services/authservices/authservice");
const bcrypt = require("bcryptjs");
const { Wallet } = require("../../models/walletSchema");
const jwt = require("jsonwebtoken");
const {
  TOKEN_SECRET,
  TOKEN_EXPIRATION_TIME,
} = require("../../config/constants");

module.exports.register = async (req, res, next) => {
  try {
    const { error, value } = registerValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }
    const isUser = await authservices.getuserbyemail({ email: value.email });
    if (isUser) {
      return res.status(400).json({
        error: { status: "fail", message: "email already exists" },
      });
    }
    value.password = await bcrypt.hash(value.password, 12);
    if (value.terms === false) {
      return res.status(400).json({
        status: "error",
        data: {
          message: "please read and agree to the terms and condition",
        },
      });
    }
    const user = await authservices.registeruser(value);
    if (user) {
      const createWallet = new Wallet({
        walletAmount: value.signupAmount,
        owned_by: user._id,
      });
      const newUserWallet = await createWallet.save();
      const token = jwt.sign({ _id: user._id, role: user.role }, TOKEN_SECRET, {
        expiresIn: TOKEN_EXPIRATION_TIME,
      });
      return res.status(200).json({
        status: "success",
        data: { user, newUserWallet, token },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//wallet creation with flutterwave
/*
    const my_data = JSON.stringify({
      account_name: user.firstName + " " + user.lastName,
      email: user.email,
      mobilenumber: user.phone,
      country: "NG",
    });
    var config = {
      method: "post",
      url: "https://api.flutterwave.com/v3/payout-subaccounts",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mySecretKey}`,
      },
      data: my_data,
    };
    const response = await axios(config);
    console.log("create wallet", response.data.data);
    if (response.data.data) {
      const wallet_data = {
        id: response.data.data.id,
        account_reference: response.data.data.account_reference,
        account_name: response.data.data.account_name,
        barter_id: response.data.data.barter_id,
        email: response.data.data.email,
        mobilenumber: response.data.data.mobilenumber,
        country: "NG",
        nuban: response.data.data.nuban,
        bank_name: response.data.data.bank_name,
        bank_code: response.data.data.bank_code,
        status: response.data.data.status,
        amount: "0",
      };
      const createWallet = await Wallet.create(wallet_data);
    }
      */
//end of wallet creation
