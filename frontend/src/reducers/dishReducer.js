import { GET_USER_DISHES, ADD_USER_DISHES } from "../actions/types";

const initialState = {
  userName: null,
  dishes: {}
};

const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DISHES:
      const result = action.payload.dishes.reduce((acc, dish) => {
        acc[dish._id] = dish;
        return acc;
      }, {});
      return {
        ...state,
        userName: action.payload.name,
        dishes: result
      };
    case ADD_USER_DISHES:
      console.log(action);
      return {
        ...state,
        dishes: {}
      };
    default:
      return state;
  }
};

export default dishReducer;
