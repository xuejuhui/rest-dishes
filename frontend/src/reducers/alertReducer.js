import { GET_ALERT, CLEAR_ALERT } from "../actions/types";

const initialState = {};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALERT:
      return action.payload;
    case CLEAR_ALERT:
      return {};
    default:
      return state;
  }
};

export default alertReducer;
