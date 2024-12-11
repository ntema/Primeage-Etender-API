const Joi = require("joi");

const Schema = Joi.object({
  tenderId: Joi.string().required(),
});
const userAccessedTenderValidator = Schema;
module.exports = userAccessedTenderValidator;
