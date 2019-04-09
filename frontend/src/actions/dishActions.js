import {
  GET_USER_DISHES,
  ADD_USER_DISHES,
  DELETE_USER_DISHES
} from "../actions/types";
import { apiRequest } from "../utils/api/apiWrapper";
export { getUserDishes, addUserDishes, deleteUserDish };

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

function addUserDishes({ dishName, description }) {
  return async dispatch => {
    dispatch(
      apiRequest(
        {
          url: "/api/dishes/userdishes",
          method: "POST",
          data: { dishName, description }
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
