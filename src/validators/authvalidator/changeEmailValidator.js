const Joi = require("joi");
const Schema = Joi.object({
  oldEmail: Joi.string().email().required(),
  newEmail: Joi.string().email().required(),
  password: Joi.string().required()
});

const changeEmailValidator = Schema;
module.exports = changeEmailValidator
