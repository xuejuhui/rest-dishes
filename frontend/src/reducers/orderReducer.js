import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  EDIT_CART,
  POST_ORDER
} from "../actions/types";

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
      const qty = Number(action.payload.qty);
      return {
        ...state,
        cartWithProduct: {
          ...state.cartWithProduct,
          [action.payload.dish._id]: {
            ...action.payload.dish,
            qty
          }
        }
      };
    case POST_ORDER:
      return {};
    default:
      return state;
  }
};

export default orderReducer;
