import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  EDIT_CART,
  POST_ORDER,
  GET_ORDER_ITEMS
} from "actions/types";

const initialState = {
  cart: {},
  orders: {},
  order: {},
  cartWithProduct: {}
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const dishesObject = action.payload.dishes.reduce((acc, curr) => {
        acc[curr._id] = curr;
        return acc;
      }, {});
      return {
        ...state,
        cart: { ...action.payload, dishes: dishesObject }
      };
    case GET_CART_ITEMS:
      const resultObject = action.payload.dishes.reduce((acc, curr) => {
        acc[curr._id] = curr;
        return acc;
      }, {});
      return {
        ...state,
        cartWithProduct: resultObject,
        cart: { ...action.payload, dishes: resultObject }
      };
    case EDIT_CART:
      const userCartObject = action.payload.userCart.reduce((acc, curr) => {
        acc[curr._id] = curr;
        return acc;
      }, {});
      console.log(state.cartWithProduct, userCartObject);
      return {
        ...state,
        cartWithProduct: userCartObject
      };
    case POST_ORDER:
      return {};
    case GET_ORDER_ITEMS:
      const ordersObject = action.payload.cartDishes.reduce((acc, curr) => {
        const currentObj = {
          ...curr,
          dishes: curr.dishes.filter(dish => {
            return action.payload.userDishes.includes(dish.dish._id);
          })
        };
        acc[curr._id] = currentObj;
        return acc;
      }, {});
      return {
        ...state,
        orders: ordersObject
      };
    default:
      return state;
  }
};

export default orderReducer;
