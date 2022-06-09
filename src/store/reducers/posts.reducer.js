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
  editId: { id: null, type: null },
  editModalOpen: false,
  scrapedPost: {},
  comments: null,
  currentCommentsCount: null,
  currentPostComments: {},
  replies: [],
  likes: [],
  error: "",
  lastPostAdded: null,
  lastReplyAdded: null,
  lastDeleted: null,
  sessionExpired: false,
};

const {
  GET_POSTS,
  GET_POST_BY_ID,
  GET_LIKES,
  GET_USER_POSTS,
  GET_PREVIEW_DATA,
  SET_PREVIEW_DATA,
  GET_COMMENTS,
  GET_REPLIES,
  SET_ERROR_POST,
  CLEAR_ERROR_POST,
  SAVE_POST_PIC,
  SAVE_GIF_URL,
  CLEAR_TEMP_POST_PIC,
  CLEAR_TEMP_PREVIEW,
  CLEAR_PREVIEW_IMG,
  CREATE_POST,
  CREATE_COMMENT,
  CREATE_REPLY,
  EDIT_POST,
  SET_EDIT_ID,
  TOGGLE_EDIT_MODAL,
  DELETE_POST,
  CLEAN_PROFILE_POSTS,
  CLEAR_LAST_ADDED,
  SESSION_EXPIRED,
} = actionType;

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS: {
      const { posts, likes } = action.payload;
      const postsInOrder = posts?.sort((a, b) => {
        if (a.postId < b.postId) return 1;
        if (a.postId > b.postId) return -1;
        return 0;
      });

      return { ...state, posts: postsInOrder, likes };
    }

    case GET_POST_BY_ID: {
      const currentPost = action.payload;
      return { ...state, currentPostComments: currentPost };
    }

    case GET_LIKES: {
      const likes = action.payload;
      return { ...state, likes };
    }

    case GET_USER_POSTS: {
      const { posts, likes } = action.payload;
      return { ...state, userPosts: posts, likes };
    }

    case GET_PREVIEW_DATA:
      return { ...state, scrapedPost: action.payload };

    case SET_PREVIEW_DATA:
      return { ...state, scrapedPost: action.payload };

    case GET_COMMENTS: {
      const comments = action.payload;
      return { ...state, comments };
    }

    case GET_REPLIES: {
      const replies = action.payload;
      return { ...state, replies };
    }

    case SAVE_POST_PIC:
      return { ...state, currentPost: { ...state.currentPost, imgUrl: action.payload } };

    case SAVE_GIF_URL:
      return { ...state, currentPost: { ...state.currentPost, imgUrl: action.payload } };

    case CLEAR_TEMP_POST_PIC:
      return { ...state, currentPost: { ...state.currentPost, imgUrl: "" } };

    case CLEAR_TEMP_PREVIEW:
      return { ...state, scrapedPost: {} };

    case CLEAR_PREVIEW_IMG:
      return {
        ...state,
        scrapedPost: {
          ...state.scrapedPost,
          image: "",
        },
      };

    case CREATE_POST: {
      const post = action.payload;
      return {
        ...state,
        posts: [post, ...state.posts],
        lastPostAdded: post.postId,
      };
    }

    case CREATE_COMMENT: {
      const count = action.payload;
      return {
        ...state,
        currentCommentsCount: count,
      };
    }

    case CREATE_REPLY:
      return { ...state, lastReplyAdded: action.payload };

    case EDIT_POST:
      return { ...state };

    case SET_EDIT_ID:
      return { ...state, editId: action.payload };

    case TOGGLE_EDIT_MODAL:
      const toggle = !state.editModalOpen;
      return { ...state, editModalOpen: toggle };

    case DELETE_POST: {
      const postId = action.payload;
      return { ...state, posts: state.posts.filter((post) => post.postId !== postId), lastDeleted: true };
    }
    case SET_ERROR_POST:
      return { ...state, error: action.payload };

    case CLEAR_ERROR_POST:
      return { ...state, error: "" };

    case CLEAN_PROFILE_POSTS:
      return { ...state, userPosts: [] };

    case CLEAR_LAST_ADDED:
      return { ...state, lastPostAdded: null };

    case SESSION_EXPIRED:
      return { ...state, sessionExpired: action.payload };

    case PURGE:
      return initialState;

    default:
      return state;
  }
};
