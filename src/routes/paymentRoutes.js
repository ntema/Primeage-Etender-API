const paymentRouter = require("express").Router();
const Transaction = require("../models/transactionSchema.js");
const User = require("../models/userSchema.js");
const _ = require("lodash");
const { Wallet } = require("../models/walletSchema.js");
const userIsAuthenticated = require("../middlewares/authMiddleware/userIsAuthenticated.js");
const { initializePayment, verifyPayment } = require("../config/paystack.js")();

paymentRouter.post(
  "/transaction/initialize",
  userIsAuthenticated,
  async (req, res) => {
    const isUser = await User.findById({ _id: req.user._id });
    if (!isUser) {
      return res.status(400).json({
        message: "Invalid user, please login",
      });
    }
    const { body } = req;
    let personObject = {
      full_name: isUser.fullName,
      email:isUser.email,
      amount: body.amount
    }

    /*
    const data = _.pick(body, ["full_name", "amount", "email"]);
    data.amount *= 100;
    data.metadata = {
      full_name: data.full_name,
    };
    */
   personObject.amount *= 100
   personObject.metadata = {
    full_name:personObject.full_name
   }
    try {
      const response_body = await initializePayment(personObject);
      res.status(200).json(response_body.data);
      return res.redirect(response_body.data.authorization_url);
    } catch (error) {
      res.status(400).json({ error: { message: error.response || error } });
    }
  }
);

paymentRouter.get(
  "/paystack/callback",
  userIsAuthenticated,
  async (req, res) => {
    const isUser = await User.findById({ _id: req.user._id });
    console.log(isUser);
    if (!isUser) {
      return res.status(400).json({
        message: "Invalid user, please login",
      });
    }
    const reference = req.query.reference;
    try {
      const response_body = await verifyPayment(reference);
      console.log("got here first: ", response_body.data.data.reference);
      console.log("got here first: ", response_body.data.data.amount);
      console.log("got here first: ", response_body.data.data.customer.email);
      console.log(
        "got here first: ",
        response_body.data.data.metadata.full_name
      );

      let data = _.at(response_body.data.data, [
        "reference",
        "amount",
        "customer.email",
        "metadata.full_name",
      ]);

      // data = [reference, amount, email, full_name];

      newTransact = {
        referenceID: data[0],
        amount: data[1],
        transaction_by: req.user._id,
        kind: "deposit",
      };

      const transaction = new Transaction(newTransact);
      const transaction_response = await transaction.save();
      console.log("id type1", typeof transaction_response._id.toString());
      console.log("transaction_response1", transaction_response)

      transaction_response._id = transaction_response._id.toHexString();

      const amount = transaction_response.amount / 100;

      const wallet = await Wallet.findOneAndUpdate(
        { _id: req.user._id },
        { $inc: { walletAmount: amount } },
        { new: true }
      );
      res.status(200).json({
        success: { message: response_body.data.data },
        redirect_url: `https://primeage-etender-api.onrender.com/api/v1/paystack/receipt/${transaction_response.referenceID}`,
      });

      /*
      if (!transaction_response) {
        res.status(400).json({
          error: {
            message:
              "an error occurred verifying your request. Please try again",
          },
        });
      } else {
        if (transaction_response && transaction_response.status === "success") {
          console.log("ref_1 ", reference);
          console.log("ref_2 ", transaction_response.referenceID);
          await Wallet.findOneAndUpdate(
            { _id: req.user.id },
            { $inc: { amount: amount } },
            { new: true }
          );
        } else {
          return res.status(400).json({
            error: { message: "unverified transaction" },
            redirect_url: `https://node-api-0i99.onrender.com/api/v1/transaction/paystack/callback?reference=${reference}`,
          });
        }
        res.status(200).json({
          success: { message: response_body.data },
          redirect_url: `https://node-api-0i99.onrender.com/api/v1/transaction/receipt/${transaction._id}`,
        });
      }
      */
    } catch (error) {
      res.status(400).json({ error: { message: error.message } });
    }
  }
);

paymentRouter.get("/receipt/",userIsAuthenticated, async (req, res) => {
  try {
    const isUser = await User.findById({ _id: req.user._id });
    if (!isUser) {
      return res.status(400).json({
        message: "Invalid user, please login",
      });
    }
    const id = req.query.reference;
    const transaction = await Transaction.findOne({ referenceID: id });
    if (!transaction) {
      res.status(400).json({ error: { message: "transaction not found" } });
    }
    return res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

module.exports = paymentRouter;
