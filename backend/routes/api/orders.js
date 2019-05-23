const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/orders");

router.get("/orders", orderController.getAllOrders);
//
router.post("/orders", orderController.postOrder);

router.post("/getCartItems", orderController.getCartItems);

router.post("/addtocart", orderController.addToCart);

router.post("/editCart", orderController.editCart);

module.exports = router;
