const Joi = require("joi");

const Schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports.loginValidator = Schema;
