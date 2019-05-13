import { ADD_TO_CART, GET_CART_ITEMS, EDIT_CART } from "../actions/types";

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
      const resultObject = action.payload.reduce((acc, curr) => {
        acc[curr._id] = curr;
        return acc;
      }, {});
      return {
        ...state,
        cartWithProduct: resultObject
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
    default:
      return state;
  }
};

export default orderReducer;
