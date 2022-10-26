const Joi = require('joi');
const { emailRegexp, passRegexp } = require('../helpers');

const registerSchema = Joi.object({
  password: Joi.string().pattern(passRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = { registerSchema, loginSchema };
