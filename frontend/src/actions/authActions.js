// import axios from "axios";
import {
  SET_CURRENT_USER,
  LOADING,
  REMOVE_CURRENT_USER,
  USER_LOGOUT
} from "./types";
import jwt_decode from "jwt-decode";
import { enqueueSnackbar } from "./alertActions";
import apiClient from "../utils/api/apiClient";
// import { apiRequest } from "../utils/api/apiWrapper";

export { login, register, logout, loading, forgotPassword, resetPassword };

function register(user) {
  return async dispatch => {
    try {
      const regResponse = await apiClient.post("/api/users/register", user);
      if (regResponse) {
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
      const loginResponse = await apiClient.post("/api/users/login", user);
      if (loginResponse) {
        dispatch(loading());
        const { token } = loginResponse.data;
        localStorage.setItem("jwt", token);
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

function loading() {
  return {
    type: LOADING
  };
}

function logout() {
  return dispatch => {
    localStorage.removeItem("jwt");
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
      const forgotResponse = await apiClient.post(`/api/users/forgotpassword`, {
        email
      });
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
      const resetResponse = await apiClient.put(`/api/users/reset/${token}`, {
        password
      });
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
