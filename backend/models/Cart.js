const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dishes: [
    {
      dish: {
        type: Schema.Types.ObjectId,
        ref: "Dish"
      },
      qty: {
        type: Number,
        deffault: 1
      },
      dishCompleted: { type: Boolean, default: false }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  checkedout: { type: Boolean, default: false }
});

module.exports = mongoose.model("Cart", CartSchema);
