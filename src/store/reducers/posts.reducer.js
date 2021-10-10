import { actionType } from "../constants";

const initialState = {
  posts: [],
  likes: [],
  error: "",
  lastAdded: null,
};

const { GET_POSTS, SET_ERROR_POST, CLEAR_ERROR_POST, CREATE_POST } = actionType;

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      const { posts, likes } = action.payload;
      return { ...state, posts, likes };
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
