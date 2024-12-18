const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema(
  {
    owned_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    walletAmount: {
      type: Number,
      default:0
    },
  },
  {
    timestamps: true,
  }
);

const populateUser = function (next) {
  this.populate("owned_by", "_id fullName phone email"),
  next();
};

walletSchema
  .pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser)
  .pre("findById", populateUser);

module.exports.Wallet = mongoose.model("Wallet", walletSchema);
