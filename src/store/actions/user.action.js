import { API_USER } from "../../API/index";
import { actionType } from "../constants.js";

/////////////////////////////////////
//
/////////////////////////////////////
const {
  CLEAR_ERROR_USER,
  SET_ERROR_USER,
  TOGGLE_VISITOR,
  TOGGLE_DARK_MODE,
  SET_LANGUAGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_USER,
  USER_FAIL,
  CREATE_USER,
  DELETE_USER,
  USERNAME_FAIL,
  ADD_USERNAME,
  EDIT_USERNAME,
  USERNAME_ADDED,
  USERNAME_EDITED,
  USER_CREATED,
  LIKE_POST,
  TO_COMMENT,
  GET_USER_PROFILE,
  CLEAN_PROFILE_VISIT,
  GET_USERS,
  GET_MODS,
  SESSION_EXPIRED,
} = actionType;

export const toggleVisitorModal = (message) => (dispatch) => {
  dispatch({ type: TOGGLE_VISITOR, payload: message });
};

export const setLanguage = (lang) => (dispatch) => {
  dispatch({ type: SET_LANGUAGE, payload: lang });
};

export const logUserAction = (email, password) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(`${API_USER}/login`, request);
    const data = await response.json();
    const { error, user, isNewUser, accessToken } = data;
    if (response.status !== 200) {
      dispatch({ type: SET_ERROR_USER, payload: error });
      dispatch({ type: LOGIN_FAIL });
      return;
    }
    dispatch({
      type: LOG_USER,
      payload: { user, isNewUser },
    });
    localStorage.setItem("jwt", accessToken);
    dispatch({ type: LOGIN_SUCCESS });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: SET_ERROR_USER, payload: "backend" });
  }
};

export const createUser = (email, password) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  };
  try {
    const response = await fetch(`${API_USER}/signup`, request);
    const data = await response.json();
    const { error, userId } = data;
    console.log("data", response);
    if (error) {
      dispatch({ type: SET_ERROR_USER, payload: error });
      dispatch({ type: USER_FAIL });
      return;
    }
    dispatch({ type: CREATE_USER, payload: userId });
    dispatch({ type: USER_CREATED });
  } catch (err) {
    dispatch({ type: SET_ERROR_USER, payload: "backend" });
  }
};

export const saveUserName = (id, username, creationDate) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  console.log("i'm here");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id, username, creationDate }),
  };
  try {
    const response = await fetch(`${API_USER}/username`, request);
    const data = await response.json();
    const { result, error, isNewUser, accessToken } = data;
    if (error) {
      dispatch({ type: SET_ERROR_USER, payload: error });
      dispatch({ type: USERNAME_FAIL });
      return;
    }
    const { username, creationDate, email, role } = result;
    localStorage.setItem("jwt", accessToken);
    dispatch({
      type: ADD_USERNAME,
      payload: { username, creationDate, email, role, isNewUser },
    });
    dispatch({ type: USERNAME_ADDED });
    dispatch({ type: LOGIN_SUCCESS });
  } catch (err) {
    dispatch({ type: SET_ERROR_USER, payload: "backend" });
  }
};

export const editUsername = (userId, username) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ userId, username }),
  };

  try {
    const response = await fetch(`${API_USER}/edit`, request);
    const data = await response.json();
    const { newName, error } = data;
    console.log("new name", newName);
    if (response.status !== 200) {
      return dispatch({ type: SET_ERROR_USER, payload: error });
    }
    dispatch({ type: EDIT_USERNAME, payload: { newName } });
    dispatch({ type: USERNAME_EDITED });
  } catch (err) {
    dispatch({ type: SET_ERROR_USER, payload: "backend" });
  }
};

export const resetUsernameEdited = () => (dispatch) => {
  dispatch({ type: USERNAME_EDITED });
};

export const saveUserPic = (blob, id, imgType) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", blob);
  formData.append("id", id);
  formData.append("imgType", imgType);
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: formData,
  };
  try {
    console.log("imgType sent to backend", imgType);
    const response = await fetch(`${API_USER}/userpic`, request);
    const data = await response.json();
    const { error, picUrl } = data;
    if (response.status !== 200) {
      return dispatch({ type: SET_ERROR_USER, payload: error });
    }
    dispatch({
      type: actionType.SAVE_USERPIC,
      payload: { picUrl, imgType },
    });
  } catch (err) {
    dispatch({ type: SET_ERROR_USER, payload: "backend" });
  }
};

export const likePost = (origin, userId, id, like) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify({ origin, userId, id, like }),
  };
  try {
    const response = await fetch(`${API_USER}/like`, request);
    const data = await response.json();
    console.log(data);
    const { liked, sessionExpired, error } = data;
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_USER, payload: error });
    }
    dispatch({ type: LIKE_POST, payload: liked });
  } catch (err) {
    dispatch({ type: SET_ERROR_USER, payload: "backend" });
  }
};

export const toComment = (postId) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  dispatch({
    type: TO_COMMENT,
    payload: postId,
  });
};

export const getUserProfile = (id) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ id }),
  };
  try {
    const response = await fetch(API_USER, request);
    const { user, sessionExpired, error } = await response.json();
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_USER, payload: error });
    }
    dispatch({ type: GET_USER_PROFILE, payload: user });
  } catch (err) {
    dispatch({ type: SET_ERROR_USER, payload: "backend" });
  }
};

export const cleanCurrentProfileVisit = () => (dispatch) => {
  dispatch({ type: CLEAN_PROFILE_VISIT });
};

export const getRecentUsers = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(`${API_USER}/user`, request);
    const data = await response.json();
    const { recentUsers, sessionExpired, error } = data;
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_USER, payload: error });
    }
    dispatch({ type: GET_USERS, payload: { recentUsers } });
  } catch (err) {
    dispatch({ type: SET_ERROR_USER, payload: "backend" });
  }
};

export const getMods = () => async (dispatch) => {
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    method: "get",
  };
  try {
    const response = await fetch(`${API_USER}/mods`, request);
    const data = await response.json();
    const { mods, error, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    } else if (error) {
      return dispatch({ type: SET_ERROR_USER, payload: error });
    }
    dispatch({ type: GET_MODS, payload: { mods } });
  } catch (err) {
    dispatch({ type: SET_ERROR_USER, payload: "backend" });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ id }),
  };
  try {
    const response = await fetch(`${API_USER}/delete`, request);
    const data = response.json();
    const { error, sessionExpired } = data;
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_USER, payload: error });
    }
    dispatch({ type: DELETE_USER });
  } catch (err) {
    dispatch({ type: SET_ERROR_USER, payload: "backend" });
  }
};

export const clearUserError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
};

export const toggleDarkMode = () => (dispatch) => {
  dispatch({ type: TOGGLE_DARK_MODE });
};
