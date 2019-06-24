const uuid = require("uuid");
const boom = require("boom");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const awsS3 = require("../utils/awsS3");
const db = require("../models/index");
const image = require("../utils/image");
const validation = require("../utils/joiSchemas/index");
const { compareObjectId } = require("../utils/utils");

/* createDish Route "/userdishes"
  params :
  dishName:String
  description:String
  user_id:ObjectId From MongoDB
  image:buffer
*/
const createDish = (req, res, next) => {
  // Validate req
  validation.dishSchema.validate(
    {
      image: req.file,
      dishName: req.body.dishName,
      description: req.body.description,
      user_id: req.user._id
    },
    async (err, value) => {
      if (err) return next(boom.notFound(err.details[0].message));
      try {
        const file = req.file;
        const imageName = `${uuid()}+${file.originalname}`;
        const resizedImage = await image.formatImage(file.buffer, 400, 400);
        const awsResponse = await awsS3.uploadToS3(
          { ...file, imageName, buffer: resizedImage },
          "dishes-photos-bucket"
        );
        const url = await awsS3.getUrlFromS3(imageName, "dishes-photos-bucket");
        const user = await db.User.findOne({ _id: req.user._id });
        const newDish = new db.Dish({
          dishName: req.body.dishName,
          description: req.body.description,
          user_id: req.user._id
        });
        newDish.image.push(imageName);
        const dishResponse = await newDish.save();
        user.dishes.push(dishResponse._id);
        await user.save();
        res.json({ ...dishResponse._doc, url: [url] });
      } catch (error) {
        console.log(error);
      }
    }
  );
};

const getUserDishes = async (req, res) => {
  try {
    const userDishes = await db.User.findOne(
      { _id: req.user._id },
      { password: 0, resetPasswordExpires: 0, resetPasswordToken: 0 }
    )
      .populate({ path: "dishes", match: { isDeleted: false } })
      .exec();
    const dishesPromise = userDishes["dishes"].map(async dish => {
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

const deleteUserDish = async (req, res, next) => {
  console.log(compareObjectId);
  try {
    const dish = await db.Dish.findOne({ _id: req.body.id });
    if (compareObjectId(dish.user_id._id, req.user._id)) {
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
      .limit(limit)
      .sort({ date: -1 });
    const dishesPromise = dishes.map(async dish => {
      const newDish = { ...dish._doc, url: [], rating: [] };
      const url = await awsS3.getUrlFromS3(
        dish.image[0],
        "dishes-photos-bucket"
      );
      const rating = await db.Rating.find({ dishId: dish._id });
      let averageRating =
        rating.reduce((acc, curr) => curr.rating + acc, 0) / rating.length;
      // newDish.rating = averageRating ? averageRating : 0;
      newDish.rating = rating;
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
    if (compareObjectId(dish.user_id._id, req.user._id)) {
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

const submitRating = async (req, res) => {
  const { dish, rating } = req.body;
  try {
    const newRating = new db.Rating({
      dishId: dish._id,
      user_id: req.user._id,
      rating
    });
    const ratingResponse = await newRating.save();
    res.json(ratingResponse);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createDish,
  getUserDishes,
  deleteUserDish,
  getAllUserDishes,
  getDish,
  createIngredient,
  submitRating
};
