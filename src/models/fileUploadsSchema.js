const mongoose = require("mongoose");
const fileUploadSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    media: {
      type: Object,
      select: false,
    },
    imageURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const filesUpload = mongoose.model("FileUpload", fileUploadSchema);
module.exports = filesUpload;
