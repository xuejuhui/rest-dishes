import { CLEAR_ERRORS, GET_ERRORS } from "./types";
export { showErrors, clearErrors };

function showErrors(msg, status) {
  return {
    type: GET_ERRORS,
    payload: { msg, status }
  };
}

function clearErrors() {
  return {
    type: CLEAR_ERRORS
  };
}
