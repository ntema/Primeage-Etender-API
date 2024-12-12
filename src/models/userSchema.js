const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    subscribe: {
      type: String,
    },
    terms: {
      type: Boolean,
    },
    signUpAmount: {
      type: String,
      enum: ["1500", "4000", "11000", "21000", "35000"],
      default: 0,
    },
    order: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("User", userSchema);
// const enumRole= Admin.schema.path('role').enumValues
module.exports = user;
