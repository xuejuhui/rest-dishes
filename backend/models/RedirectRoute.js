const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RedirectRouteSchema = new Schema({
  redirectFrom: String,
  redirectTo: String
});

module.exports = mongoose.model("RedirectRoute", RedirectRouteSchema);
