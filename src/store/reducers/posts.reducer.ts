import { Reducer } from "redux";
import { PURGE } from "redux-persist";
import { actionTypes } from "../constants";
import { Action, IComment, ILike, IPost, IPostState, IReply, IScrapedPreview } from "../types";

const initialState: IPostState = {
  posts: [],
  userPosts: [],
  tempPostImg: "",
  editId: { id: null, type: null },
  editModalOpen: false,
  previewLoading: false,
  scrapedPost: {},
  comments: [],
  currentCommentsCount: null,
  replies: [],
  likes: [],
  error: "",
  lastPostAdded: null,
  lastReplyAdded: null,
  lastDeleted: null,
  sessionExpired: false,
};

export const postsReducer: Reducer<IPostState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      const { posts, likes }: { posts: IPost[]; likes: ILike[] } = action.payload;
      const postsInOrder = posts.sort((a, b) => {
        if (a.id! < b.id!) return 1;
        if (a.id! > b.id!) return -1;
        return 0;
      });

      return { ...state, posts: postsInOrder, likes };

    case actionTypes.GET_LIKES: {
      const likes: ILike[] = action.payload;
      return { ...state, likes };
    }

    case actionTypes.GET_USER_POSTS: {
      const { posts, likes }: { posts: IPost[]; likes: ILike[] } = action.payload;
      return { ...state, userPosts: posts, likes };
    }

    case actionTypes.SET_PREVIEW_LOADER:
      const previewLoading: boolean = action.payload;
      return { ...state, previewLoading };

    case actionTypes.GET_PREVIEW_DATA:
      const {
        title,
        image,
        description,
        publisher,
        logo,
        url,
      }: { title?: string; image?: string; description?: string; publisher?: string; logo?: string; url?: string } =
        action.payload;
      return {
        ...state,
        scrapedPost: { title, image: image?.includes("http") ? image : "", description, publisher, logo, url },
      };

    case actionTypes.SET_PREVIEW_DATA:
      const scrapedPost: IScrapedPreview = action.payload;
      return { ...state, scrapedPost };

    case actionTypes.GET_COMMENTS: {
      const comments: IComment[] = action.payload;
      return { ...state, comments };
    }

    case actionTypes.GET_REPLIES: {
      const replies: IReply[] = action.payload;
      const copy = state.replies.length > 0 ? [...state.replies] : [];
      if (replies.length > 0) {
        replies.forEach((reply) => {
          copy.push(reply);
        });
      } else return { ...state };
      return { ...state, replies: copy };
    }

    case actionTypes.RESET_REPLIES: {
      return {
        ...state,
        replies: [],
      };
    }

    case actionTypes.SAVE_POST_PIC: {
      const tempPostImg: string = action.payload;
      return { ...state, tempPostImg };
    }

    case actionTypes.SAVE_GIF_URL: {
      const tempPostImg: string = action.payload;
      return { ...state, tempPostImg };
    }

    case actionTypes.CLEAR_TEMP_POST_PIC: {
      return { ...state, tempPostImg: "" };
    }

    case actionTypes.CLEAR_TEMP_PREVIEW:
      return { ...state, scrapedPost: {} };

    case actionTypes.CLEAR_PREVIEW_IMG:
      return {
        ...state,
        scrapedPost: {
          ...state.scrapedPost,
          image: "",
        },
      };

    case actionTypes.CREATE_POST: {
      const post: IPost = action.payload;
      return {
        ...state,
        posts: [post, ...state.posts],
        lastPostAdded: post.id!,
      };
    }

    case actionTypes.CREATE_COMMENT: {
      const count: number = action.payload;
      return {
        ...state,
        currentCommentsCount: count,
      };
    }

    case actionTypes.CREATE_REPLY:
      const lastReplyAdded: number = action.payload;
      return { ...state, lastReplyAdded };

    case actionTypes.EDIT_POST: {
      const { edit, origin }: { edit: IPost | IComment | IReply; origin: string } = action.payload;
      switch (origin) {
        case "post": {
          const editedPost = edit as IPost;
          const copy = [...state.posts];
          const updatedPosts = copy.map((post) => {
            if (post.id === editedPost.id) {
              return {
                ...post,
                title: editedPost.title,
                text: editedPost.text,
                imgUrl: editedPost.imgUrl,
                isPreview: editedPost.isPreview,
                previewTitle: editedPost?.preview?.title,
                previewText: editedPost?.preview?.description,
                previewImg: editedPost?.preview?.image,
                previewPub: editedPost?.preview?.publisher,
                previewUrl: editedPost?.preview?.url,
                previewPubLogo: editedPost?.preview?.logo,
              };
            } else return post;
          });
          return { ...state, posts: updatedPosts };
        }
        case "comment": {
          const editedComment = edit as IComment;
          const copy = [...state.comments];
          const updatedComments = copy.map((comment) => {
            if (comment.id === editedComment.id) {
              return {
                ...comment,
                text: editedComment.text,
              };
            } else return comment;
          });
          return { ...state, comments: updatedComments };
        }
        case "reply": {
          const editedReply = edit as IReply;
          const copy = [...state.replies];
          const updatedReplies = copy.map((reply) => {
            if (reply.id === editedReply.id) {
              return {
                ...reply,
                text: editedReply.text,
              };
            } else return reply;
          });
          return { ...state, replies: updatedReplies };
        }
        default:
          return { ...state };
      }
    }

    case actionTypes.SET_EDIT_ID:
      const editId: number = action.payload;
      return { ...state, editId };

    case actionTypes.TOGGLE_EDIT_MODAL:
      const toggle: boolean = !state.editModalOpen;
      return { ...state, editModalOpen: toggle };

    case actionTypes.DELETE_POST: {
      const postId: number = action.payload;
      const copy = [...state.posts];
      const updatedPosts = copy.filter((post) => post.id !== postId);
      return { ...state, posts: updatedPosts, lastDeleted: true };
    }

    case actionTypes.SET_ERROR_POST:
      const error: string = action.payload;
      return { ...state, error };

    case actionTypes.CLEAR_ERROR_POST:
      return { ...state, error: "" };

    case actionTypes.CLEAN_PROFILE_POSTS:
      return { ...state, userPosts: [] };

    case actionTypes.CLEAR_LAST_ADDED:
      return { ...state, lastPostAdded: null };

    case actionTypes.SESSION_EXPIRED:
      const sessionExpired: boolean = action.payload;
      return { ...state, sessionExpired };

    case PURGE:
      return initialState;

    default:
      return state;
  }
};
