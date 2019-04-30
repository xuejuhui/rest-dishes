const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/forgotpassword", authController.forgotpassword);

router.get("/reset/:token", authController.checkToken);

router.put("/reset/:token", authController.resetToken);

module.exports = router;
