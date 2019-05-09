const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/orders");

router.get("/orders", orderController.getAllOrders);
//
router.post("/orders", orderController.postOrder);

module.exports = router;
