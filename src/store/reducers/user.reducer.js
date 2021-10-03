import { actionType } from "../constants.js";

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOG_USER:
      console.log("payload reducer", action.payload);
      return (state = action.payload);
    // case actionType.REGISTER_USER:
    // case actionType.SAVE_USERNAME:
    // case actionType.SAVE_USERPIC:
    // case actionType.DELETE_USER:
    default:
      return state;
  }
};
