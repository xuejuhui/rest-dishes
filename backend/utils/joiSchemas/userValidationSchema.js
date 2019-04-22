const Joi = require("joi");

const userSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  userName: Joi.string()
    .alphanum()
    .min(3)
    .required(),
  password: Joi.string()
    .required()
    .min(3)
});

module.exports = userSchema;
