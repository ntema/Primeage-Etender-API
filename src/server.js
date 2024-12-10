const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = require("./config/constants").PORT;
const cors = require("cors");
const dbConnect = require("./config/dbconnect");
const mongoose = require("mongoose")
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(
  cors({
    origin: "*",
  })
);
app.use(cors(corsOptions));

//middlewares
app.use(express.urlencoded({ limit: "1000000mb", extended: true }));
app.use(express.json({ limit: "1000000mb", extended: true }));

//mongoDB connection
dbConnect();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "We're up and running",
  });
});

//routes
app.use("/api/v1", require("./routes/index"));

app.use((req, res, next) => {
  const error = new Error(" Route Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error instanceof mongoose.CastError) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

app.use((error, req, res, next) => {
  if (res.status(error.status || 500)) {
    if (res.headersSent !== true) {
      return res.json({
        error: {
          status: error.status || 500,
          message: error.message,
        },
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
