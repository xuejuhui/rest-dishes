const Joi = require("joi");

const orderSchema = Joi.object().keys({
  cart: Joi.object({
    _id: Joi.string().required()
  })
    .pattern(/./, Joi.any())
    .required()
});

module.exports = orderSchema;
