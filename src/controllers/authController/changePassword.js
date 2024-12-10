const {
  changePasswordValidator,
} = require("../../validators/authvalidator/changePasswordValidator");
const authservices = require("../../services/authservices/authservice");
const bcrypt = require("bcryptjs");

module.exports.changePassword = async (req, res, next) => {
  try {
    const { error, value } = changePasswordValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }
    let user = req.user;
    const isPassword = await bcrypt.compare(value.oldPassword, user.password);
    if (!isPassword) {
      return res.status(400).json({
        error: { status: "fail", message: "Invalid password" },
      });
    }
    if (value.newPassword !== value.confirmNewPassword) {
      return res.status(400).json({
        error: {
          status: "fail",
          message: "New password and 'Confirm New Password must match'",
        },
      });
    }
    const password = await bcrypt.hash(value.newPassword, 12);
    await authservices.finduserandupdate({ _id: user._id }, { password });
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
