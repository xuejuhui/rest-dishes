import axios from "axios";
import {
  SET_CURRENT_USER,
  USER_LOADING,
  REMOVE_CURRENT_USER
} from "./types";
import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { showErrors } from "./errorActions";

export { login, register, logout, setUserLoading, autoLogin };

function register(user) {
  return async dispatch => {
    try {
      const regResponse = await axios.post(
        "http://localhost:5000/api/users/register",
        user
      );
      setAuthToken(regResponse.token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: regResponse
      });
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status));
      dispatch({
        type: REMOVE_CURRENT_USER
      });
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
      console.log(err);
      dispatch(showErrors(err.response.data, err.response.status));
      dispatch({
        type: REMOVE_CURRENT_USER
      });
    }
  };
}
function autoLogin() {
  return dispatch => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setAuthToken(jwt);
      const decoded = jwt_decode(jwt);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
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
      type: REMOVE_CURRENT_USER
    });
  };
}
