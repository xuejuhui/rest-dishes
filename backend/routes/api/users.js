const express = require("express");
const router = express.Router();

const userController = require("../../controllers/users");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/forgotpassword", userController.forgotpassword);

router.get("/reset/:token", userController.checkToken);

router.put("/reset/:token", userController.resetToken);

module.exports = router;
