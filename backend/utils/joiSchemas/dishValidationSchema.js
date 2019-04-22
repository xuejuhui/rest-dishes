const Joi = require("joi");

const dishSchema = Joi.object().keys({
  dishName: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.any().required(),
  user_id: Joi.string().required()
});

module.exports = dishSchema;
