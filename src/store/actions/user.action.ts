import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  createUser,
  deleteUser,
  deleteUserpic,
  editUserName,
  followUser,
  getFollowers,
  getMods,
  getRecentUsers,
  getSearchResults,
  likePost,
  logUser,
  saveUserName,
  saveUserPic,
} from "../../API/users";
import { actionTypes } from "../constants";
import { Action, basicAction, clearAction, IUserState } from "../types";

export const toggleVisitorModalAction = (message: string) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.TOGGLE_VISITOR, payload: message });
};

export const setLanguageAction = (lang: string) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.SET_LANGUAGE, payload: lang });
};

export const logUserAction =
  (email: string, password: string) => async (dispatch: ThunkDispatch<IUserState, any, Action | basicAction>) => {
    dispatch(clearErrorUserAction());
    try {
      const { error, user, isNewUser, accessToken } = await logUser(email, password);
      if (error) {
        dispatch(setErrorUserAction(error));
        dispatch(loginFailAction());
        return;
      }
      dispatch({ type: actionTypes.LOG_USER, payload: { user, isNewUser } });
      localStorage.setItem("jwt", accessToken);
      dispatch(loginSuccessAction());
    } catch (err) {
      dispatch(setErrorUserAction("backend"));
    }
  };

export const createUserAction =
  (email: string, password: string, date: string) => async (dispatch: ThunkDispatch<IUserState, any, Action | basicAction>) => {
    dispatch(clearErrorUserAction());
    try {
      const { error, userId } = await createUser(email, password, date);
      if (error) {
        dispatch(setErrorUserAction(error));
        dispatch(userFailAction());
        return;
      }
      dispatch({ type: actionTypes.CREATE_USER, payload: userId });
      dispatch(userCreatedAction());
    } catch (err) {
      dispatch(setErrorUserAction("backend"));
    }
  };

export const saveUserNameAction =
  (id: number, name: string) => async (dispatch: ThunkDispatch<IUserState, any, Action | basicAction>) => {
    dispatch(clearErrorUserAction());
    try {
      const { result, error, isNewUser, accessToken } = await saveUserName(id, name);
      if (error) {
        dispatch(setErrorUserAction(error));
        dispatch(usernameFailAction());
        return;
      }
      const { username, creationDate, email, role } = result;
      localStorage.setItem("jwt", accessToken);
      dispatch({
        type: actionTypes.ADD_USERNAME,
        payload: { username, creationDate, email, role, isNewUser },
      });
      dispatch(usernameAddedAction());
      dispatch(loginSuccessAction());
    } catch (err) {
      dispatch(setErrorUserAction("backend"));
    }
  };

export const editUsernameAction =
  (userId: number, username: string) => async (dispatch: ThunkDispatch<IUserState, any, Action | basicAction>) => {
    dispatch(clearErrorUserAction());
    try {
      const { newName, error } = await editUserName(userId, username);
      if (error) return dispatch(setErrorUserAction(error));
      dispatch({ type: actionTypes.EDIT_USERNAME, payload: { newName } });
      dispatch(usernameEditedAction());
    } catch (err) {
      dispatch(setErrorUserAction("backend"));
    }
  };

export const resetUsernameEditedAction = () => (dispatch: Dispatch<basicAction>) => {
  dispatch({ type: actionTypes.USERNAME_EDITED });
};

export const saveUserPicAction =
  (blob: File, id: number, imgType: string) => async (dispatch: ThunkDispatch<IUserState, any, Action>) => {
    try {
      const { error, picUrl } = await saveUserPic(blob, id, imgType);
      if (error) return dispatch(setErrorUserAction(error));
      dispatch({ type: actionTypes.SAVE_USERPIC, payload: { picUrl, imgType } });
    } catch (err) {
      dispatch(setErrorUserAction("backend"));
    }
  };

export const clearUserpicAction =
  (id: number, imgType: string) => async (dispatch: ThunkDispatch<IUserState, any, Action | basicAction>) => {
    try {
      const { result, error, sessionExpired } = await deleteUserpic(id, imgType);
      console.log(result);
      if (sessionExpired) return dispatch(sessionExpiredAction(sessionExpired));
      if (error) return dispatch(setErrorUserAction(error));
      dispatch({ type: actionTypes.CLEAR_USERPIC, payload: imgType });
    } catch (err) {
      dispatch(setErrorUserAction("backend"));
    }
  };

export const likePostAction =
  (origin: string, userId: number, id: number, like: boolean) => async (dispatch: ThunkDispatch<IUserState, any, Action>) => {
    dispatch(clearErrorUserAction());
    try {
      const { liked, sessionExpired, error } = await likePost(origin, userId, id, like);
      if (sessionExpired) return dispatch(sessionExpiredAction(sessionExpired));
      if (error) return dispatch(setErrorUserAction(error));
      dispatch({ type: actionTypes.LIKE_POST, payload: liked });
    } catch (err) {
      dispatch(setErrorUserAction("backend"));
    }
  };

export const toCommentAction = (postId: number) => (dispatch: Dispatch<Action | clearAction>) => {
  // ❌
  clearErrorUserAction();
  dispatch({
    type: actionTypes.TO_COMMENT,
    payload: postId,
  });
};

export const setProfileVisitIdAction = (id: number) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.SET_PROFILE_ID, payload: id });
};

export const getRecentUsersAction = () => async (dispatch: ThunkDispatch<IUserState, any, Action>) => {
  dispatch(clearErrorUserAction());
  try {
    const { recentUsers, sessionExpired, error } = await getRecentUsers();
    if (sessionExpired) return dispatch(sessionExpiredAction(sessionExpired));
    // ❌
    if (error) return dispatch(setErrorUserAction(error));
    console.log("just got recent users");
    dispatch({ type: actionTypes.GET_USERS, payload: { recentUsers } });
  } catch (err) {
    console.log("error catch", err);
    dispatch(setErrorUserAction("backend"));
  }
};

export const getModsAction = () => async (dispatch: ThunkDispatch<IUserState, any, Action>) => {
  try {
    const { mods, error, sessionExpired } = await getMods();
    if (sessionExpired) return dispatch(sessionExpiredAction(sessionExpired));
    // ❌
    if (error) return dispatch(setErrorUserAction(error));
    dispatch({ type: actionTypes.GET_MODS, payload: { mods } });
  } catch (err) {
    dispatch(setErrorUserAction("backend"));
  }
};

export const deleteUserAction = (id: number) => async (dispatch: ThunkDispatch<IUserState, any, Action | basicAction>) => {
  try {
    const { status, error, sessionExpired } = await deleteUser(id);
    if (sessionExpired) return dispatch(sessionExpiredAction(sessionExpired));
    if (error) return dispatch(setErrorUserAction(error));
    if (status === 200) return dispatch({ type: actionTypes.DELETE_USER });
  } catch (err) {
    dispatch(setErrorUserAction("backend"));
  }
};

export const setErrorUserAction = (error: string) => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.SET_ERROR_USER, payload: error });
};

export const clearErrorUserAction = () => (dispatch: Dispatch<clearAction>) => {
  dispatch({ type: actionTypes.CLEAR_ERROR_USER });
};

export const toggleDarkModeAction = () => (dispatch: Dispatch<basicAction>) => {
  dispatch({ type: actionTypes.TOGGLE_DARK_MODE });
};

export const followUserAction =
  (myId: number, userId: number, bool: boolean) => async (dispatch: ThunkDispatch<IUserState, any, Action>) => {
    try {
      const { msg, error } = await followUser(myId, userId, bool);
      if (error) return dispatch(setErrorUserAction("backend"));
      if (msg) {
        return dispatch({ type: actionTypes.UPDATE_FOLLOW, payload: { myId, userId, bool } });
      }
    } catch (error) {
      dispatch(setErrorUserAction("backend"));
    }
  };

export const getFollowersAction = (id: number) => async (dispatch: ThunkDispatch<IUserState, any, Action>) => {
  try {
    const { followers, following, error } = await getFollowers(id);
    if (error) return dispatch(setErrorUserAction("backend"));
    dispatch({ type: actionTypes.GET_FOLLOWERS, payload: { followers, following } });
  } catch (error) {
    dispatch(setErrorUserAction("backend"));
  }
};

export const setSearchQueryAction =
  (query: string, filter?: string) => async (dispatch: ThunkDispatch<IUserState, any, Action>) => {
    try {
      const { results, error } = await getSearchResults(query, filter);
      if (error) return dispatch(setErrorUserAction("backend"));
      dispatch({ type: actionTypes.SET_SEARCH_QUERY, payload: { query, filter } });
      dispatch({ type: actionTypes.GET_SEARCH_RESULTS, payload: results });
    } catch (error) {
      console.log(error);
      dispatch(setErrorUserAction("backend"));
    }
  };

export const loginFailAction = () => (dispatch: Dispatch<basicAction>) => {
  dispatch({ type: actionTypes.LOGIN_FAIL });
};
export const loginSuccessAction = () => (dispatch: Dispatch<basicAction>) => {
  dispatch({ type: actionTypes.LOGIN_SUCCESS });
};
export const userFailAction = () => (dispatch: Dispatch<basicAction>) => {
  dispatch({ type: actionTypes.USER_FAIL });
};
export const userCreatedAction = () => (dispatch: Dispatch<basicAction>) => {
  dispatch({ type: actionTypes.USER_CREATED });
};
export const usernameFailAction = () => (dispatch: Dispatch<basicAction>) => {
  dispatch({ type: actionTypes.USERNAME_FAIL });
};
export const usernameAddedAction = () => (dispatch: Dispatch<basicAction>) => {
  dispatch({ type: actionTypes.USERNAME_ADDED });
};
export const usernameEditedAction = () => (dispatch: Dispatch<basicAction>) => {
  dispatch({ type: actionTypes.USERNAME_EDITED });
};
export const sessionExpiredAction = (bool: boolean) => (dispatch: Dispatch<basicAction>) => {
  dispatch({ type: actionTypes.SESSION_EXPIRED, payload: bool });
};
