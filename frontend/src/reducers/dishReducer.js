import {
  GET_USER_DISHES,
  ADD_USER_DISHES,
  DELETE_USER_DISHES
} from "../actions/types";

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
        dishes: { ...state.dishes, [action.payload._id]: action.payload }
      };
    case DELETE_USER_DISHES:
      const id = action.payload.id;
      const { [id]: value, ...remainDishes } = state.dishes;
      return {
        ...state,
        dishes: remainDishes
      };
    default:
      return state;
  }
};

export default dishReducer;
