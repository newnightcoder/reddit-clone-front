import { Reducer } from "redux";
import { PURGE } from "redux-persist";
import { actionTypes } from "../constants";
import { Action, IComment, ILike, IPost, IPostState, IReply, ScrapedPost } from "../types";

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
      const scrapedPost: ScrapedPost = action.payload;
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
      const str = action.payload;
      return {
        ...state,
        scrapedPost: {
          ...state.scrapedPost,
          image: str === "image" ? null : state.scrapedPost.image,
          logo: str === "logo" ? null : state.scrapedPost.logo,
        },
      };

    case actionTypes.CREATE_POST: {
      const newPost: IPost = action.payload;
      return {
        ...state,
        posts: [newPost, ...state.posts],
        lastPostAdded: newPost.id!,
      };
    }

    case actionTypes.CREATE_COMMENT: {
      const { count, newComment }: { count: number; newComment: IComment } = action.payload;
      const updatedComments = [newComment, ...state.comments];
      const updatedPosts = [...state.posts].map((post) => {
        if (post.id === newComment.fk_postId_comment) {
          return {
            ...post,
            engagement: {
              ...post.engagement!,
              commentCount: post.engagement!.commentCount + 1,
            },
          };
        } else return post;
      });
      return {
        ...state,
        currentCommentsCount: count,
        posts: updatedPosts,
        comments: updatedComments,
      };
    }

    case actionTypes.CREATE_REPLY:
      const { newReply }: { newReply: IReply; replyId: number } = action.payload;
      const comment = [...state.comments].filter((comment) => comment.commentId === newReply.fk_commentId)[0];
      const updatedReplies = [newReply, ...comment.replies!];
      const updatedComment = {
        ...comment,
        replyCount: comment.replyCount! + 1,
        replies: updatedReplies,
      };
      const updatedComs = [...state.comments].map((com) => {
        if (com.commentId === updatedComment.commentId) {
          return updatedComment;
        } else return com;
      });
      return { ...state, comments: updatedComs };

    case actionTypes.LIKE_POST: {
      const { userId, id, like, origin }: { userId: number; id: number; like: boolean; origin: string } = action.payload;
      switch (like) {
        case false:
          switch (origin) {
            case "post":
              const updatedPosts = [...state.posts].map((post) => {
                if (post.id === id) {
                  return {
                    ...post,
                    engagement: {
                      ...post.engagement!,
                      likesCount: post.engagement!.likesCount + 1,
                    },
                  };
                } else return post;
              });
              return {
                ...state,
                posts: updatedPosts,
                likes: [{ userId, postId: id }, ...state.likes],
              };
            case "comment":
              const updatedComments = [...state.comments].map((comment) => {
                if (comment.commentId === id) {
                  return {
                    ...comment,
                    likesCount: comment.likesCount! + 1,
                  };
                } else return comment;
              });
              return {
                ...state,
                comments: updatedComments,
                likes: [{ userId, commentId: id }, ...state.likes],
              };
            case "reply": {
              const parentComment = [...state.comments].find((comment) => {
                comment.replies?.find((reply) => reply.replyId === id);
              }) as IComment;
              const updatedComments = [...state.comments].map((comment) => {
                if (comment.commentId === parentComment!.commentId) {
                  return {
                    ...parentComment,
                    replies: parentComment.replies?.map((reply) => {
                      if (reply.replyId === id) {
                        return {
                          ...reply,
                          likesCount: reply.likesCount! + 1,
                        };
                      } else return reply;
                    }),
                  };
                } else return comment;
              });
              return {
                ...state,
                comments: updatedComments,
                likes: [{ userId, replyId: id }, ...state.likes],
              };
            }
            default:
              return { ...state };
          }
        case true:
          switch (origin) {
            case "post": {
              const updatedPosts = [...state.posts].map((post) => {
                if (post.id === id) {
                  return {
                    ...post,
                    engagement: {
                      ...post.engagement!,
                      likesCount: post.engagement!.likesCount - 1,
                    },
                  };
                } else return post;
              });
              return {
                ...state,
                posts: updatedPosts,
                likes: state.likes.filter((like) => like.postId !== id),
              };
            }
            case "comment": {
              const updatedComments = [...state.comments].map((comment) => {
                if (comment.commentId === id) {
                  return {
                    ...comment,
                    likesCount: comment.likesCount! - 1,
                  };
                } else return comment;
              });
              return {
                ...state,
                comments: updatedComments,
                likes: state.likes.filter((like) => like.commentId !== id),
              };
            }
            case "reply": {
              const comment = [...state.comments].find((comment) => {
                comment.replies?.find((reply) => reply.replyId === id);
              });
              const updatedComments = [...state.comments].map((com) => {
                if (com.commentId === comment!.commentId) {
                  return {
                    ...com,
                    replies: com.replies?.map((reply) => {
                      if (reply.replyId === id) {
                        return {
                          ...reply,
                          likesCount: reply.likesCount! - 1,
                        };
                      } else return reply;
                    }),
                  };
                } else return com;
              });
              return {
                ...state,
                comments: updatedComments,
                likes: state.likes.filter((like) => like.replyId !== id),
              };
            }
            default:
              return { ...state };
          }
      }
    }

    case actionTypes.EDIT_POST: {
      const { edit, origin, profile }: { edit: IPost | IComment | IReply; origin: string; profile: boolean } = action.payload;
      switch (origin) {
        case "post": {
          const editedPost = edit as IPost;
          const updatedPosts = [...state.posts].map((post) => {
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
          const updatedUserPosts = [...state.userPosts].map((post) => {
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

          return { ...state, posts: updatedPosts, userPosts: profile ? updatedUserPosts : state.userPosts };
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
      const editId: { id: number; type: string } = action.payload;
      return { ...state, editId };

    case actionTypes.CLEAR_EDIT_ID:
      return { ...state, editId: {} };

    case actionTypes.TOGGLE_EDIT_MODAL:
      const toggle: boolean = !state.editModalOpen;
      return { ...state, editModalOpen: toggle };

    case actionTypes.DELETE_POST:
      const { postId, postIdComment, origin }: { postId: number; postIdComment: number; origin: string } = action.payload;
      switch (origin) {
        case "post":
          return { ...state, posts: state.posts.filter((post) => post.id !== postId), lastDeleted: true };
        case "comment": {
          const parentPost = [...state.posts].find((post) => post.id === postIdComment);
          const updatedPosts = [...state.posts].map((post) => {
            if (post.id === parentPost!.id) {
              return {
                ...post,
                engagement: {
                  ...post.engagement!,
                  commentCount: post.engagement!.commentCount - 1,
                },
              };
            } else return post;
          });
          const updatedComments = [...state.comments].filter((comment) => comment.commentId !== postId);
          return { ...state, posts: updatedPosts, comments: updatedComments, lastDeleted: true };
        }
        case "reply": {
          let parentComment = [...state.comments].find((comment) =>
            comment.replies?.find((reply) => reply.replyId === postId)
          ) as IComment;
          const replies = parentComment!.replies?.filter((reply) => reply.replyId !== postId);
          parentComment = {
            ...parentComment,
            replyCount: parentComment.replyCount! - 1,
            replies,
          };
          const comments = [...state.comments].map((com) => {
            if (com.commentId === parentComment.commentId) {
              return parentComment;
            } else return com;
          });
          return { ...state, comments };
        }
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
