const Joi = require('joi');

const Schema = Joi.object({
  tenderCode: Joi.string().required(),
  originalMDA: Joi.string().required(),
  tenderTitle: Joi.string().required(),
  tenderPrice: Joi.string().required(),
  datePosted: Joi.string().required(),
  tenderExpirationDate: Joi.string().required(),
});
const tenderValidator = Schema;
module.exports = tenderValidator;