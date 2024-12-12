const userAccessedTenderValidator = require("../../validators/tenderValidator/userAccessedTenderValidator")
const AccessedTender = require("../../models/accessedTenderSchema") 
const createViewedTenderOfUserController = async (req, res, next) => {
  try {
    const { error, value } = userAccessedTenderValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }
    const { _id: accessedBy } = req.user;
    console.log("accessedby", accessedBy)
    const body = { tender: value.tenderId, accessedBy };
    console.log(body)
    const accessedTender = await AccessedTender.create(body);
    return res.status(200).json({
      status: "success",
      data: accessedTender,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = createViewedTenderOfUserController;
