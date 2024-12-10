const paymentRouter = require("express").Router();
const  Transaction  = require("../models/transactionSchema.js");
const _ = require("lodash");
const { initializePayment, verifyPayment } = require("../config/paystack.js")();


paymentRouter.post("/transaction/initialize", async (req, res) => {
  const { body } = req;
  const data = _.pick(body, ["full_name", "amount", "email"]);
  data.amount *= 100;
  data.metadata = {
    full_name: data.full_name,
  };
  try {
    const response_body = await initializePayment(data);
    res.status(200).json(response_body.data);
    return res.redirect(response_body.data.authorization_url);
  } catch (error) {
    res.status(400).json({ error: { message: error.response || error } });
  }
});

paymentRouter.get("/paystack/callback", async (req, res) => {
  const reference = req.query.reference;
  console.log("ref_id: ", reference);
  try {
    const response_body = await verifyPayment(reference);
    console.log("res_body: ", response_body);
    const data = _.at(response_body.data, [
      "reference",
      "amount",
      "customer.email",
      "metadata.full_name",
    ]);
    [reference, amount, email, full_name] = data;
    newTransact = { referenceID: reference, amount, transaction_by:req.user.id, kind:"deposit" };
    const transaction = new Transaction(newTransact);
    const transaction_response = await transaction.save();
    if (!transaction_response) {
      res.status(400).json({
        error: {
          message: "an error occurred verifying your request. Please try again",
        },
      });
    } else {
      if (
        transaction_response &&
        transaction_response.status === "success"
      ) {
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
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

paymentRouter.get("/receipt/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.findById({ id });
    if (!transaction) {
      res.status(400).json({ error: { message: "transaction not found" } });
    }
    return res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

module.exports = paymentRouter