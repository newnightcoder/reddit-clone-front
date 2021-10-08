import { API_AUTH } from "../../components/API/index";
import { actionType } from "../constants.js";

// export const clearError = (error) => (dispatch) => {
//   dispatch({
//     type: actionType.CLEAR_ERROR,
//     payload: (error = ""),
//   });
// };
// export const setError = (error) => (dispatch) => {
//   dispatch({
//     type: actionType.SET_ERROR,
//     payload: error,
//   });
// };

/////////////////////////////////////
//
/////////////////////////////////////

export const logUserAction = (email, password) => async (dispatch) => {
  dispatch({
    type: actionType.CLEAR_ERROR,
  });
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
      dispatch({
        type: actionType.SET_ERROR,
        payload: error,
      });
      dispatch({
        type: actionType.LOGIN_SUCCESS,
        payload: false,
      });
      return;
    }
    dispatch({
      type: actionType.LOG_USER,
      payload: { user, isNewUser },
    });
    dispatch({
      type: actionType.LOGIN_SUCCESS,
      payload: true,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const createUser = (email, password) => async (dispatch) => {
  dispatch({
    type: actionType.CLEAR_ERROR,
  });
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
      dispatch({
        type: actionType.SET_ERROR,
        payload: error,
      });
      return;
    }
    dispatch({
      type: actionType.CREATE_USER,
      payload: userId,
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveUserName = (id, username, creationDate) => async (dispatch) => {
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
    const { error, username, creationDate, email } = data.result;
    const { isNewUser } = data;
    if (error) {
      dispatch({
        type: actionType.SET_ERROR,
        payload: error,
      });
      return;
    }

    dispatch({
      type: actionType.SAVE_USERNAME,
      payload: { username, creationDate, email, isNewUser },
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveUserPic = (blob, userId) => async (dispatch) => {
  const formData = new FormData();
  formData.append("userBlob", blob);
  formData.append("userId", userId);
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

export const createComment = (id) => (dispatch) => {
  dispatch({
    type: actionType.CREATE_COMMENT,
    payload: id,
  });
};
