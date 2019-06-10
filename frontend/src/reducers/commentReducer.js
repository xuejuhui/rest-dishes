import { GET_ALL_COMMENTS, POST_COMMENT } from "actions/types";

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
      return {
        ...state,
        comments: {
          [action.payload._id]: {
            ...action.payload,
            date: new Date(action.payload.date).toLocaleString()
          },
          ...state.comments
        }
      };
    default:
      return state;
  }
};

export default commentReducer;
