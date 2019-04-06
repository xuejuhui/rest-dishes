const express = require("express");
const router = express.Router();
const Dish = require("../../models/Dish");
const jwtTokenMethods = require("../../utils/jwtToken");

router.post("/dish", jwtTokenMethods.verifyToken, async (req, res) => {
  console.log("hi");
  // const { dishName, description } = req.body;
  // const newDish()
});

module.exports = router;
