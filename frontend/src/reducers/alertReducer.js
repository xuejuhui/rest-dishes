import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from "../actions/types";

const initialState = {
  notifications: []
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification
          }
        ]
      };
    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        )
      };
    default:
      return state;
  }
};

export default alertReducer;
