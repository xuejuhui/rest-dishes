const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dishId: {
    type: Schema.Types.ObjectId,
    ref: "Dish"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
