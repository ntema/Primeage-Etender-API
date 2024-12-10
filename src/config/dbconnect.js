const mongoose = require("mongoose");
const MONGO_URI  = require("./constants").MONGO_URI;
  const dbConnect = () => {
    const conns = mongoose;
    conns
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("database connected");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  module.exports = dbConnect;
