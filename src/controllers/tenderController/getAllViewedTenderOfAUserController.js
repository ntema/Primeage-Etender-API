const AccessedTender = require("../../models/accessedTenderSchema");
const getAllViewedTenderOfAUserController = async (req, res, next) => {
  try {
    /*
    let { limit = 1, page = 1 } = req.query;
    page = page || 1;
    const skip = page ? (page - 1) * limit : 0;
    let option = { accessedBy: req.user._id };

    const count = await AccessedTender.find({ accessedBy: req.user._id })
      .sort({ updatedAt: -1 })
      .countDocuments();
    // const pages = count>0?Math.ceil(count / limit)?Math.ceil(count / limit): 1;
    let pages = 0;
    if (count > 0) {
      if (limit) {
        pages = Math.ceil(count / limit);
      } else {
        pages = 1;
      }
    }

    const result = {};
    limit = limit - 0;

    if (page * 1 < pages) {
      result.next = { limit, page: page * 1 + 1 };
    }
    if (page * 1 <= pages && page - 1 != 0) {
      result.previous = { limit, page: page - 1 };
    }

    */
    const count = await AccessedTender.find({})
      .sort({ updatedAt: -1 })
      .countDocuments();

    const limitValue = req.query.limit || 2;
    const skipValue = req.query.skip || 0;

    const tender = await AccessedTender.find({ accessedBy: req.user._id })
      .limit(limitValue)
      .populate("tender")
      .populate("accessedBy", "fullName phone email")
      .skip(skipValue);
    return res
      .status(200)
      .json({ status: "success", data: { count, page: skipValue, viewedTender: tender } });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllViewedTenderOfAUserController;
