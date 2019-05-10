import { ADD_TO_CART } from "../actions/types";

const initialState = {
  cart: {},
  orders: {},
  order: {}
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
    default:
      return state;
  }
};

export default orderReducer;
