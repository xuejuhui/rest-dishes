import { CLEAR_ALERT, GET_ALERT } from "./types";
export { showAlert, clearAlert };

function showAlert(msg, status) {
  return {
    type: GET_ALERT,
    payload: { msg, status }
  };
}

function clearAlert() {
  return {
    type: CLEAR_ALERT
  };
}
