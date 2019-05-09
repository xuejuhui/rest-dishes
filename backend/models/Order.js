const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dish: {
    type: Schema.Types.ObjectId,
    ref: "Dish"
  },
  date: {
    type: Date,
    default: Date.now
  },
  completion: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Order", OrderSchema);
