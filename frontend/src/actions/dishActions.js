import { GET_USER_DISHES, ADD_USER_DISHES } from "../actions/types";
import { apiRequest } from "../utils/api/apiWrapper";
export { getUserDishes, addUserDishes };

function getUserDishes() {
  return async dispatch => {
    apiRequest(
      { url: "/api/dishes/userdishes", method: "GET" },
      GET_USER_DISHES,
      "Loaded"
    )(dispatch);
  };
}

function addUserDishes({ dishName, description }) {
  return async dispatch => {
    apiRequest(
      {
        url: "/api/dishes/userdishes",
        method: "POST",
        data: { dishName, description }
      },
      ADD_USER_DISHES,
      "Added"
    )(dispatch);
  };
}
