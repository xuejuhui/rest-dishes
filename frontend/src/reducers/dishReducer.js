import {
  GET_USER_DISHES,
  ADD_USER_DISHES,
  DELETE_USER_DISHES,
  GET_ALL_DISHES,
  ADD_USER_DISH_INGREDIENT
} from "../actions/types";

const initialState = {
  userName: null,
  dishes: {},
  hasMore: true
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
      console.log(action.payload);
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
    case GET_ALL_DISHES:
      const allDishesResponse = action.payload.reduce((acc, dish) => {
        acc[dish._id] = dish;
        return acc;
      }, {});
      return {
        ...state,
        dishes: { ...state.dishes, ...allDishesResponse },
        hasMore: action.payload.length === 0 ? false : true
      };
    case ADD_USER_DISH_INGREDIENT:
      console.log(action.payload);
      const dish = state.dishes[action.payload.id];
      return {
        ...state,
        dishes: {
          ...state.dishes,
          [action.payload.id]: {
            ...dish,
            ingredient: [...dish.ingredient, action.payload.ingredient]
          }
        }
      };
    default:
      return state;
  }
};

export default dishReducer;
