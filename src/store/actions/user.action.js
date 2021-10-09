import { API_AUTH, API_POST } from "../../components/API/index";
import { actionType } from "../constants.js";

/////////////////////////////////////
//
/////////////////////////////////////
const {
  CLEAR_ERROR_USER,
  SET_ERROR_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_USER,
  USER_FAIL,
  CREATE_USER,
  USERNAME_FAIL,
  ADD_USERNAME,
  USERNAME_ADDED,
  USER_CREATED,
  LIKE_POST,
} = actionType;

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
    const { error, user, isNewUser } = data;
    if (response.status !== 200) {
      dispatch({ type: SET_ERROR_USER, payload: error });
      dispatch({ type: LOGIN_FAIL });
      return;
    }
    dispatch({
      type: LOG_USER,
      payload: { user, isNewUser },
    });
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
    const { result, error, isNewUser } = data;
    if (error) {
      dispatch({ type: SET_ERROR_USER, payload: error });
      dispatch({ type: USERNAME_FAIL });
      return;
    }
    const { username, creationDate, email } = result;
    dispatch({
      type: ADD_USERNAME,
      payload: { username, creationDate, email, isNewUser },
    });
    dispatch({ type: USERNAME_ADDED });
  } catch (err) {
    console.log(err);
  }
};

export const saveUserPic = (blob, id) => async (dispatch) => {
  const formData = new FormData();
  formData.append("userBlob", blob);
  formData.append("id", id);
  const request = {
    headers: {
      // "Content-Type": "multipart/form-data",
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
      // setError(data.errorMsg);
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

export const likePost = (userId, postId, like) => async (dispatch) => {
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ postId, userId }),
  };
  switch (like) {
    case false: {
      const response = await fetch(`${API_POST}/like`, request);
      const data = await response.json();
      console.log(data);
      if (response.status !== 200) return;
      dispatch({ type: LIKE_POST, payload: true });
      break;
    }
    case true: {
      const response = await fetch(`${API_POST}/dislike`, request);
      const data = await response.json();
      console.log(data);
      if (response.status !== 200) return;
      dispatch({ type: LIKE_POST, payload: false });
      break;
    }
    default:
      return false;
  }
};
// export const dislikePost = (userId, postId) => (dispatch) => {
//   dispatch({ type: DISLIKE_POST, payload: -1 });
// };

export const createComment = (id) => (dispatch) => {
  dispatch({
    type: actionType.CREATE_COMMENT,
    payload: id,
  });
};
