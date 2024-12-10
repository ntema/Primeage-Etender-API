const joi = require("joi");

const schema = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
  confirmNewPassword: joi.string().required(),
});

module.exports.changePasswordValidator = schema;
