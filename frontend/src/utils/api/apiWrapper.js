import apiClient from "./apiClient";
import { enqueueSnackbar } from "../../actions/alertActions";

const apiRequest = ({ url, ...apiOptions }, dispatchType, message = "") => {
  return async dispatch => {
    try {
      const response = await apiClient({ url, ...apiOptions });
      dispatch({
        type: dispatchType,
        payload: response.data
      });
      dispatch(
        enqueueSnackbar({
          message,
          options: { variant: "success" }
        })
      );
    } catch (e) {
      dispatch(
        enqueueSnackbar({ message: `${e}`, options: { variant: "error" } })
      );
    }
  };
};

export { apiRequest };
