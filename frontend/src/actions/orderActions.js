import { POST_ORDER, ADD_TO_CART, GET_CART_ITEMS } from "../actions/types";
import { apiRequest } from "../utils/api/apiWrapper";

export { postOrder, addToCart, getCartItems };

function postOrder(order) {
  return dispatch => {
    dispatch(
      apiRequest(
        {
          url: `/api/orders/orders`,
          method: "POST",
          data: order
        },
        POST_ORDER,
        "Your Order has been Added"
      )
    );
  };
}

function addToCart(dish, qty) {
  return dispatch => {
    const shoppingCart = JSON.parse(localStorage.getItem("cart"));
    if (shoppingCart) {
      shoppingCart[dish._id]
        ? (shoppingCart[dish._id] = shoppingCart[dish._id] + qty)
        : (shoppingCart[dish._id] = 0 + qty);
      localStorage.setItem("cart", JSON.stringify(shoppingCart));
    } else {
      localStorage.setItem("cart", JSON.stringify({ [dish._id]: 0 + qty }));
    }
    dispatch({ type: ADD_TO_CART, payload: { dish, qty } });
  };
}

function getCartItems() {
  return dispatch => {
    dispatch(
      apiRequest(
        {
          url: `/api/orders/getCartItems`,
          method: "POST",
          data: { cart: localStorage.getItem("cart") }
        },
        GET_CART_ITEMS,
        "Get Cart Items"
      )
    );
  };
}
