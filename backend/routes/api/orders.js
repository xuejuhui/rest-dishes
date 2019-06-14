const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/orders");

router.get("/orders", orderController.getAllOrders);

router.get("/userorders", orderController.getUserOrders);
//
router.post("/orders", orderController.postOrder);

router.post("/getCartItems", orderController.getCartItems);

router.post("/addtocart", orderController.addToCart);

router.post("/editCart", orderController.editCart);

router.post("/changeDishStatus", orderController.changeDishStatus);

module.exports = router;
