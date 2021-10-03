import { actionType } from "../constants.js";

export const logUser = (user) => (dispatch) => {
  console.log("hey from user action");
  dispatch({
    type: actionType.LOG_USER,
    payload: user,
  });
};
