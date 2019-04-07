const express = require("express");
const router = express.Router();
const Dish = require("../../models/Dish");
const User = require("../../models/User");
const jwtTokenMethods = require("../../utils/jwtToken");

router.post("/dish", jwtTokenMethods.verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const newDish = new Dish({
      dishName: req.body.dishName,
      description: req.body.description
    });
    const dishResponse = await newDish.save();
    user.dishes.push(dishResponse._id);
    await user.save();
    res.json(dishResponse);
  } catch (error) {
    console.log(error);
  }
});

router.get("/userdishes", jwtTokenMethods.verifyToken, async (req, res) => {
  try {
    const userDish = await User.findOne(
      { _id: req.user.id },
      { password: 0, resetPasswordExpires: 0, resetPasswordToken: 0 }
    )
      .populate("dishes")
      .exec();
    res.json(userDish);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
