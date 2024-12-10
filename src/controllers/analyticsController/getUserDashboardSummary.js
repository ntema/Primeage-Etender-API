const User = require("../../models/userSchema");
// const Wallet  = require("../../models/walletSchema");
const Tender = require("../../models/tenderSchema");

//Template logic i can follow
const getUserDashboardSummary = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const tender = await Tender.find({
      uploadedBy: _id,
    }).countDocuments();
    const userCount = await User.find({
      bookee: _id
    }).countDocuments();
    const wallet = await Wallet.findOne({
      _id
    }).select("wallet");

    return res.status(200).json({
      status: "success",
      data: { tender, userCount, wallet }
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getUserDashboardSummary;
