const boom = require("boom");

const db = require("../models/index");
const validation = require("../utils/joiSchemas/index");

const getAllComments = async (req, res, next) => {
  try {
    const comments = await db.Comment.find(
      { dishId: req.params.id, isDeleted: false },
      { isDeleted: 0 }
    );
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

const deleteUserComment = async (req, res, next) => {
  // validation.commentSchema.validate(
  //   { message: req.body.message, dishId: req.body.dishId },
  //   (err, value) => {
  //     if (err) {
  //       return next(boom.notFound(err.details[0].message));
  //     }
  //   }
  // );
  try {
    const comment = await db.Comment.findOne({ _id: req.body.id });
    if (comment.user_id._id == req.user.id) {
      const updateResponse = await db.Comment.updateOne(
        { _id: comment._id },
        {
          $set: {
            isDeleted: true
          }
        }
      );
      res.json({
        id: comment._id,
        message: `Your comment has been deleted!`
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    return next(boom.badRequest("Who are you"));
  }
};

module.exports = { getAllComments, postComment };
