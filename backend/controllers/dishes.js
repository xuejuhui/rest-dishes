const uuid = require("uuid");
const boom = require("boom");

const awsS3 = require("../utils/awsS3");
const db = require("../models/index");

const image = require("../utils/image");

const createDish = async (req, res) => {
  const file = req.file;
  const imageName = `${uuid()}+${file.originalname}`;
  try {
    const resizedImage = await image.formatImage(file.buffer, 400, 400);
    const awsResponse = await awsS3.uploadToS3(
      { ...file, imageName: imageName, buffer: resizedImage },
      "dishes-photos-bucket"
    );
    const url = await awsS3.getUrlFromS3(imageName, "dishes-photos-bucket");
    const user = await db.User.findOne({ _id: req.user.id });
    const newDish = new db.Dish({
      dishName: req.body.dishName,
      description: req.body.description,
      user_id: req.user.id
    });
    newDish.image.push(imageName);
    const dishResponse = await newDish.save();
    user.dishes.push(dishResponse._id);
    await user.save();
    res.json({ ...dishResponse._doc, url: [url] });
  } catch (error) {
    console.log(error);
  }
};

const getUserDishes = async (req, res) => {
  try {
    const userDish = await db.User.findOne(
      { _id: req.user.id },
      { password: 0, resetPasswordExpires: 0, resetPasswordToken: 0 }
    )
      .populate({ path: "dishes", match: { isDeleted: false } })
      .exec();
    res.json(userDish);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserDish = async (req, res, next) => {
  try {
    const dish = await db.Dish.findOne({ _id: req.body.id });
    if (dish.user_id._id == req.user.id) {
      const updateResponse = await db.Dish.updateOne(
        { _id: req.body.id },
        {
          $set: {
            isDeleted: true
          }
        }
      );
      res.json({
        id: dish._id,
        message: `${dish.dishName} has been deleted!`
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    return next(boom.badRequest("Who are you"));
  }
};

const getAllUserDishes = async (req, res) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  try {
    const dishes = await db.Dish.find({ isDeleted: false }, { isDeleted: 0 })
      .populate({
        path: "user_id",
        select: "email"
      })
      .populate({
        path: "ingredient",
        select: ["name", "location"]
      })
      .skip(offset)
      .limit(limit);
    const dishesPromise = dishes.map(async dish => {
      const newDish = { ...dish._doc, url: [] };
      const url = await awsS3.getUrlFromS3(
        dish.image[0],
        "dishes-photos-bucket"
      );
      newDish.url.push(url);
      return newDish;
    });
    let dishesWithImage = await Promise.all(dishesPromise);
    res.json(dishesWithImage);
  } catch (error) {
    console.log(error);
  }
};

const getDish = async (req, res) => {
  try {
    const dish = await db.Dish.findOne({ _id: req.params.id })
      .populate({
        path: "user_id",
        select: "email"
      })
      .populate({
        path: "ingredient",
        select: ["name", "location"]
      });
    res.json(dish);
  } catch (error) {
    console.log(error);
  }
};

const createIngredient = async (req, res, next) => {
  try {
    const dish = await db.Dish.findOne({ _id: req.body.dishId });
    if (dish.user_id._id == req.user.id) {
      const newIngredient = new db.Ingredient({
        name: req.body.ingredientName,
        location: req.body.ingredientLocation
      });
      let ingredientResponse = await newIngredient.save();
      dish.ingredient.push(ingredientResponse._id);
      await dish.save();
      ingredientResponse.dishes.push(dish._id);
      ingredientResponse = await ingredientResponse.save();
      res.json({ ...ingredientResponse._doc, dishId: dish._id });
    } else {
      throw new Error();
    }
  } catch (e) {
    return next(boom.badRequest("Who are you"));
  }
};

module.exports = {
  createDish,
  getUserDishes,
  deleteUserDish,
  getAllUserDishes,
  getDish,
  createIngredient
};