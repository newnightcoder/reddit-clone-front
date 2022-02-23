import { PURGE } from "redux-persist";
import { actionType } from "../constants";

const initialState = {
  posts: [],
  userPosts: [],
  currentPost: {
    title: "",
    text: "",
    imgUrl: "",
  },
  comments: [],
  replies: [],
  likes: [],
  error: "",
  lastPostAdded: null,
  lastReplyAdded: null,
  lastDeleted: null,
  sessionExpired: false,
  users: [],
};

const {
  GET_POSTS,
  GET_USERS,
  GET_USER_POSTS,
  GET_COMMENTS,
  GET_REPLIES,
  SET_ERROR_POST,
  CLEAR_ERROR_POST,
  SAVE_POST_PIC,
  CREATE_POST,
  CREATE_REPLY,
  EDIT_POST,
  DELETE_POST,
  CLEAN_PROFILE_POSTS,
  SESSION_EXPIRED,
} = actionType;

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS: {
      const { posts, likes } = action.payload;
      return { ...state, posts, likes };
    }
    case GET_USERS: {
      const { users } = action.payload;
      return { ...state, users };
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
    case SAVE_POST_PIC:
      return { ...state, currentPost: { ...state.currentPost, imgUrl: action.payload } };
    case CREATE_POST:
      return { ...state, lastPostAdded: action.payload };
    case CREATE_REPLY:
      return { ...state, lastReplyAdded: action.payload };
    case EDIT_POST:
      return { ...state };
    case DELETE_POST:
      return { ...state, lastDeleted: action.payload };
    case SET_ERROR_POST:
      return { ...state, error: action.payload };
    case CLEAR_ERROR_POST:
      return { ...state, error: "" };
    case CLEAN_PROFILE_POSTS:
      return { ...state, userPosts: [] };
    case SESSION_EXPIRED: {
      return { ...state, sessionExpired: action.payload };
    }
    case PURGE:
      return initialState;
    default:
      return state;
  }
};
