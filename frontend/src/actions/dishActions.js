import { GET_USER_DISHES, ADD_USER_DISHES } from "../actions/types";
import { enqueueSnackbar } from "./alertActions";
import apiClient from '../utils/api/apiClient';
export { getUserDishes, addUserDishes };


function getUserDishes() {
  return async dispatch => {
    try {
      const getDishesResponse = await apiClient.get(
        "/api/dishes/userdishes"
      );
      dispatch({
        type: GET_USER_DISHES,
        payload: getDishesResponse.data
      });
      dispatch(
        enqueueSnackbar({ message: "Loaded", options: { variant: "success" } })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

function addUserDishes({dishName, description}) {
  return async dispatch => {
    try {
      const addDishesResponse = await apiClient.post(
        "/api/dishes/userdishes",
        {dishName,description}
      );
      dispatch({
        type: ADD_USER_DISHES,
        payload: addDishesResponse.data
      });
      dispatch(
        enqueueSnackbar({ message: "added", options: { variant: "success" } })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
