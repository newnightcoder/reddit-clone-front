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

export const logUser = (email, password) => async (dispatch) => {
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  };

  dispatch({
    type: actionType.CLEAR_ERROR,
  });

  try {
    const response = await fetch(`${API_AUTH}/login`, request);
    const { error, user } = await response.json();
    if (response.status !== 200) {
      dispatch({
        type: actionType.SET_ERROR,
        payload: error,
      });
      return;
    }
    dispatch({
      type: actionType.LOG_USER,
      payload: user,
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
  } catch (error) {
    console.log(error);
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
    const { errorNumber, errorMsg, successMsg, username, creationDate, email } = data;
    console.log("error number", errorNumber);
    if (errorNumber === 1062) {
      console.log(errorMsg);
      // setErrorDuplicate(data.errorMsg);
      return;
    }
    if (!errorNumber && response.status !== 200) {
      console.log(errorMsg);
      // setErrorServer(errorMsg);
      return;
    }

    dispatch({
      type: actionType.SAVE_USERNAME,
      payload: { username, creationDate, email },
    });
  } catch (error) {
    console.log(error);
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
    const { errorMsg, successMsg, picUrl } = data;
    if (response.status !== 200) {
      // setError(data.errorMsg);
      console.log(errorMsg);
      return;
    }
    dispatch({
      type: actionType.SAVE_USERPIC,
      payload: picUrl,
    });
  } catch (error) {
    console.log(error);
  }
};
