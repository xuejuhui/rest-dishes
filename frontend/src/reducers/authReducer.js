import { SET_CURRENT_USER, LOADING, REMOVE_CURRENT_USER } from "actions/types";

const initialState = {
  login: false,
  user: {},
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        login: action.payload.id ? true : false,
        user: action.payload
      };
    case LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case REMOVE_CURRENT_USER:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default authReducer;
