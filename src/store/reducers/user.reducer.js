import { PURGE } from "redux-persist";
import { actionType } from "../constants.js";

const initialState = {
  id: null,
  email: "",
  username: "",
  picUrl: null,
  bannerUrl: null,
  creationDate: "",
  error: "",
  isAuthenticated: false,
  isVisitor: false,
  visitorMessage: "",
  language: "en",
  userCreated: false,
  usernameAdded: false,
  isNewUser: null,
  role: null,
  currentComment: {
    postId: null,
  },
  liked: null,
  currentCommentsCount: null,
  currentProfileVisit: {},
  sessionExpired: false,
};

const {
  CLEAR_ERROR_USER,
  SET_ERROR_USER,
  TOGGLE_VISITOR,
  SET_LANGUAGE,
  LOG_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CREATE_USER,
  USER_CREATED,
  USER_FAIL,
  ADD_USERNAME,
  EDIT_USERNAME,
  USERNAME_ADDED,
  USERNAME_FAIL,
  SAVE_USERPIC,
  LIKE_POST,
  TO_COMMENT,
  CREATE_COMMENT,
  GET_USER_PROFILE,
  CLEAN_PROFILE_VISIT,
  DELETE_USER,
  SESSION_EXPIRED,
} = actionType;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_VISITOR: {
      const toggle = !state.isVisitor;
      return { ...state, isVisitor: toggle, visitorMessage: action.payload };
    }

    case SET_LANGUAGE: {
      return { ...state, language: action.payload };
    }
    case LOG_USER: {
      const { id, email, username, picUrl, creationDate, role } = action.payload.user;
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
        isAuthenticated: true,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        isAuthenticated: false,
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
    case EDIT_USERNAME: {
      const newName = action.payload;
      return {
        ...state,
        username: newName,
        currentProfileVisit: {
          username: newName,
        },
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
      const { picUrl, imgType } = action.payload;
      return {
        ...state,
        picUrl: imgType === "pic" ? picUrl : state.picUrl,
        bannerUrl: imgType === "banner" ? picUrl : state.bannerUrl,
      };
    case LIKE_POST: {
      const { liked } = action.payload;
      return {
        ...state,
        liked,
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
      const { count } = action.payload;
      return {
        ...state,
        currentCommentsCount: count,
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        currentProfileVisit: action.payload,
      };
    case CLEAN_PROFILE_VISIT:
      return {
        ...state,
        currentProfileVisit: {},
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
