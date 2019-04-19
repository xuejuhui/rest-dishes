const mongoose = require("mongoose");
const db = require("../config/key").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

module.exports.Dish = require("./Dish.js");
module.exports.User = require("./User.js");
module.exports.Ingredient = require("./Ingredient.js");
