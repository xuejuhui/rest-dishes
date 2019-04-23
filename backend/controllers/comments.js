const boom = require("boom");

const db = require("../models/index");
const validation = require("../utils/joiSchemas/index");

const getAllComments = async (req, res, next) => {
  try {
    const comments = await db.Comment.find({ dishId: req.params.id });
    res.json(comments);
  } catch (e) {
    return next(e);
  }
};

const postComment = async (req, res, next) => {
  validation.commentSchema.validate(
    { message: req.body.message, dishId: req.body.dishId },
    (err, value) => {
      if (err) {
        return next(boom.notFound(err.details[0].message));
      }
    }
  );
  try {
    const dish = await db.Dish.findById({ _id: req.body.dishId });
    if (dish) {
      const newComment = new db.Comment({
        message: req.body.message,
        dishId: dish._id
      });
      const commentResponse = await newComment.save();
      res.json(commentResponse);
    }
  } catch (e) {
    return next(e);
  }
};

module.exports = { getAllComments, postComment };
