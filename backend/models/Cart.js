const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  checkedout: { type: Boolean, default: false }
});

module.exports = mongoose.model("Cart", CartSchema);
