import { API_POST } from "../../API";
import { actionType } from "../constants";

const {
  GET_POSTS,
  GET_LIKES,
  GET_USERS,
  GET_USER_POSTS,
  SAVE_POST_PIC,
  GET_PREVIEW_DATA,
  CLEAR_TEMP_POST_PIC,
  CLEAR_TEMP_PREVIEW,
  CREATE_POST,
  CREATE_REPLY,
  EDIT_POST,
  DELETE_POST,
  GET_COMMENTS,
  GET_REPLIES,
  SET_ERROR_POST,
  CLEAR_ERROR_POST,
  CLEAN_PROFILE_POSTS,
  SESSION_EXPIRED,
  SAVE_GIF_URL,
} = actionType;

export const getPosts = () => async (dispatch) => {
  // dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(API_POST, request);
    const data = await response.json();
    const { posts, likes, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    dispatch({ type: GET_POSTS, payload: { posts, likes } });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const getLikes = () => async (dispatch) => {
  // dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(`${API_POST}/like`, request);
    const data = await response.json();
    const { likes } = data;
    dispatch({ type: GET_LIKES, payload: likes });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const getUsers = () => async (dispatch) => {
  // dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(`${API_POST}/user`, request);
    const data = await response.json();
    const { users, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    dispatch({ type: GET_USERS, payload: { users } });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const getUserPosts = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ userId }),
  };
  try {
    const response = await fetch(`${API_POST}/user`, request);
    const data = await response.json();
    const { posts, likes, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    dispatch({ type: GET_USER_POSTS, payload: { posts, likes } });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const savePostImage = (blob) => async (dispatch) => {
  dispatch({ type: CLEAR_TEMP_PREVIEW });

  const formData = new FormData();
  formData.append("image", blob);
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    method: "post",
    body: formData,
  };

  try {
    const response = await fetch(`${API_POST}/post-image`, request);
    const data = await response.json();
    const { imgUrl, error } = data;
    console.log("imgUrl,", imgUrl);
    if (response.status === 401) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    }
    if (response.status !== 201) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    }
    dispatch({ type: SAVE_POST_PIC, payload: imgUrl });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const saveImageToEdit = (imgUrl) => (dispatch) => {
  dispatch({ type: CLEAR_TEMP_PREVIEW });
  dispatch({ type: SAVE_POST_PIC, payload: imgUrl });
};

export const saveGifUrl = (url) => (dispatch) => {
  dispatch({ type: CLEAR_TEMP_PREVIEW });
  dispatch({ type: SAVE_GIF_URL, payload: url });
};

export const getPreviewData = (targetUrl) => async (dispatch) => {
  dispatch({ type: CLEAR_TEMP_POST_PIC });

  const API =
    process.env.NODE_ENV === "development" ? "http://localhost:3001/api/post" : process.env.NODE_ENV === "production" && API_POST;
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ targetUrl }),
  };
  try {
    const response = await fetch(`${API}/post-link`, request);
    const data = await response.json();
    const { result } = data;
    console.log(data);
    dispatch({ type: GET_PREVIEW_DATA, payload: result });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const clearTempPostImg = () => (dispatch) => {
  dispatch({ type: CLEAR_TEMP_POST_PIC });
};

export const clearTempPreview = () => (dispatch) => {
  dispatch({ type: CLEAR_TEMP_PREVIEW });
};

export const createPost = (userId, title, text, date, imgUrl, isPreview, preview) => async (dispatch) => {
  const api =
    process.env.NODE_ENV === "production" ? API_POST : process.env.NODE_ENV === "development" && "http://localhost:3001/api/post";

  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify({ userId, title, text, date, imgUrl, isPreview, preview }),
  };
  try {
    const response = await fetch(api, request);
    const data = await response.json();
    const { postId, message, error, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    if (response.status === 401) {
      dispatch({ type: SET_ERROR_POST, payload: message });
      return;
    }
    if (response.status !== 201) {
      dispatch({ type: SET_ERROR_POST, payload: error.message });
    }
    dispatch({ type: CREATE_POST, payload: postId });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const editPost = (origin, id, title, text, imgUrl) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  console.log("token", accessToken);
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify({ origin, id, title, text, imgUrl }),
  };
  try {
    const response = await fetch(`${API_POST}/edit`, request);
    const data = await response.json();
    const { error, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    if (response.status === 500) {
      dispatch({ type: SET_ERROR_POST, payload: error });
    }
    dispatch({ type: EDIT_POST });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const deletePost = (postId, origin, postIdComment) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");

  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ postId, origin, postIdComment }),
  };
  try {
    const response = await fetch(`${API_POST}/delete`, request);
    const data = await response.json();
    const { error, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    if (response.status !== 200) {
      dispatch({ type: SET_ERROR_POST, payload: error });
      return;
    }
    dispatch({ type: DELETE_POST, payload: postId });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const getComments = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");

  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(`${API_POST}/comment`, request);
    const data = await response.json();
    const { comments, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    console.log(comments);
    dispatch({ type: GET_COMMENTS, payload: { comments } });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const createReply = (userId, commentId, text, date) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");

  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ userId, commentId, text, date }),
  };
  try {
    const response = await fetch(`${API_POST}/reply`, request);
    const data = await response.json();
    const { error, replyId, sessionExpired } = data;
    if (response.status !== 201) {
      dispatch({ type: SET_ERROR_POST, payload: error.message });
      return;
    }
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    console.log("last reply posted:", replyId);
    dispatch({ type: CREATE_REPLY, payload: { replyId } });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const getReplies = () => async (dispatch) => {
  const accessToken = localStorage.getItem("jwt");

  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(`${API_POST}/reply`, request);
    const data = await response.json();
    const { replies, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    console.log(replies);
    dispatch({ type: GET_REPLIES, payload: { replies } });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const cleanCurrentProfilePosts = () => (dispatch) => {
  dispatch({ type: CLEAN_PROFILE_POSTS });
};
