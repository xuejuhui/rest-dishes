const db = require("../models/index");

// todo validation
// const validation = require("../utils/joiSchemas/index");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await db.Order.find()
      .populate({ path: "user", select: "email" })
      .populate({ path: "dish", select: "dishName" });
    res.json(orders);
  } catch (e) {
    return next(e);
  }
};

const postOrder = async (req, res, next) => {
  try {
    console.log(req.user, req.body);
    const newOrder = new db.Order({
      user: req.user._id,
      dish: req.body.dish._id
    });
    const orderResponse = await newOrder.save();
    res.json(orderResponse);
  } catch (e) {
    return next(e);
  }
};

const getCartItems = async (req, res, next) => {
  try {
    let cart = JSON.parse(req.body.cart);
    const dishIdArray = Object.keys(cart);
    const dishInCart = await db.Dish.find(
      { _id: { $in: dishIdArray } },
      { isDeleted: 0 }
    );
    const dishInCartWithQty = dishInCart.map(cartDish => {
      return { ...cartDish._doc, qty: cart[cartDish._id] };
    });
    res.json(dishInCartWithQty);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getAllOrders,
  postOrder,
  getCartItems
};
