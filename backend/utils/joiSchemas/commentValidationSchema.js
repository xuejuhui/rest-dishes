const Joi = require("joi");

const commentSchema = Joi.object().keys({
  message: Joi.string().required(),
  dishId: Joi.string().required()
});

module.exports = commentSchema;
