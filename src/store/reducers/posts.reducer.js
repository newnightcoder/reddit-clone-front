import { actionType } from "../constants";

const initialState = {
  posts: [],
  comments: [],
  replies: [],
  likes: [],
  error: "",
  lastAdded: null,
};

const {
  GET_POSTS,
  GET_COMMENTS,
  GET_REPLIES,
  SET_ERROR_POST,
  CLEAR_ERROR_POST,
  CREATE_POST,
} = actionType;

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      const { posts, likes } = action.payload;
      return { ...state, posts, likes };
    case GET_COMMENTS:
      const { comments } = action.payload;
      return { ...state, comments };
    case GET_REPLIES:
      const { replies } = action.payload;
      return { ...state, replies };
    case CREATE_POST:
      return { ...state, lastAdded: action.payload };
    case SET_ERROR_POST:
      return { ...state, error: action.payload };
    case CLEAR_ERROR_POST:
      return { ...state, error: "" };
    default:
      return state;
  }
};
