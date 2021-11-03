import { API_POST } from "../../components/API";
import { actionType } from "../constants";

const {
  GET_POSTS,
  GET_USER_POSTS,
  CREATE_POST,
  CREATE_REPLY,
  EDIT_POST,
  DELETE_POST,
  GET_COMMENTS,
  GET_REPLIES,
  SET_ERROR_POST,
  CLEAR_ERROR_POST,
  SESSION_EXPIRED,
} = actionType;

export const getPosts = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
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

export const getUserPosts = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
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

export const createPost = (userId, title, text, date) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  console.log("token", accessToken);
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify({ userId, title, text, date }),
  };
  try {
    const response = await fetch(API_POST, request);
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

export const editPost = (origin, id, title, text) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  console.log("token", accessToken);
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify({ origin, id, title, text }),
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

export const deletePost = (postId) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");

  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ postId }),
  };
  try {
    const response = await fetch(`${API_POST}/delete`, request);
    const data = response.json();
    const { error, sessionExpired } = data;
    if (sessionExpired) {
      dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
      return;
    }
    if (response.status !== 200) {
      dispatch({ type: SET_ERROR_POST, payload: error });
      return;
    }
    console.log("postId avant dispatch delete");
    dispatch({ type: DELETE_POST, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const getComments = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");

  const request = {
    headers: {
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
