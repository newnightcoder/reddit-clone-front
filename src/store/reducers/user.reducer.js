import { actionType } from "../constants.js";

const initialState = {
  id: null,
  email: "",
  password: "",
  username: "",
  picUrl: "",
  creationDate: "",
  error: "",
  currentComment: {
    postId: null,
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    case actionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actionType.LOG_USER: {
      console.log("payload reducer", action.payload);
      const { id, email, password, username, picUrl, creationDate } = action.payload;
      return {
        ...state,
        id,
        email,
        password,
        username,
        picUrl,
        creationDate,
      };
    }
    case actionType.CREATE_USER:
      return {
        ...state,
        id: action.payload,
      };
    case actionType.SAVE_USERNAME: {
      const { username, email, creationDate } = action.payload;
      return {
        ...state,
        username,
        email,
        creationDate,
      };
    }
    case actionType.SAVE_USERPIC:
      return {
        ...state,
        picUrl: action.payload,
      };
    // case actionType.DELETE_USER:
    case actionType.CREATE_COMMENT:
      return {
        ...state,
        currentComment: {
          postId: action.payload,
        },
      };
    default:
      return state;
  }
};
