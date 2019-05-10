import { ADD_TO_CART, GET_CART_ITEMS } from "../actions/types";

const initialState = {
  cart: {},
  orders: {},
  order: {},
  cartWithProduct: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.dish._id]: state.cart[action.payload.dish._id]
            ? (state.cart[action.payload.dish._id] += action.payload.qty)
            : action.payload.qty
        }
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartWithProduct: action.payload
      };
    default:
      return state;
  }
};

export default orderReducer;
