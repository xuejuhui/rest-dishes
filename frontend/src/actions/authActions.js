import axios from "axios";
import { SET_CURRENT_USER, USER_LOADING, GET_ERRORS } from "./types";
import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export { login, register, logout, setUserLoading };

function register(user) {
  return async dispatch => {
    try {
      const regResponse = await axios.post(
        "http://localhost:5000/api/users/register",
        user
      );
      console.log(regResponse);
    } catch (err) {
      console.log(err.response.data);
    }
  };
}

function login(user) {
  return async dispatch => {
    try {
      const loginResponse = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      );
      if (loginResponse) {
        const { token } = loginResponse.data;
        localStorage.setItem("jwt", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
        });
      }
    } catch (err) {
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };
}

function setUserLoading() {
  return {
    type: USER_LOADING
  };
}

function logout() {
  return dispatch => {
    console.log("logout");
    localStorage.removeItem("jwt");
    setAuthToken(false);
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  };
}
