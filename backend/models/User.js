const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model("User", UserSchema);
