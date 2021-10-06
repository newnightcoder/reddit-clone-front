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
    const { errorNumber, errorMsg, userId } = data;
    console.log("data", response);
    if (errorNumber === 1062) {
      // setErrorDuplicate(data.errorMsg);
      console.log(data.errorMsg);
      return;
    }
    if (!errorNumber && response.status !== 201) {
      // setErrorServer(data.errorMsg);
      console.log(errorMsg);
      return;
    }
    console.log("user ID:", userId);
    dispatch({
      type: actionType.CREATE_USER,
      payload: userId,
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveUserName = (userName, id, date) => async (dispatch) => {
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ userName, id, date }),
  };
  try {
    const response = await fetch(`${API_AUTH}/username`, request);
    const data = await response.json();
    const { errorNumber, error, username, creationDate, email, isNewUser } = data;
    console.log("error number", errorNumber);
    if (errorNumber === 1062) {
      console.log(error);
      // setErrorDuplicate(data.error);
      return;
    }
    if (!errorNumber && response.status !== 200) {
      console.log(error);
      // setErrorServer(error);
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
