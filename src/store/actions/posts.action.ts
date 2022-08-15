import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  createComment,
  createPost,
  createReply,
  deletePost,
  editPost,
  getComments,
  getLikes,
  getPosts,
  getPreviewData,
  getUserPosts,
  uploadPostImage,
} from "../../API/posts";

import { actionTypes } from "../constants";
import { Action, clearAction, IComment, IEdit, IPost, IPostState, IReply, ScrapedPost, toggleAction } from "../types";

export const getPostsAction = () => async (dispatch: ThunkDispatch<IPostState, any, Action>) => {
  dispatch(clearErrorPostAction());

  try {
    const { posts, likes, error } = await getPosts();
    if (error) return dispatch(setErrorPostAction(error));
    dispatch(clearLastAddedAction());
    dispatch({ type: actionTypes.GET_POSTS, payload: { posts, likes } });
  } catch (err) {
    dispatch(setErrorPostAction("backend"));
  }
};

export const getCommentsAction = (postId: number) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  dispatch(clearErrorPostAction());
  try {
    const { error, comments, sessionExpired } = await getComments(postId);
    if (sessionExpired) return dispatch(setSessionExpiredAction(sessionExpired));
    if (error) return dispatch(setErrorPostAction(error));
    dispatch({ type: actionTypes.GET_COMMENTS, payload: comments });
  } catch (err) {
    dispatch(setErrorPostAction("backend"));
  }
};

export const getLikesAction = () => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  dispatch(clearErrorPostAction());
  try {
    const { likes, error } = await getLikes();
    if (error) return dispatch(setErrorPostAction(error));
    dispatch({ type: actionTypes.GET_LIKES, payload: likes });
  } catch (err) {
    dispatch(setErrorPostAction("backend"));
  }
};

export const getUserPostsAction = (userId: number) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  dispatch(clearErrorPostAction());
  try {
    const { posts, likes, sessionExpired, error } = await getUserPosts(userId);
    if (sessionExpired) return dispatch(setSessionExpiredAction(sessionExpired));
    if (error) return dispatch(setErrorPostAction(error));
    dispatch({ type: actionTypes.GET_USER_POSTS, payload: { posts, likes } });
  } catch (err) {
    dispatch(setErrorPostAction("backend"));
  }
};

export const createPostAction = (post: IPost) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  dispatch(clearErrorPostAction());
  try {
    const { newPost, error, sessionExpired } = await createPost(post);
    if (sessionExpired) return dispatch(setSessionExpiredAction(sessionExpired));
    if (error) return dispatch(setErrorPostAction(error));
    dispatch({ type: actionTypes.CREATE_POST, payload: newPost });
  } catch (err) {
    dispatch(setErrorPostAction("backend"));
  }
};

export const createCommentAction =
  (comment: IComment) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
    dispatch(clearErrorPostAction());
    try {
      const { error, count, newComment, sessionExpired } = await createComment(comment);
      if (sessionExpired) return dispatch(setSessionExpiredAction(sessionExpired));
      if (error) return dispatch(setErrorPostAction(error));
      dispatch({ type: actionTypes.CREATE_COMMENT, payload: { newComment, count } });
    } catch (error) {
      dispatch(setErrorPostAction("backend"));
    }
  };

export const createReplyAction = (reply: IReply) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  dispatch(clearErrorPostAction());
  try {
    const { newReply, error, sessionExpired } = await createReply(reply);
    if (error) return dispatch(setErrorPostAction(error));
    if (sessionExpired) return dispatch(setSessionExpiredAction(sessionExpired));
    dispatch({ type: actionTypes.CREATE_REPLY, payload: { newReply } });
  } catch (err) {
    dispatch(setErrorPostAction("backend"));
  }
};

export const editPostAction =
  (origin: string, post: IPost | IEdit, profile?: boolean) =>
  async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
    dispatch(clearErrorPostAction());
    try {
      const { edit, error, sessionExpired } = await editPost(post, origin);
      if (sessionExpired) return dispatch(setSessionExpiredAction(sessionExpired));
      if (error) return dispatch(setErrorPostAction(error));
      console.log(edit, origin);
      dispatch({ type: actionTypes.EDIT_POST, payload: { edit, origin, profile } });
    } catch (err) {
      dispatch(setErrorPostAction("backend"));
    }
  };

export const setEditIdAction =
  ({ id, type }: { id: number; type: string }) =>
  (dispatch: Dispatch<Action>) => {
    dispatch({ type: actionTypes.SET_EDIT_ID, payload: { id, type } });
  };

export const toggleEditModalAction = () => (dispatch: Dispatch<toggleAction>) => {
  dispatch({ type: actionTypes.TOGGLE_EDIT_MODAL });
};

export const deletePostAction =
  (postId: number, origin: string, postIdComment: number | null) =>
  async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
    dispatch(clearErrorPostAction());
    try {
      const { msg, error, sessionExpired } = await deletePost(postId, origin, postIdComment);
      if (sessionExpired) return dispatch(setSessionExpiredAction(sessionExpired));
      if (error) return dispatch(setErrorPostAction(error));
      dispatch({ type: actionTypes.DELETE_POST, payload: { postId, origin, postIdComment } });
    } catch (err) {
      dispatch(setErrorPostAction("backend"));
    }
  };

export const savePostImageAction = (blob: File) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  dispatch(clearErrorPostAction());
  dispatch({ type: actionTypes.CLEAR_TEMP_PREVIEW });
  try {
    const { imgUrl, error } = await uploadPostImage(blob);
    if (error) return dispatch(setErrorPostAction(error));
    dispatch({ type: actionTypes.SAVE_POST_PIC, payload: imgUrl });
  } catch (err) {
    dispatch(setErrorPostAction("backend"));
  }
};

export const saveImageToEditAction = (imgUrl: string) => (dispatch: Dispatch<Action | clearAction>) => {
  // ❌
  clearErrorPostAction();
  clearTempPreviewAction();
  dispatch({ type: actionTypes.SAVE_POST_PIC, payload: imgUrl });
};

export const saveGifUrlAction = (url: string) => (dispatch: Dispatch<Action | clearAction>) => {
  // ❌
  clearTempPreviewAction();
  dispatch({ type: actionTypes.SAVE_GIF_URL, payload: url });
};

export const setPreviewLoaderAction = (bool: boolean) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.SET_PREVIEW_LOADER, payload: bool });
};

export const getPreviewDataAction =
  (targetUrl: string) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
    dispatch(clearErrorPostAction());
    dispatch(clearTempPostImgAction());
    try {
      const { article, error } = await getPreviewData(targetUrl);
      if (error !== undefined) {
        dispatch(setPreviewLoaderAction(false));
        dispatch(setErrorPostAction(error));
        return;
      }
      dispatch({ type: actionTypes.GET_PREVIEW_DATA, payload: article });
      dispatch(setPreviewLoaderAction(false));
    } catch (err) {
      dispatch(setErrorPostAction("backend"));
      dispatch(setPreviewLoaderAction(false));
    }
  };

export const setPreviewDataAction = (preview: ScrapedPost) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.SET_PREVIEW_DATA, payload: preview });
};

export const resetCommentsAction = () => (dispatch: Dispatch<clearAction>) => {
  dispatch({ type: actionTypes.RESET_COMMENTS });
};
export const resetRepliesAction = () => (dispatch: Dispatch<clearAction>) => {
  dispatch({ type: actionTypes.RESET_REPLIES });
};

export const clearPreviewImgAction = (str: string) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.CLEAR_PREVIEW_IMG, payload: str });
};

export const setErrorPostAction = (error: string) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.SET_ERROR_POST, payload: error });
};

export const clearErrorPostAction = () => (dispatch: Dispatch<clearAction>) => {
  dispatch({ type: actionTypes.CLEAR_ERROR_POST });
};

export const clearTempPostImgAction = () => (dispatch: Dispatch<clearAction>) => {
  dispatch({ type: actionTypes.CLEAR_TEMP_POST_PIC });
};

export const clearTempPreviewAction = () => (dispatch: Dispatch<clearAction>) => {
  dispatch({ type: actionTypes.CLEAR_TEMP_PREVIEW });
};

export const setSessionExpiredAction = (sessionExpired: boolean) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.SESSION_EXPIRED, payload: sessionExpired });
};

export const clearLastAddedAction = () => (dispatch: Dispatch<clearAction>) => {
  dispatch({ type: actionTypes.CLEAR_LAST_ADDED });
};
export const clearEditIdAction = () => (dispatch: Dispatch<clearAction>) => {
  dispatch({ type: actionTypes.CLEAR_EDIT_ID });
};
