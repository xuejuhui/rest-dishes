import { GET_ALL_COMMENTS, POST_COMMENT } from "../actions/types";

const initialState = {
  comments: {}
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      const objComments = action.payload.reduce((acc, curr) => {
        acc[curr._id] = { ...curr, date: new Date(curr.date).toLocaleString() };
        return acc;
      }, {});
      return {
        ...state,
        comments: objComments
      };
    case POST_COMMENT:
      console.log(action.payload);
      console.log(state.comments);
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload._id]: action.payload
        }
      };
    default:
      return state;
  }
};

export default commentReducer;
