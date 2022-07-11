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
  likes: [],
  error: "",
  lastPostAdded: null,
  lastDeleted: null,
  sessionExpired: false,
};

export const postsReducer: Reducer<IPostState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      const { posts, likes }: { posts: IPost[]; likes: ILike[] } = action.payload;

      return { ...state, posts, likes };
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
        scrapedPost: { title, image: image?.includes("http") ? image : "", text: description, publisher, logo, url },
      };

    case actionTypes.SET_PREVIEW_DATA:
      const scrapedPost: IScrapedPreview = action.payload;
      return { ...state, scrapedPost };

    case actionTypes.GET_COMMENTS: {
      const comments: IComment[] = action.payload;
      return { ...state, comments };
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
      const { count, newComment }: { count: number; newComment: IComment } = action.payload;
      const updatedComments = [newComment, ...state.comments];
      return {
        ...state,
        currentCommentsCount: count,
        comments: updatedComments,
      };
    }

    case actionTypes.CREATE_REPLY:
      const { newReply }: { newReply: IReply; replyId: number } = action.payload;
      const copy = [...state.comments];

      let comment = copy.filter((comment) => comment.commentId === newReply.fk_commentId)[0];
      const updatedReplies = [newReply, ...comment.replies!];
      comment = {
        ...comment,
        replies: updatedReplies,
      };
      const updatedComs = copy.map((com) => {
        if (com.commentId === comment.commentId) {
          return comment;
        } else return com;
      });
      return { ...state, comments: updatedComs };

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
                preview: {
                  title: editedPost.preview?.title,
                  text: editedPost.preview?.text,
                  image: editedPost.preview?.image,
                  publisher: editedPost.preview?.publisher,
                  url: editedPost.preview?.url,
                  logo: editedPost.preview?.logo,
                },
              };
            } else return post;
          });
          return { ...state, posts: updatedPosts };
        }
        case "comment": {
          const editedComment = edit as IComment;
          const copy = [...state.comments];
          const updatedComments = copy.map((comment) => {
            if (comment.commentId === editedComment.commentId) {
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
          let comment = [...state.comments].filter((comment) => comment.commentId === editedReply.fk_commentId)[0];
          const updatedReplies = comment.replies!.map((reply) => {
            if (reply.replyId === editedReply.replyId) {
              return {
                ...reply,
                text: editedReply.text,
              };
            } else return reply;
          });
          comment = {
            ...comment,
            replies: updatedReplies,
          };
          const updatedComs = [...state.comments].map((com) => {
            if (com.commentId === comment.commentId) {
              return comment;
            } else return com;
          });
          return { ...state, comments: updatedComs };
        }
        default:
          return { ...state };
      }
    }

    case actionTypes.SET_EDIT_ID:
      const editId: number = action.payload;
      return { ...state, editId };

    case actionTypes.CLEAR_EDIT_ID:
      return { ...state, editId: {} };

    case actionTypes.TOGGLE_EDIT_MODAL:
      const toggle: boolean = !state.editModalOpen;
      return { ...state, editModalOpen: toggle };

    case actionTypes.DELETE_POST:
      const { postId, origin }: { postId: number; origin: string } = action.payload;
      switch (origin) {
        case "post":
          const postsCopy = [...state.posts];
          const updatedPosts = postsCopy.filter((post) => post.id !== postId);
          return { ...state, posts: updatedPosts, lastDeleted: true };
        case "comment":
          const commentsCopy = [...state.comments];
          const updatedComments = commentsCopy.filter((comment) => comment.commentId !== postId);
          return { ...state, comments: updatedComments, lastDeleted: true };
        case "reply":
          let com: IComment = [...state.comments].filter((comment) =>
            comment.replies?.find((reply) => reply.replyId === postId)
          )[0];
          const replies = com.replies?.filter((reply) => reply.replyId !== postId);
          com = {
            ...com,
            replies,
          };
          const comments = [...state.comments].map((comment) => {
            if (comment.commentId === com.commentId) {
              return com;
            } else return comment;
          });
          return { ...state, comments };
        default:
          return { ...state };
      }

    case actionTypes.RESET_COMMENTS: {
      return {
        ...state,
        comments: [],
      };
    }
    case actionTypes.RESET_REPLIES: {
      return {
        ...state,
        replies: [],
      };
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
