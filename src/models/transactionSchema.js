const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    amount: {
      type: Number,
    },
    kind: {
      type: String,
      enum: ["deposit", "withdrawal", "payment"],
      default: "deposit",
    },
    referenceID: {
      type: String,
    },
    transaction_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const populateUser = function (next) {
  this.populate("transaction_by", "_id fullName phone email");
  next();
};

TransactionSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
