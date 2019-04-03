import {
  SET_CURRENT_USER,
  USER_LOADING,
  REMOVE_CURRENT_USER
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("jwt"),
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
        user: action.payload,
        token: action.payload.token
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        token: null,
        user: {},
        login: false,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
