const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  dishName: {
    type: String,
    required: true
  },
  description: String
});

module.exports = mongoose.model("Dish", DishSchema);
