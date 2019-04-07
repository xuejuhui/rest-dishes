import axios from "axios";
import {
  SET_CURRENT_USER,
  LOADING,
  REMOVE_CURRENT_USER,
  USER_LOGOUT
} from "./types";
import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { enqueueSnackbar } from "./alertActions";

export {
  login,
  register,
  logout,
  loading,
  autoLogin,
  forgotPassword,
  resetPassword
};

function register(user) {
  return async dispatch => {
    try {
      const regResponse = await axios.post(
        "http://localhost:5000/api/users/register",
        user
      );
      if (regResponse) {
        setAuthToken(regResponse.token);
        dispatch({
          type: SET_CURRENT_USER,
          payload: regResponse
        });
        dispatch(
          enqueueSnackbar({
            message: "Register Success",
            options: { variant: "success" }
          })
        );
      }
    } catch (err) {
      dispatch(
        enqueueSnackbar({
          message: err.response.data.message,
          options: {
            variant: "error"
          }
        })
      );
      dispatch({
        type: REMOVE_CURRENT_USER
      });
    }
  };
}

function login(user) {
  return async dispatch => {
    dispatch(loading());
    try {
      const loginResponse = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      );
      if (loginResponse) {
        dispatch(loading());
        const { token } = loginResponse.data;
        localStorage.setItem("jwt", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
        });
        dispatch(
          enqueueSnackbar({
            message: "Logged in",
            options: { variant: "success" }
          })
        );
      }
    } catch (err) {
      dispatch(loading());
      console.log(err);
      dispatch(
        enqueueSnackbar({
          message: err.response.data.message,
          options: { variant: "error" }
        })
      );
      dispatch({
        type: REMOVE_CURRENT_USER
      });
    }
  };
}
function autoLogin() {
  console.log("autologin");
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    setAuthToken(jwt);
  }
}

function loading() {
  return {
    type: LOADING
  };
}

function logout() {
  return dispatch => {
    localStorage.removeItem("jwt");
    setAuthToken(false);
    dispatch({
      type: USER_LOGOUT
    });
    dispatch({
      type: REMOVE_CURRENT_USER
    });
    dispatch({
      type: REMOVE_CURRENT_USER
    });
    dispatch(
      enqueueSnackbar({ message: "Logout", options: { variant: "success" } })
    );
  };
}

function forgotPassword(email) {
  return async dispatch => {
    dispatch(loading());
    try {
      const forgotResponse = await axios.post(
        `http://localhost:5000/api/users/forgotpassword`,
        { email }
      );
      if (forgotResponse) {
        dispatch(
          enqueueSnackbar({
            message: forgotResponse.data.message,
            options: { variant: "success" }
          })
        );
        dispatch(loading());
      }
    } catch (e) {
      console.log(e);
      dispatch(
        enqueueSnackbar({
          message: e.response.data.message,
          options: { variant: "error" }
        })
      );
      dispatch(loading());
    }
  };
}

function resetPassword(password, token) {
  return async dispatch => {
    dispatch(loading());
    try {
      console.log(token);
      const resetResponse = await axios.put(
        `http://localhost:5000/api/users/reset/${token}`,
        { password }
      );
      if (resetResponse) {
        dispatch(
          enqueueSnackbar({
            message: resetResponse.data.message,
            options: { variant: "success" }
          })
        );
        dispatch(loading());
      }
    } catch (e) {
      console.log(e);
      dispatch(
        enqueueSnackbar({
          message: e.response.data.message,
          options: { variant: "error" }
        })
      );
      dispatch(loading());
    }
  };
}
