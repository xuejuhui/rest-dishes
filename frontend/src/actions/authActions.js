import axios from "axios";
import {
  SET_CURRENT_USER,
  LOADING,
  REMOVE_CURRENT_USER
} from "./types";
import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { showAlert } from "./alertActions";

export { login, register, logout, loading, autoLogin, forgotPassword, resetPassword };

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
      dispatch(showAlert({message:"Success"}));
    } catch (err) {
      dispatch(showAlert(err.response.data, err.response.status));
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
      dispatch(showAlert(err.response.data, err.response.status));
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

function loading() {
  return {
    type: LOADING,
    payload:true
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


function forgotPassword(email){
  return async dispatch =>{
    dispatch(loading())
    const forgotResponse = await axios.post(`http://localhost:5000/api/users/forgotpassword`,{ email });
      if(forgotResponse){
        dispatch(loading())
      }
    }
  }

function resetPassword({password, token}){
  return async dispatch =>{
    const resetResponse = await axios.put(`http://localhost:5000/api/users/reset/${token}`,password)
    }
  }
