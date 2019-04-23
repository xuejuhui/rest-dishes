import { GET_ALL_COMMENTS } from "../actions/types";

const initialState = {
  comments: {}
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      const objComments = action.payload.reduce((acc, curr) => {
        acc[curr._id] = curr;
        return acc;
      }, {});
      return {
        ...state,
        comments: objComments
      };
    default:
      return state;
  }
};

export default commentReducer;
