import { actionType } from "../constants.js";

const initialState = {
  id: null,
  email: "",
  password: "",
  username: "",
  picUrl: "",
  creationDate: "",
  error: "",
  loginSuccess: false,
  userCreated: false,
  usernameAdded: false,
  isNewUser: false,
  currentComment: {
    postId: null,
  },
  lastComment: null,
  liked: null,
  currentLikesCount: null,
  currentCommentsCount: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CLEAR_ERROR_USER:
      return {
        ...state,
        error: "",
      };
    case actionType.SET_ERROR_USER:
      return {
        ...state,
        error: action.payload,
      };
    case actionType.LOG_USER: {
      console.log("payload reducer", action.payload);
      const { id, email, password, username, picUrl, creationDate } = action.payload.user;
      const { isNewUser } = action.payload;

      return {
        ...state,
        id,
        email,
        password,
        username,
        picUrl,
        creationDate,
        isNewUser,
      };
    }
    case actionType.LOGIN_SUCCESS: {
      return {
        ...state,
        loginSuccess: true,
      };
    }
    case actionType.LOGIN_FAIL: {
      return {
        ...state,
        loginSuccess: false,
      };
    }
    case actionType.CREATE_USER:
      return {
        ...state,
        id: action.payload,
      };
    case actionType.USER_CREATED: {
      return {
        ...state,
        userCreated: true,
      };
    }
    case actionType.USER_FAIL: {
      return {
        ...state,
        userCreated: false,
      };
    }

    case actionType.ADD_USERNAME: {
      const { username, email, creationDate, isNewUser } = action.payload;
      return {
        ...state,
        username,
        email,
        creationDate,
        isNewUser,
      };
    }
    case actionType.USERNAME_ADDED: {
      return {
        ...state,
        usernameAdded: true,
      };
    }
    case actionType.USERNAME_FAIL: {
      return {
        ...state,
        usernameAdded: false,
      };
    }
    case actionType.SAVE_USERPIC:
      return {
        ...state,
        picUrl: action.payload,
      };
    case actionType.LIKE_POST: {
      const { liked, count } = action.payload;
      return {
        ...state,
        liked,
        currentLikesCount: count,
      };
    }

    case actionType.TO_COMMENT:
      return {
        ...state,
        currentComment: {
          postId: action.payload,
        },
      };
    case actionType.CREATE_COMMENT:
      const { comment, count } = action.payload;
      return {
        ...state,
        lastComment: comment,
        currentCommentsCount: count,
      };
    default:
      return state;
  }
};
