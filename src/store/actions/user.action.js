import { API_AUTH, API_POST } from "../../API/index";
import { actionType } from "../constants.js";

/////////////////////////////////////
//
/////////////////////////////////////
const {
  CLEAR_ERROR_USER,
  SET_ERROR_USER,
  TOGGLE_VISITOR,
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
  USER_CREATED,
  LIKE_POST,
  TO_COMMENT,
  CREATE_COMMENT,
  GET_USER_PROFILE,
  CLEAN_PROFILE_VISIT,
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
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(`${API_AUTH}/login`, request);
    const data = await response.json();
    const { error, user, isNewUser, accessToken } = data;
    if (response.status !== 200) {
      console.log(response);
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
  }
};

export const createUser = (email, password) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  };
  try {
    const response = await fetch(`${API_AUTH}/signup`, request);
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
    console.log(err);
  }
};

export const saveUserName = (id, username, creationDate) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id, username, creationDate }),
  };
  try {
    const response = await fetch(`${API_AUTH}/username`, request);
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
    console.log(err);
  }
};

export const editUsername = (userId, username) => async (dispatch) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ userId, username }),
  };

  try {
    const response = await fetch(`${API_AUTH}/edit`, request);
    const data = response.json();
    const { newName } = data;
    if (response.status !== 200) {
      dispatch({ type: SET_ERROR_USER });
      return;
    }
    dispatch({ type: EDIT_USERNAME, payload: newName });
  } catch (error) {
    dispatch({ type: SET_ERROR_USER, payload: error.message });
  }
};

export const saveUserPic = (blob, id) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", blob);
  formData.append("id", id);
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: formData,
  };
  try {
    const response = await fetch(`${API_AUTH}/userpic`, request);
    const data = await response.json();
    const { error, picUrl } = data;
    if (response.status !== 200) {
      console.log(error);
      return;
    }
    dispatch({
      type: actionType.SAVE_USERPIC,
      payload: picUrl,
    });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (origin, userId, id, like) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify({ origin, userId, id, like }),
  };
  try {
    const response = await fetch(`${API_POST}/like`, request);
    const data = await response.json();
    console.log(data);
    const { liked, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    dispatch({
      type: LIKE_POST,
      payload: { liked },
    });
  } catch (error) {
    dispatch({ type: SET_ERROR_USER, payload: error.message });
  }
};

export const toComment = (postId) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  dispatch({
    type: TO_COMMENT,
    payload: postId,
  });
};

export const createComment = (userId, postId, text, date) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ userId, postId, text, date }),
  };
  try {
    const response = await fetch(`${API_POST}/comment`, request);
    const data = await response.json();
    const { error, count, sessionExpired } = data;
    if (response.status !== 201) {
      dispatch({ type: SET_ERROR_USER, payload: error.message });
      return;
    }
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    dispatch({ type: CREATE_COMMENT, payload: count });
  } catch (error) {
    dispatch({ type: SET_ERROR_USER, payload: error.message });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  const request = {
    headers: {
      "Content-type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ id }),
  };
  try {
    const response = await fetch(API_AUTH, request);
    const { user } = await response.json();
    console.log("user reçu pour le profil", user);
    dispatch({ type: GET_USER_PROFILE, payload: user });
  } catch (error) {
    dispatch({ type: SET_ERROR_USER, payload: error.message });
  }
};

export const cleanCurrentProfileVisit = () => (dispatch) => {
  dispatch({ type: CLEAN_PROFILE_VISIT });
};

export const deleteUser = (id) => async (dispatch) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ id }),
  };
  try {
    const response = await fetch(`${API_AUTH}/delete`, request);
    const data = response.json();
    const { error, sessionExpired } = data;
    if (response.status !== 200) {
      dispatch({ type: SET_ERROR_USER, payload: error });
      return;
    }
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    dispatch({ type: DELETE_USER });
  } catch (error) {
    dispatch({ type: SET_ERROR_USER, payload: error.message });
  }
};

export const clearUserError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR_USER });
};
