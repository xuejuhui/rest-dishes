const express = require("express");
const router = express.Router();
const multer = require("../../utils/multer");
const jwtTokenMethods = require("../../middlewares/jwtToken");
const dishController = require("../../controllers/dishes");

router.post(
  "/userdishes",
  multer.uploadFile.single("dishPhoto"),
  dishController.createDish
);

router.post("/dish-rating", dishController.submitRating);

router.get("/userdishes", dishController.getUserDishes);

router.delete("/userdishes", dishController.deleteUserDish);

router.get("/alldishes", dishController.getAllUserDishes);

// Unuse route for now
router.get("/dish/:id", jwtTokenMethods.verifyToken, dishController.getDish);

router.post("/dish/ingredient", dishController.createIngredient);

router.get("/testing", dishController.testing);

module.exports = router;
