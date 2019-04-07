import { GET_USER_DISHES, ADD_USER_DISHES } from "../actions/types";

const initialState = {
  userName: null,
  dishes: []
};

const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DISHES:
      return {
        ...state,
        userName: action.payload.name,
        dishes: action.payload.dishes
      };
    // case ADD_USER_DISHES:
    //   console.log(action);
    default:
      return state;
  }
};

export default dishReducer;
