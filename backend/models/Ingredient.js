const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  location: String,
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }]
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
