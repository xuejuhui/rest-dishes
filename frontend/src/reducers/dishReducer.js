import {
  GET_USER_DISHES,
  ADD_USER_DISHES,
  DELETE_USER_DISHES,
  GET_ALL_DISHES,
  ADD_USER_DISH_INGREDIENT,
  GET_DISH,
  SUBMIT_RATING
} from "actions/types";

const initialState = {
  userName: null,
  dishes: {},
  hasMore: true,
  dish: {},
  userDishes: {}
};
// todo Need to fix this reducer, very messy maybe need to fix backend to response with better dataset
const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DISHES:
      const result = action.payload.reduce((acc, dish) => {
        acc[dish._id] = dish;
        return acc;
      }, {});
      return {
        ...state,
        userName: action.payload.name,
        userDishes: result
      };
    case ADD_USER_DISHES:
      return {
        ...state,
        dishes: {
          [action.payload._id]: {
            ...action.payload,
            user_id: { _id: action.payload.user_id }
          },
          ...state.dishes
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
      console.log(action.payload.length);
      const allDishesResponse = action.payload.reduce((acc, dish) => {
        let format = {
          ...dish,
          avgRating:
            dish.rating.reduce((acc, curr) => curr.rating + acc, 0) /
            dish.rating.length
        };
        acc[dish._id] = format;
        return acc;
      }, {});
      return {
        ...state,
        dishes: { ...allDishesResponse, ...state.dishes },
        hasMore: action.payload.length < 10 ? false : true
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
      return {
        ...state,
        dish: {
          ...state.dishes[action.payload],
          rating: state.dishes[action.payload].rating
            ? state.dishes[action.payload].rating
            : [],
          avgRating: state.dishes[action.payload].rating
            ? state.dishes[action.payload].rating.reduce(
                (acc, curr) => curr.rating + acc,
                0
              ) / state.dishes[action.payload].rating.length
            : 0
        }
      };
    case SUBMIT_RATING:
      const dishRating = { ...state.dishes[action.payload.dishId] };
      return {
        ...state,
        dishes: {
          ...state.dishes,
          [action.payload.dishId]: {
            ...dishRating,
            rating: [...dishRating.rating, action.payload],
            avgRating:
              [...dishRating.rating, action.payload].reduce(
                (acc, curr) => curr.rating + acc,
                0
              ) / [...dishRating.rating, action.payload].length
          }
        },
        dish: {
          ...dishRating,
          rating: [...dishRating.rating, action.payload],
          avgRating:
            [...dishRating.rating, action.payload].reduce(
              (acc, curr) => curr.rating + acc,
              0
            ) / [...dishRating.rating, action.payload].length
        }
      };
    default:
      return state;
  }
};

export default dishReducer;
