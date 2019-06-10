import { GET_ALL_COMMENTS, POST_COMMENT } from "actions/types";
import { apiRequest } from "utils/api/apiWrapper";

export { getAllComments, postComment };

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
function postComment(comment) {
  return async dispatch => {
    dispatch(
      apiRequest(
        {
          url: `/api/comments/comments`,
          method: "POST",
          data: comment
        },
        POST_COMMENT,
        "Added"
      )
    );
  };
}
