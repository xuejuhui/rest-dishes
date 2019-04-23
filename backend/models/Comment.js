const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  dishId: {
    type: Schema.Types.ObjectId,
    ref: "Dish"
  },
  message: {
    type: String,
    required: true
  },
  likes: [],
  isDeleted: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
