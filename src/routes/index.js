const indexRouter = require("express").Router();
const authRouter = require("./authRoutes");
const paymentRouter = require("./paymentRoutes");
const tenderRoute = require("./tenderRoutes");
const uploadRouter = require('./uploadRoutes')

indexRouter.use("/auth", authRouter);
indexRouter.use("/files", uploadRouter);
indexRouter.use("/paystack",paymentRouter);
indexRouter.use("/tender", tenderRoute);

module.exports = indexRouter;
