const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  dishName: {
    type: String,
    required: true
  },
  description: String,
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

module.exports = mongoose.model("Dish", DishSchema);
