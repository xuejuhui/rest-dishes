import { CLEAR_ALERT, REMOVE_SNACKBAR } from "./types";
export { enqueueSnackbar, removeSnackbar };

function enqueueSnackbar(notification) {
  return {
      type: 'ENQUEUE_SNACKBAR',
      notification: {
          key: new Date().getTime() + Math.random(),
          ...notification,
      },
  }
}

function removeSnackbar(key) {
  return {
        type: REMOVE_SNACKBAR,
        key
      }
  }
