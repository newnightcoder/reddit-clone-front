import { Reducer } from "redux";
import { PURGE } from "redux-persist";
import { actionTypes } from "../constants";
import { Action, IFollower, IUserState } from "../types";

const userState: IUserState = {
  id: null,
  email: "",
  username: "",
  picUrl: null,
  bannerUrl: null,
  creationDate: "",
  followingCount: 0,
  followersCount: 0,
  error: "",
  isAuthenticated: false,
  isVisitor: false,
  isPreviewImg: false,
  visitorMessage: "",
  language: "en",
  darkMode: false,
  userCreated: false,
  usernameAdded: false,
  usernameEdited: false,
  isNewUser: false,
  role: null,
  currentComment: {
    postId: null,
  },
  liked: false,
  currentProfileVisit: {
    id: null,
    followers: [],
    following: [],
  },
  followers: [],
  following: [],
  recentUsers: [],
  mods: [],
  searchQuery: {
    query: "",
    filter: "",
  },
  searchResults: {
    posts: null,
    users: null,
  },
  sessionExpired: false,
};

export const userReducer: Reducer<IUserState, Action> = (state = userState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_VISITOR: {
      const toggle = !state.isVisitor;
      return { ...state, isVisitor: toggle, visitorMessage: action.payload };
    }

    case actionTypes.TOGGLE_DARK_MODE: {
      const toggle = !state.darkMode;
      return {
        ...state,
        darkMode: toggle,
      };
    }

    case actionTypes.SET_LANGUAGE:
      return { ...state, language: action.payload };

    case actionTypes.LOG_USER: {
      const { id, email, username, picUrl, bannerUrl, creationDate, role, followingCount, followersCount } = action.payload.user;
      const { isNewUser } = action.payload;
      return {
        ...state,
        id,
        email,
        username,
        picUrl,
        bannerUrl,
        creationDate,
        isNewUser,
        role,
        followingCount,
        followersCount,
      };
    }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };

    case actionTypes.CREATE_USER:
      return {
        ...state,
        id: action.payload,
      };

    case actionTypes.USER_CREATED:
      return {
        ...state,
        userCreated: true,
      };

    case actionTypes.USER_FAIL:
      return {
        ...state,
        userCreated: false,
      };

    case actionTypes.ADD_USERNAME:
      const { username, email, creationDate, isNewUser, role } = action.payload;
      return {
        ...state,
        username,
        email,
        creationDate,
        isNewUser,
        role,
      };

    case actionTypes.EDIT_USERNAME:
      const { newName } = action.payload;
      return {
        ...state,
        username: newName,
      };

    case actionTypes.USERNAME_ADDED:
      return {
        ...state,
        usernameAdded: true,
      };

    case actionTypes.USERNAME_EDITED:
      return {
        ...state,
        usernameEdited: !state.usernameEdited,
      };

    case actionTypes.USERNAME_FAIL:
      return {
        ...state,
        usernameAdded: false,
      };

    case actionTypes.SAVE_USERPIC: {
      const { picUrl, imgType } = action.payload;
      return {
        ...state,
        picUrl: imgType === "pic" ? picUrl : state.picUrl,
        bannerUrl: imgType === "banner" ? picUrl : state.bannerUrl,
      };
    }
    case actionTypes.CLEAR_USERPIC: {
      const imgType: string = action.payload;
      return {
        ...state,
        picUrl: imgType === "pic" ? null : state.picUrl,
        bannerUrl: imgType === "banner" ? null : state.bannerUrl,
      };
    }
    case actionTypes.TOGGLE_PREVIEW_IMG:
      const toggle = !state.isPreviewImg;
      return {
        ...state,
        isPreviewImg: toggle,
      };

    case actionTypes.UPDATE_FOLLOW:
      const { myId, userId, bool, origin }: { myId: number; userId: number; bool: boolean; origin: string } = action.payload;
      switch (bool) {
        case true: {
          const username = state.username;
          const picUrl = state.picUrl;
          const newFollower: IFollower = {
            id: null,
            username,
            picUrl: picUrl ? picUrl : "",
            userId: myId,
          };
          const tempFollower = {
            userId: userId,
            username: "",
            picUrl: "",
            id: null,
          };
          const updatedFollowers: IFollower[] = [newFollower, ...state.currentProfileVisit.followers];
          const updatedFollowing: IFollower[] = [tempFollower, ...state.following];
          return {
            ...state,
            followingCount: state.followingCount + 1,
            following: updatedFollowing,
            currentProfileVisit: {
              ...state.currentProfileVisit,
              followers: origin === "profile" ? updatedFollowers : state.currentProfileVisit.followers,
            },
          };
        }
        case false: {
          const updatedFollowers = [...state.currentProfileVisit.followers].filter((follower) => follower.userId !== myId);
          return {
            ...state,
            followingCount: state.followingCount - 1,
            following: state.following.filter((follow) => follow.userId !== userId),
            currentProfileVisit: {
              ...state.currentProfileVisit,
              followers: origin === "profile" ? updatedFollowers : state.currentProfileVisit.followers,
            },
          };
        }
        default:
          return { ...state };
      }

    case actionTypes.TO_COMMENT:
      return {
        ...state,
        currentComment: {
          postId: action.payload,
        },
      };

    case actionTypes.GET_FOLLOWERS:
      const { id, followers, following } = action.payload;
      if (id === state.id) {
        return {
          ...state,
          followers,
          following,
        };
      } else
        return {
          ...state,
          currentProfileVisit: {
            ...state.currentProfileVisit,
            followers,
            following,
          },
        };

    case actionTypes.SET_PROFILE_ID:
      return {
        ...state,
        currentProfileVisit: {
          ...state.currentProfileVisit,
          id: action.payload,
        },
      };

    case actionTypes.GET_USERS:
      const { recentUsers } = action.payload;
      return { ...state, recentUsers };

    case actionTypes.GET_MODS:
      const { mods } = action.payload;
      return { ...state, mods };

    case actionTypes.SET_SEARCH_QUERY:
      const { query, filter } = action.payload;
      return {
        ...state,
        searchQuery: {
          query,
          filter,
        },
      };
    case actionTypes.CLEAR_SEARCH_QUERY:
      return {
        ...state,
        searchResults: {
          posts: null,
          users: null,
        },
      };

    case actionTypes.GET_SEARCH_RESULTS:
      const results = action.payload;
      return {
        ...state,
        searchResults: {
          posts: results.posts,
          users: results.users,
        },
      };

    case actionTypes.DELETE_USER:
      return {
        ...state,
      };
    case actionTypes.CLEAR_ERROR_USER:
      return {
        ...state,
        error: "",
      };
    case actionTypes.SET_ERROR_USER:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.SESSION_EXPIRED:
      return { ...state, sessionExpired: action.payload };

    case PURGE:
      return {
        ...userState,
        darkMode: state.darkMode,
      };

    default:
      return state;
  }
};
