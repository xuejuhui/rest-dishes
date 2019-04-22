const boom = require("boom");

const db = require("../models/index");
const validation = require("../utils/joiSchemas/index");

const getAllComments = async (req, res, next) => {
  try {
    // const dish = await db.Dish.findById({ _id: req.params.id });
    const comments = await db.Comment.find({ dishId: req.params.id });
    res.json(comments);
  } catch (e) {
    return next(e);
  }
};

module.exports = { getAllComments };
