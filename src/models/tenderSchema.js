const mongoose = require("mongoose");
const tenderSchema = new mongoose.Schema(
  {
    tenderCode: {
      type: String,
      required: true,
      unique:true
    },
    originalMDA: {
      type: String,
      required: true,
    },
    tenderTitle: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["bid-closed", "out-dated", "on-going"],
      default: "on-going",
    },
    fileUpload: {
      type: String,
      required: true,
    },
    tenderPrice: {
      type: String,
    },
    tenderUploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    datePosted: {
      type: String,
      required: true,
    },
    tenderExpirationDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Tender = mongoose.model("Tender", tenderSchema);
module.exports = Tender;
