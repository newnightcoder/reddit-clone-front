import { PURGE } from "redux-persist";
import { actionType } from "../constants";

const initialState = {
  posts: [],
  userPosts: [],
  // userPostsLikes:[],
  comments: [],
  replies: [],
  likes: [],
  error: "",
  lastAdded: null,
  lastDeleted: null,
  sessionExpired: false,
};

const {
  GET_POSTS,
  GET_USER_POSTS,
  GET_COMMENTS,
  GET_REPLIES,
  SET_ERROR_POST,
  CLEAR_ERROR_POST,
  CREATE_POST,
  DELETE_POST,
  SESSION_EXPIRED,
} = actionType;

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS: {
      const { posts, likes } = action.payload;
      return { ...state, posts, likes };
    }
    case GET_USER_POSTS: {
      const { posts, likes } = action.payload;
      return { ...state, userPosts: posts, likes };
    }
    case GET_COMMENTS:
      const { comments } = action.payload;
      return { ...state, comments };
    case GET_REPLIES:
      const { replies } = action.payload;
      return { ...state, replies };
    case CREATE_POST:
      return { ...state, lastAdded: action.payload };
    case DELETE_POST:
      return { ...state, lastDeleted: action.payload };
    case SET_ERROR_POST:
      return { ...state, error: action.payload };
    case CLEAR_ERROR_POST:
      return { ...state, error: "" };
    case SESSION_EXPIRED: {
      return { ...state, sessionExpired: action.payload };
    }
    case PURGE:
      return initialState;
    default:
      return state;
  }
};
