const Joi = require("joi");

const Schema = Joi.object({
  email: Joi.string().required(),
  fullName: Joi.string().required(),
  phone: Joi.string()
    .min(11)
    .max(11)
    .regex(/^([+])?(\d+)$/)
    .required(),
  password: Joi.string().required(),
  signUpAmount: Joi.number().required(),
  terms: Joi.boolean().required(),
});

module.exports.registerValidator = Schema;
