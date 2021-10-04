import { actionType } from "../constants.js";

const initialState = {
  id: null,
  email: "",
  password: "",
  username: "",
  picUrl: "",
  creationDate: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
