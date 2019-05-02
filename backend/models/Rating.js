const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dishId: {
    type: Schema.Types.ObjectId,
    ref: "Dish"
  },
  rating: Number
});

module.exports = mongoose.model("Rating", RatingSchema);
