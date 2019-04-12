const express = require("express");
const router = express.Router();
const Dish = require("../../models/Dish");
const User = require("../../models/User");
const jwtTokenMethods = require("../../utils/jwtToken");
const multer = require("multer");

router.post("/userdishes", jwtTokenMethods.verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const newDish = new Dish({
      dishName: req.body.dishName,
      description: req.body.description,
      user_id: req.user.id
    });
    const dishResponse = await newDish.save();
    user.dishes.push(dishResponse._id);
    await user.save();
    console.log(dishResponse);
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
      .populate({ path: "dishes", match: { isDeleted: false } })
      .exec();
    res.json(userDish);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/userdishes", jwtTokenMethods.verifyToken, async (req, res) => {
  try {
    const dish = await Dish.findOne({ _id: req.body.id });
    const updateResponse = await Dish.updateOne(dish, {
      isDeleted: true
    });
    res.json({
      id: dish._id,
      message: `${dish.dishName} has been deleted!`
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/alldishes", async (req, res) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  try {
    const dishes = await Dish.find({ isDeleted: false }, { isDeleted: 0 })
      .populate({
        path: "user_id",
        select: "email"
      })
      .skip(offset)
      .limit(limit);
    res.json(dishes);
  } catch (error) {
    console.log(error);
  }
});

router.get("/dish/:id", async (req, res) => {
  try {
    const dish = await Dish.findOne({ _id: req.params.id }).populate({
      path: "user_id",
      select: "email"
    });

    res.json(dish);
  } catch (error) {
    console.log(error);
  }
});

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = multer({ storage: storage });

router.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  console.log(req);
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

module.exports = router;
