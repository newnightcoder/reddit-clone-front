import { PURGE } from "redux-persist";
import { actionType } from "../constants.js";

const initialState = {
  id: null,
  email: "",
  username: "",
  picUrl: "",
  creationDate: "",
  error: "",
  loginSuccess: false,
  userCreated: false,
  usernameAdded: false,
  isNewUser: null,
  role: null,
  currentComment: {
    postId: null,
  },
  // lastComment: null,
  liked: null,
  currentLikesCount: null,
  currentCommentsCount: null,
  sessionExpired: false,
};

const {
  CLEAR_ERROR_USER,
  SET_ERROR_USER,
  LOG_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CREATE_USER,
  USER_CREATED,
  USER_FAIL,
  ADD_USERNAME,
  USERNAME_ADDED,
  USERNAME_FAIL,
  SAVE_USERPIC,
  LIKE_POST,
  TO_COMMENT,
  CREATE_COMMENT,
  DELETE_USER,
  SESSION_EXPIRED,
} = actionType;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_USER: {
      console.log("payload reducer", action.payload);
      const { id, email, password, username, picUrl, creationDate, role } =
        action.payload.user;
      const { isNewUser, accessToken } = action.payload;

      return {
        ...state,
        id,
        email,
        username,
        picUrl,
        creationDate,
        isNewUser,
        role,
        accessToken,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginSuccess: true,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loginSuccess: false,
      };
    }
    case CREATE_USER:
      return {
        ...state,
        id: action.payload,
      };
    case USER_CREATED: {
      return {
        ...state,
        userCreated: true,
      };
    }
    case USER_FAIL: {
      return {
        ...state,
        userCreated: false,
      };
    }

    case ADD_USERNAME: {
      const { username, email, creationDate, isNewUser, role } = action.payload;
      return {
        ...state,
        username,
        email,
        creationDate,
        isNewUser,
        role,
      };
    }
    case USERNAME_ADDED: {
      return {
        ...state,
        usernameAdded: true,
      };
    }
    case USERNAME_FAIL: {
      return {
        ...state,
        usernameAdded: false,
      };
    }
    case SAVE_USERPIC:
      return {
        ...state,
        picUrl: action.payload,
      };
    case LIKE_POST: {
      const { liked, count } = action.payload;
      return {
        ...state,
        liked,
        currentLikesCount: count,
      };
    }

    case TO_COMMENT:
      return {
        ...state,
        currentComment: {
          postId: action.payload,
        },
      };
    case CREATE_COMMENT:
      const { comment, count } = action.payload;
      return {
        ...state,
        currentCommentsCount: count,
      };

    case DELETE_USER:
      return {
        ...state,
        state: initialState,
      };
    case CLEAR_ERROR_USER:
      return {
        ...state,
        error: "",
      };
    case SET_ERROR_USER:
      return {
        ...state,
        error: action.payload,
      };
    case SESSION_EXPIRED: {
      return { ...state, sessionExpired: action.payload };
    }
    case PURGE:
      return initialState;
    default:
      return state;
  }
};
