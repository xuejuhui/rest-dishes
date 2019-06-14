const db = require("../models/index");
const boom = require("boom");

const {
  compareObjectId,
  arrayOfObjToObjOfObj,
  toMongoID
} = require("../utils/utils");
// todo validation
const validation = require("../utils/joiSchemas/index");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await db.Order.find()
      .populate({ path: "user", select: "email" })
      .populate({ path: "cart", populate: { path: "dishes.dish" } });
    res.json(orders);
  } catch (e) {
    return next(e);
  }
};
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await db.Dish.find({ user_id: req.user._id });
    const userDishes = orders.map(x => x._id);
    const cartDishes = await db.Cart.find({
      "dishes.dish": { $in: userDishes },
      checkedout: true
    }).populate([
      {
        path: "dishes.dish",
        select: ["image", "_id", "dishName", "description", "user_id", "date"]
      },
      { path: "user_id", select: ["email"] }
    ]);
    res.json({ cartDishes, userDishes });
  } catch (e) {
    return next(e);
  }
};

const postOrder = async (req, res, next) => {
  console.log(req.body);
  validation.orderSchema.validate(
    { cart: req.body.cart },
    async (err, value) => {
      if (err) return next(boom.notFound(err.details[0].message));
      try {
        const userCart = await db.Cart.updateOne(
          { _id: req.body.cart._id },
          { $set: { checkedout: true } }
        );
        const newOrder = new db.Order({
          user: req.user._id,
          cart: req.body.cart._id
        });
        console.log(newOrder);
        const orderResponse = await newOrder.save();
        res.json(orderResponse);
      } catch (e) {
        console.log(e);
        return next(e);
      }
    }
  );
};

const getCartItems = async (req, res, next) => {
  try {
    let dishInCartWithQty;
    let cart = JSON.parse(req.body.cart);
    if (cart) {
      const dishIdArray = Object.keys(cart);
      const dishInCart = await db.Dish.find(
        { _id: { $in: dishIdArray } },
        { isDeleted: 0 }
      );
      dishInCartWithQty = dishInCart.map(cartDish => {
        return { dish: cartDish, qty: cart[cartDish._id] };
      });
    } else {
      const user = await db.User.findOne(
        { _id: req.user._id },
        { password: 0, resetPasswordExpires: 0, resetPasswordToken: 0 }
      ).populate({
        path: "cart",
        match: { checkedout: false },
        populate: { path: "dishes.dish" }
      });
      dishInCartWithQty = user.cart;
      dishInCartWithQty
        ? (dishInCartWithQty = dishInCartWithQty)
        : (dishInCartWithQty = { dishes: [] });
    }
    res.json(dishInCartWithQty);
  } catch (e) {
    return next(e);
  }
};

const addToCart = async (req, res, next) => {
  try {
    let newCartQty;
    const userCart = await db.Cart.findOne({
      user_id: req.user._id,
      checkedout: false
    });
    if (!userCart) {
      const newCart = new db.Cart({
        user_id: req.user._id,
        dishes: [{ dish: [req.body.dish._id], qty: req.body.qty }]
      });
      newCartQty = await newCart.save();
      await db.User.updateOne(
        { _id: req.user._id },
        { $set: { cart: newCartQty._id } }
      );
    } else {
      const exist = userCart.dishes.find(dish => {
        return compareObjectId(dish.dish, req.body.dish._id);
      });
      if (exist) {
        console.log("inside exist");
        userCart.dishes = userCart.dishes.map(dish => {
          if (dish.dish == req.body.dish._id) {
            return { ...dish._doc, qty: dish.qty + req.body.qty };
          }
          return dish;
        });
      } else {
        console.log("first time");
        userCart.dishes.push({ dish: req.body.dish._id, qty: req.body.qty });
      }
      newCartQty = await userCart.save();
    }
    res.json(newCartQty._doc);
  } catch (e) {
    return next(e);
  }
};

const editCart = async (req, res, next) => {
  //todo need to fix might need to fix the whole structure of edit cart
  try {
    let changeRequest = req.body.arrayOfQtyChanges.map(async x => {
      return await db.Cart.updateOne(
        {
          user_id: req.user._id,
          checkedout: false,
          "dishes.dish": x.dish
        },
        { $set: { "dishes.$.qty": x.qty } }
      );
    });
    Promise.all(changeRequest).then(async () => {
      const userCart = await db.Cart.findOne({
        user_id: req.user._id,
        checkedout: false
      }).populate({ path: "dishes.dish" });
      res.json({ message: "Updated", userCart: userCart.dishes });
    });
  } catch (e) {
    return next(e);
  }
};

const changeDishStatus = async (req, res, next) => {
  try {
    const dishStatus = req.body.status;
    const dishId = toMongoID(req.body.dishId);
    const cartId = toMongoID(req.body.orderId);
    const dishStatusResponse = await db.Cart.findOneAndUpdate(
      {
        _id: cartId,
        "dishes._id": dishId
      },
      { $set: { "dishes.$.dishStatus": dishStatus } },
      { new: true, useFindAndModify: false }
    ).populate([
      {
        path: "dishes.dish",
        select: ["image", "_id", "dishName", "description", "user_id", "date"]
      },
      { path: "user_id", select: ["email"] }
    ]);
    res.json(dishStatusResponse);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  changeDishStatus,
  getAllOrders,
  postOrder,
  getCartItems,
  addToCart,
  editCart,
  getUserOrders
};
