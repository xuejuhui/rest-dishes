import axios from "axios";
import { GET_USER_DISHES, ADD_USER_DISHES } from "../actions/types";
import { enqueueSnackbar } from "./alertActions";
export { getUserDishes };

function getUserDishes() {
  return async dispatch => {
    try {
      const getDishesResponse = await axios.get(
        "http://localhost:5000/api/dishes/userdishes"
      );
      dispatch({
        type: GET_USER_DISHES,
        payload: getDishesResponse.data
      });
      dispatch(
        enqueueSnackbar({ message: "Good", options: { variant: "success" } })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
