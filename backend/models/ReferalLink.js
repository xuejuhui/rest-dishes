const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RerferalLinkSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  link: String,
  token: String,
  userCount: { type: Number, default: 0 },
  userArray: [],
  timeLeft: Date,
  currentPrice: Number
});

module.exports = mongoose.model("RerferalLink", RerferalLinkSchema);
