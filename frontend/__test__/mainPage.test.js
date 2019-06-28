import React from "react";
import DishCard from "components/MainDishPage/DishCard/DishCard";
import { shallow } from "../enzyme";
// import { createShallow } from "@material-ui/core/test-utils";

test("renders without crashing", () => {
  let cardInfo = {
    avgRating: NaN,
    date: "2019-06-24T16:37:41.428Z",
    description: "bad meat",
    dishName: "good meat",
    image: ["a265bea5-a9df-44fd-a166-0adadf8ce303+puppies.jpg"],
    ingredient: [],
    rating: [],
    url: [
      "https://dishes-photos-bucket.s3.amazonaws.com/a265…61736109&Signature=QId4qjAQHB4l3f169z3hawegMYg%3D"
    ],
    user_id: { _id: "5cc8ab3915986b68a1a31710", email: "jay@jay.com" },
    __v: 0,
    _id: "5d10fc55e564a801f8458818"
  };
  // let addUserDishesIngredient;
  // let creator;
  // let handleOpenComments;
  // let handleDeleteUserDish;
  // let hanldleSubmitRating;
  // let user;
  // let handleAddToCart;
  const dishCard = shallow(<DishCard dish={cardInfo} />);
  expect("dish" in dishCard.props()).toEqual(true);
  // console.log(dishCard.debug());
  // expect(dishCard.find(".DishCard-main-1")).toEqual("John");
});
