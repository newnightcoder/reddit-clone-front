import { API_POST } from "../../API";
import { actionType } from "../constants";

const {
  GET_POSTS,
  GET_POST_BY_ID,
  GET_LIKES,
  GET_USER_POSTS,
  SAVE_POST_PIC,
  SET_PREVIEW_LOADER,
  GET_PREVIEW_DATA,
  SET_PREVIEW_DATA,
  CLEAR_TEMP_POST_PIC,
  CLEAR_TEMP_PREVIEW,
  CLEAR_PREVIEW_IMG,
  CREATE_POST,
  CREATE_COMMENT,
  CREATE_REPLY,
  EDIT_POST,
  SET_EDIT_ID,
  TOGGLE_EDIT_MODAL,
  DELETE_POST,
  GET_COMMENTS,
  GET_REPLIES,
  RESET_REPLIES,
  SET_ERROR_POST,
  CLEAR_ERROR_POST,
  CLEAR_LAST_ADDED,
  CLEAN_PROFILE_POSTS,
  SESSION_EXPIRED,
  SAVE_GIF_URL,
} = actionType;

export const getPosts = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  // const accessToken = localStorage.getItem("jwt2");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(API_POST, request);
    const data = await response.json();
    const { posts, likes, sessionExpired, error } = data;
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    }
    dispatch({ type: CLEAR_LAST_ADDED });
    dispatch({ type: GET_POSTS, payload: { posts, likes } });
  } catch (err) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
  }
};

// export const getPostById = (id) => async (dispatch) => {
//   const accessToken = localStorage.getItem("jwt");
//   const request = {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     method: "get",
//   };

//   try {
//     const response = await fetch(`${API_POST}/id/${id}`, request);
//     const { currentPost, error, sessionExpired } = await response.json();
//     if (sessionExpired) {
//       return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
//     } else if (error) {
//       return dispatch({ type: SET_ERROR_POST, payload: error });
//     }
//     // console.log("current post", currentPost);
//     dispatch({ type: GET_POST_BY_ID, payload: currentPost });
//   } catch (err) {
//     console.log(err);
//     dispatch({ type: SET_ERROR_POST, payload: "backend" });
//   }
// };

export const getLikes = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  // const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      // Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(`${API_POST}/like`, request);
    const data = await response.json();
    const { likes, error } = data;
    if (error) return dispatch({ type: SET_ERROR_POST, payload: error });
    dispatch({ type: GET_LIKES, payload: likes });
  } catch (err) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
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
    const { posts, likes, sessionExpired, error } = data;
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    }
    dispatch({ type: GET_USER_POSTS, payload: { posts, likes } });
  } catch (err) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
  }
};

export const savePostImage = (blob) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
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
    if (error) return dispatch({ type: SET_ERROR_POST, payload: error });
    dispatch({ type: SAVE_POST_PIC, payload: imgUrl });
  } catch (err) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
  }
};

export const saveImageToEdit = (imgUrl) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  dispatch({ type: CLEAR_TEMP_PREVIEW });
  dispatch({ type: SAVE_POST_PIC, payload: imgUrl });
};

export const saveGifUrl = (url) => (dispatch) => {
  dispatch({ type: CLEAR_TEMP_PREVIEW });
  dispatch({ type: SAVE_GIF_URL, payload: url });
};

export const setPreviewLoader = (bool) => (dispatch) => {
  dispatch({ type: SET_PREVIEW_LOADER, payload: bool });
};

export const getPreviewData = (targetUrl) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  dispatch({ type: CLEAR_TEMP_POST_PIC });
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ targetUrl }),
  };
  try {
    const response = await fetch(`${API_POST}/post-link`, request);
    const data = await response.json();
    const { article, error } = data;
    if (error) {
      dispatch({ type: SET_PREVIEW_LOADER, payload: false });
      dispatch({ type: SET_ERROR_POST, payload: error });
      return;
    }
    dispatch({ type: GET_PREVIEW_DATA, payload: article });
    dispatch({ type: SET_PREVIEW_LOADER, payload: false });
  } catch (err) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
    dispatch({ type: SET_PREVIEW_LOADER, payload: false });
  }
};

export const setPreviewData = (preview) => (dispatch) => {
  dispatch({ type: SET_PREVIEW_DATA, payload: preview });
};

export const clearTempPostImg = () => (dispatch) => {
  dispatch({ type: CLEAR_TEMP_POST_PIC });
};

export const clearTempPreview = () => (dispatch) => {
  dispatch({ type: CLEAR_TEMP_PREVIEW });
};

export const createPost = (userId, title, text, date, imgUrl, isPreview, preview) => async (dispatch) => {
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
    const response = await fetch(API_POST, request);
    const data = await response.json();
    const { newPost, error, sessionExpired } = data;
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    }
    dispatch({ type: CREATE_POST, payload: newPost });
  } catch (err) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
  }
};

export const editPost = (origin, id, title, text, imgUrl, isPreview, preview) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ origin, id, title, text, imgUrl, isPreview, preview }),
  };
  try {
    const response = await fetch(`${API_POST}/edit`, request);
    const data = await response.json();
    const { edit, error, sessionExpired } = data;
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    }
    console.log("edited", edit);
    dispatch({ type: EDIT_POST, payload: { edit, id, origin } });
  } catch (err) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
  }
};

export const setEditId =
  ({ id, type }) =>
  (dispatch) => {
    dispatch({ type: SET_EDIT_ID, payload: { id, type } });
  };

export const toggleEditModal = () => (dispatch) => {
  dispatch({ type: TOGGLE_EDIT_MODAL });
};

export const clearPreviewImg = () => (dispatch) => {
  dispatch({ type: CLEAR_PREVIEW_IMG });
};
export const clearErrorPost = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
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
    const data = await response?.json();
    const { msg, error, sessionExpired } = data;
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    }
    if (response.status === 200) {
      console.log("post id deleted", postId);
      dispatch({ type: DELETE_POST, payload: postId });
    }
  } catch (err) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
  }
};

export const createComment = (userId, postId, text, date) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
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
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    }
    dispatch({ type: CREATE_COMMENT, payload: count });
  } catch (error) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
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
    if (error) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    } else if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    }
    dispatch({ type: CREATE_REPLY, payload: { replyId } });
  } catch (err) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
  }
};

export const getComments = (postId) => async (dispatch) => {
  console.log("post id dans action", postId);
  dispatch({ type: CLEAR_ERROR_POST });
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "Application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(`${API_POST}/comment/${postId}`, request);
    const data = await response.json();
    const { error, comments, sessionExpired } = data;
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    }
    dispatch({ type: GET_COMMENTS, payload: comments });
  } catch (err) {
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
  }
};

export const getReplies = (arr) => async (dispatch) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(`${API_POST}/reply/${arr}`, request);
    const { error, replies, sessionExpired } = await response.json();
    if (sessionExpired) {
      return dispatch({ type: SESSION_EXPIRED, payload: sessionExpired });
    } else if (error) {
      return dispatch({ type: SET_ERROR_POST, payload: error });
    }
    console.log(replies);
    dispatch({ type: GET_REPLIES, payload: replies });
  } catch (err) {
    console.log("error get replies", err);
    dispatch({ type: SET_ERROR_POST, payload: "backend" });
  }
};

export const resetReplies = () => (dispatch) => {
  dispatch({ type: RESET_REPLIES });
};

export const cleanCurrentProfilePosts = () => (dispatch) => {
  dispatch({ type: CLEAN_PROFILE_POSTS });
};
export const clearLastAdded = () => (dispatch) => {
  dispatch({ type: CLEAR_LAST_ADDED });
};

export const setErrorPost = (error) => (dispatch) => {
  dispatch({ type: SET_ERROR_POST, payload: error });
};
