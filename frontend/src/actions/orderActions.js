import { POST_ORDER } from "../actions/types";
import { apiRequest } from "../utils/api/apiWrapper";

export { postOrder };

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
