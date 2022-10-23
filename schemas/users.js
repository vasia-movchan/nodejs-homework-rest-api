const Joi = require('joi');
const { emailRegexp } = require('../helpers');

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

// const updateStatusSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

module.exports = { registerSchema };
