import {
  GET_USER_DISHES,
  ADD_USER_DISHES,
  DELETE_USER_DISHES,
  GET_ALL_DISHES,
  ADD_USER_DISH_INGREDIENT
} from "../actions/types";
import { apiRequest } from "../utils/api/apiWrapper";
export {
  getUserDishes,
  addUserDishes,
  deleteUserDish,
  getAllDishes,
  addUserDishesIngredient
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
    dispatch({
      type: ADD_USER_DISH_INGREDIENT,
      payload: { id: _id, ingredient }
    });
    // apiRequest(
    //   {
    //     url: "/api/dishes/userdishes",
    //     method: "POST",
    //     data: { dishName, description, file }
    //   },
    //   ADD_USER_DISH_INGREDIENT,
    //   "Added"
    // )
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
