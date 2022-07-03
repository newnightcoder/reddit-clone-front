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
  getReplies,
  getUserPosts,
  uploadPostImage,
} from "../../API/posts";

import { actionTypes } from "../constants";
import { Action, clearAction, IComment, IEdit, IPost, IPostState, IReply, IScrapedPreview, toggleAction } from "../types";

export const getPostsAction = () => async (dispatch: ThunkDispatch<IPostState, any, Action>) => {
  clearErrorPostAction();
  try {
    const { posts, likes, error } = await getPosts();
    if (error) return setErrorPostAction(error);
    clearLastAddedAction();
    dispatch({ type: actionTypes.GET_POSTS, payload: { posts, likes } });
  } catch (err) {
    setErrorPostAction("backend");
  }
};

export const getLikesAction = () => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  clearErrorPostAction();
  try {
    const { likes, error } = await getLikes();
    if (error) return setErrorPostAction(error);
    dispatch({ type: actionTypes.GET_LIKES, payload: likes });
  } catch (err) {
    setErrorPostAction("backend");
  }
};

export const getUserPostsAction = (userId: number) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  clearErrorPostAction();
  try {
    const { posts, likes, sessionExpired, error } = await getUserPosts(userId);
    if (sessionExpired) return setSessionExpiredAction(sessionExpired);
    if (error) return setErrorPostAction(error);
    dispatch({ type: actionTypes.GET_USER_POSTS, payload: { posts, likes } });
  } catch (err) {
    setErrorPostAction("backend");
  }
};

export const savePostImageAction = (blob: File) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  clearErrorPostAction();
  dispatch({ type: actionTypes.CLEAR_TEMP_PREVIEW });
  try {
    const { imgUrl, error } = await uploadPostImage(blob);
    if (error) return setErrorPostAction(error);
    dispatch({ type: actionTypes.SAVE_POST_PIC, payload: imgUrl });
  } catch (err) {
    setErrorPostAction("backend");
  }
};

export const saveImageToEditAction = (imgUrl: string) => (dispatch: Dispatch<Action | clearAction>) => {
  clearErrorPostAction();
  clearTempPreviewAction();
  dispatch({ type: actionTypes.SAVE_POST_PIC, payload: imgUrl });
};

export const saveGifUrlAction = (url: string) => (dispatch: Dispatch<Action | clearAction>) => {
  clearTempPreviewAction();
  dispatch({ type: actionTypes.SAVE_GIF_URL, payload: url });
};

export const setPreviewLoaderAction = (bool: boolean) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.SET_PREVIEW_LOADER, payload: bool });
};

export const getPreviewDataAction =
  (targetUrl: string) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
    clearErrorPostAction();
    clearTempPostImgAction();
    try {
      const { article, error } = await getPreviewData(targetUrl);
      if (error !== undefined) {
        setPreviewLoaderAction(false);
        setErrorPostAction(error);
        return;
      }
      dispatch({ type: actionTypes.GET_PREVIEW_DATA, payload: article });
      dispatch({ type: actionTypes.SET_PREVIEW_LOADER, payload: false });
    } catch (err) {
      setErrorPostAction("backend");
      setPreviewLoaderAction(false);
    }
  };

export const setPreviewDataAction = (preview: IScrapedPreview) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.SET_PREVIEW_DATA, payload: preview });
};

export const createPostAction = (post: IPost) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  clearErrorPostAction();
  try {
    const { newPost, error, sessionExpired } = await createPost(post);
    if (sessionExpired) return setSessionExpiredAction(sessionExpired);
    if (error) return setErrorPostAction(error);
    dispatch({ type: actionTypes.CREATE_POST, payload: newPost });
  } catch (err) {
    setErrorPostAction("backend");
  }
};

export const editPostAction =
  (origin: string, post: IPost | IEdit) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
    clearErrorPostAction();
    try {
      const { edit, error, sessionExpired } = await editPost(post, origin);
      if (sessionExpired) return setSessionExpiredAction(sessionExpired);
      if (error) return setErrorPostAction(error);
      dispatch({ type: actionTypes.EDIT_POST, payload: { edit, origin } });
    } catch (err) {
      setErrorPostAction("backend");
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
    clearErrorPostAction();
    try {
      const { resStatus, error, sessionExpired } = await deletePost(postId, origin, postIdComment);
      if (sessionExpired) return setSessionExpiredAction(sessionExpired);
      if (error) return setErrorPostAction(error);
      if (resStatus === 200) {
        console.log("post id deleted", postId);
        dispatch({ type: actionTypes.DELETE_POST, payload: postId });
      }
    } catch (err) {
      setErrorPostAction("backend");
    }
  };

export const createCommentAction =
  (comment: IComment) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
    clearErrorPostAction();
    try {
      const { error, count, sessionExpired } = await createComment(comment);
      if (sessionExpired) return setSessionExpiredAction(sessionExpired);
      if (error) return setErrorPostAction(error);
      dispatch({ type: actionTypes.CREATE_COMMENT, payload: count });
    } catch (error) {
      setErrorPostAction("backend");
    }
  };

export const createReplyAction = (reply: IReply) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  clearErrorPostAction();
  try {
    const { error, replyId, sessionExpired } = await createReply(reply);
    if (error) return setErrorPostAction(error);
    if (sessionExpired) return setSessionExpiredAction(sessionExpired);
    dispatch({ type: actionTypes.CREATE_REPLY, payload: { replyId } });
  } catch (err) {
    setErrorPostAction("backend");
  }
};

export const getCommentsAction = (postId: number) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  clearErrorPostAction();
  try {
    const { error, comments, sessionExpired } = await getComments(postId);
    if (sessionExpired) return setSessionExpiredAction(sessionExpired);
    if (error) return setErrorPostAction(error);
    dispatch({ type: actionTypes.GET_COMMENTS, payload: comments });
  } catch (err) {
    setErrorPostAction("backend");
  }
};

export const getRepliesAction = (arr: number[]) => async (dispatch: ThunkDispatch<IPostState, any, Action | clearAction>) => {
  try {
    const { error, replies, sessionExpired } = await getReplies(arr);
    if (sessionExpired) return setSessionExpiredAction(sessionExpired);
    if (error) return setErrorPostAction(error);
    console.log(replies);
    dispatch({ type: actionTypes.GET_REPLIES, payload: replies });
  } catch (err) {
    console.log("error get replies", err);
    setErrorPostAction("backend");
  }
};

export const resetRepliesAction = () => (dispatch: Dispatch<clearAction>) => {
  dispatch({ type: actionTypes.RESET_REPLIES });
};

export const clearPreviewImgAction = () => (dispatch: Dispatch<clearAction>) => {
  dispatch({ type: actionTypes.CLEAR_PREVIEW_IMG });
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
