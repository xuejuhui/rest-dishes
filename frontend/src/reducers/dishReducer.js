import {
  GET_USER_DISHES,
  ADD_USER_DISHES,
  DELETE_USER_DISHES,
  GET_ALL_DISHES,
  ADD_USER_DISH_INGREDIENT,
  GET_DISH
} from "../actions/types";

const initialState = {
  userName: null,
  dishes: {},
  hasMore: true,
  dish: {}
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
      return {
        ...state,
        dishes: {
          ...state.dishes,
          [action.payload._id]: {
            ...action.payload,
            user_id: { _id: action.payload.user_id }
          }
        }
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
      const dish = state.dishes[action.payload.dishId];
      return {
        ...state,
        dishes: {
          ...state.dishes,
          [action.payload.dishId]: {
            ...dish,
            ingredient: [...dish.ingredient, action.payload]
          }
        },
        dish: {
          ...dish,
          ingredient: [...dish.ingredient, action.payload]
        }
      };
    case GET_DISH:
      return { ...state, dish: state.dishes[action.payload] };
    default:
      return state;
  }
};

export default dishReducer;
