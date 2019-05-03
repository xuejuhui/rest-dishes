import {
  GET_USER_DISHES,
  ADD_USER_DISHES,
  DELETE_USER_DISHES,
  GET_ALL_DISHES,
  ADD_USER_DISH_INGREDIENT,
  GET_DISH,
  SUBMIT_RATING
} from "../actions/types";
import { apiRequest } from "../utils/api/apiWrapper";
export {
  getUserDishes,
  addUserDishes,
  deleteUserDish,
  getAllDishes,
  addUserDishesIngredient,
  getDish,
  submitRating
};

function getUserDishes() {
  return async dispatch => {
    dispatch(
      apiRequest(
        { url: "/api/dishes/userdishes", method: "GET" },
        GET_USER_DISHES,
        "Loaded"
      )
    );
  };
}

function addUserDishesIngredient({ _id }, ingredient) {
  return async dispatch => {
    dispatch(
      apiRequest(
        {
          url: "/api/dishes/dish/ingredient",
          method: "POST",
          data: { dishId: _id, ...ingredient }
        },
        ADD_USER_DISH_INGREDIENT,
        "Added"
      )
    );
  };
}

function getDish(id) {
  return async dispatch => {
    dispatch({
      type: GET_DISH,
      payload: id
    });
  };
}
function addUserDishes(fd) {
  return async dispatch => {
    dispatch(
      apiRequest(
        {
          url: "/api/dishes/userdishes",
          method: "POST",
          data: fd
        },
        ADD_USER_DISHES,
        "Added"
      )
    );
  };
}

function deleteUserDish(id) {
  return async dispatch => {
    dispatch(
      apiRequest(
        {
          url: "/api/dishes/userdishes",
          method: "DELETE",
          data: { id }
        },
        DELETE_USER_DISHES,
        "Deleted"
      )
    );
  };
}

function getAllDishes(offset, limit) {
  return async dispatch => {
    dispatch(
      apiRequest(
        {
          url: `/api/dishes/alldishes?offset=${offset}&limit=${limit}`,
          method: "GET"
        },
        GET_ALL_DISHES,
        "Loaded More"
      )
    );
  };
}

function submitRating(rate, dish) {
  return async dispatch => {
    dispatch(
      apiRequest(
        {
          url: `/api/dishes/dish-rating`,
          method: "POST",
          data: { rating: rate, dish }
        },
        SUBMIT_RATING,
        "Reviwed"
      )
    );
  };
}
