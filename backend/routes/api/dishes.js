const express = require("express");
const router = express.Router();
const multer = require("../../utils/multer");
const jwtTokenMethods = require("../../middlewares/jwtToken");
const dishController = require("../../controllers/dishes");

router.post(
  "/userdishes",
  jwtTokenMethods.verifyToken,
  multer.uploadFile.single("dishPhoto"),
  dishController.createDish
);

router.get(
  "/userdishes",
  jwtTokenMethods.verifyToken,
  dishController.getUserDishes
);

router.delete(
  "/userdishes",
  jwtTokenMethods.verifyToken,
  dishController.deleteUserDish
);

router.get(
  "/alldishes",
  jwtTokenMethods.verifyToken,
  dishController.getAllUserDishes
);

// Unuse route for now
router.get("/dish/:id", jwtTokenMethods.verifyToken, dishController.getDish);

router.post(
  "/dish/ingredient",
  jwtTokenMethods.verifyToken,
  dishController.createIngredient
);

module.exports = router;
