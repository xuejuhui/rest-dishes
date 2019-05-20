import {
  POST_ORDER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  EDIT_CART
} from "../actions/types";
import { apiRequest } from "../utils/api/apiWrapper";

export { postOrder, addToCart, getCartItems, editCart };

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
    // const shoppingCart = JSON.parse(localStorage.getItem("cart"));
    // if (shoppingCart) {
    //   shoppingCart[dish._id]
    //     ? (shoppingCart[dish._id] = shoppingCart[dish._id] + qty)
    //     : (shoppingCart[dish._id] = 0 + qty);
    //   localStorage.setItem("cart", JSON.stringify(shoppingCart));
    // } else {
    //   localStorage.setItem("cart", JSON.stringify({ [dish._id]: 0 + qty }));
    // }
    dispatch(
      apiRequest(
        {
          url: `/api/orders/addtocart`,
          method: "POST",
          data: { dish }
        },
        ADD_TO_CART,
        "Added Cart Items"
      )

      // { type: ADD_TO_CART, payload: { dish, qty } }
    );
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

function editCart(dish, qty) {
  //todo try to delete the product from cart if qty =  0
  console.log(typeof qty);
  return dispatch => {
    const shoppingCart = JSON.parse(localStorage.getItem("cart"));
    if (shoppingCart) {
      if (qty === 0) {
        const id = dish._id;
        delete shoppingCart[id];
      } else {
        shoppingCart[dish._id] = qty;
      }
      localStorage.setItem("cart", JSON.stringify(shoppingCart));
    } else {
      localStorage.setItem("cart", JSON.stringify({ [dish._id]: qty }));
    }
    dispatch({ type: EDIT_CART, payload: { dish, qty } });
  };
}
