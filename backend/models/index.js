const mongoose = require("mongoose");
const config = require("config");
const db = config.get("app.dbConfig.host");
console.log(`currently using this ${db}`);
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
module.exports.Comment = require("./Comment.js");
module.exports.Rating = require("./Rating.js");
module.exports.Order = require("./Order.js");
module.exports.Cart = require("./Cart.js");
