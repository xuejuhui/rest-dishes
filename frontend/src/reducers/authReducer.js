import {
  SET_CURRENT_USER,
  USER_LOADING
} from "../actions/types";

const initialState = {
  login: false,
  user: {},
  loading:false
}

const authReducer = (state = initialState, action) => {
  console.log(action.payload ? true : false)
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        login:action.payload ? true : false,
        user:action.payload
      }
      case USER_LOADING:
        return {
          ...state,
          loading:true
        }
    default:
      return state

  }
}

export default authReducer
