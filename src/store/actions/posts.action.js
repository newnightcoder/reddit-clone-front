import { API_POST } from "../../components/API";
import { actionType } from "../constants";

const {
  GET_POSTS,
  CREATE_POST,
  DELETE_POST,
  GET_COMMENTS,
  GET_REPLIES,
  SET_ERROR_POST,
  CLEAR_ERROR_POST,
} = actionType;

export const getPosts = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });

  const request = {
    method: "get",
  };
  try {
    const response = await fetch(API_POST, request);
    const data = await response.json();
    const { posts, likes } = data;
    dispatch({ type: GET_POSTS, payload: { posts, likes } });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const createPost = (userId, title, text, date) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ userId, title, text, date }),
  };
  try {
    const response = await fetch(API_POST, request);
    const data = await response.json();
    const { postId, error } = data;
    if (response.status !== 201) {
      dispatch({ type: SET_ERROR_POST, payload: error });
      return;
    }
    dispatch({ type: CREATE_POST, payload: postId });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ postId }),
  };
  try {
    const response = await fetch(`${API_POST}/delete`, request);
    const data = response.json();
    const { error } = data;
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

  const request = {
    method: "get",
  };
  try {
    const response = await fetch(`${API_POST}/comment`, request);
    const data = await response.json();
    const { comments } = data;
    console.log(comments);
    dispatch({ type: GET_COMMENTS, payload: { comments } });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};

export const getReplies = () => async (dispatch) => {
  const request = {
    method: "get",
  };
  try {
    const response = await fetch(`${API_POST}/reply`, request);
    const data = await response.json();
    const { replies } = data;
    console.log(replies);
    dispatch({ type: GET_REPLIES, payload: { replies } });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: error.message });
  }
};
