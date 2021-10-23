export const actionType = {
  ////////////////
  //  USER
  ////////////////

  // LOGIN
  LOG_USER: "LOG_USER",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  // SIGNUP
  CREATE_USER: "CREATE_USER",
  USER_CREATED: "USER_CREATED",
  USER_FAIL: "USER_FAIL",
  ADD_USERNAME: "ADD_USERNAME",
  USERNAME_ADDED: "USERNAME_ADDED",
  USERNAME_FAIL: "USERNAME_FAIL",
  SAVE_USERPIC: "SAVE_USERPIC",
  DELETE_USER: "DELETE_USER",
  // ERRORS
  SET_ERROR_USER: "SET_ERROR_USER",
  CLEAR_ERROR_USER: "CLEAR_ERROR_USER",
  // WITH POST
  LIKE_POST: "LIKE_POST",

  ////////////////
  //  POSTS
  ////////////////
  GET_POSTS: "GET_POSTS",
  GET_REPLIES: "GET_REPLIES",
  CREATE_POST: "CREATE_POST",
  TO_COMMENT: "TO_COMMENT",
  CREATE_COMMENT: "CREATE_COMMENT",
  CREATE_REPLY: "CREATE_REPLY",
  GET_COMMENTS: "GET_COMMENTS",
  SET_ERROR_POST: "SET_ERROR_POST",
  CLEAR_ERROR_POST: "CLEAR_ERROR_POST",
};
