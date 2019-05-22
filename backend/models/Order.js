const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart"
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
