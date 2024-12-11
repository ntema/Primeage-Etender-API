const mongoose = require("mongoose");
const accessedTenderSchema = new mongoose.Schema(
  {
    tender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tender",
    },
    accessedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);
const AccessedTender = mongoose.model("AccessedTender", accessedTenderSchema);
module.exports = AccessedTender;
