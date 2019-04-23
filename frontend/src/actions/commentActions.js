import { GET_ALL_COMMENTS } from "../actions/types";
import { apiRequest } from "../utils/api/apiWrapper";

export { getAllComments };

function getAllComments({ _id }) {
  return async dispatch => {
    dispatch(
      apiRequest(
        {
          url: `/api/comments/${_id}/comments`,
          method: "GET"
        },
        GET_ALL_COMMENTS,
        "Loaded"
      )
    );
  };
}
