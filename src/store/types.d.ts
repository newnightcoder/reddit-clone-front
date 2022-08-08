import { RootState } from "./reducers/root.reducer";

/* This is called module augmentation - as explained in node_modules/@types/react-redux/index.d.ts : 
To be able to use redux hooks (useDispatch, useSelector) 
without having to type the state each time or type useDispatch into useAppDispatch etc...😎
Thank you stackoverflow! 🚀👌🏾 
https://stackoverflow.com/a/64226376/12209569 */

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}

///////////////////////
///   POST STATE   ///
//////////////////////

interface IPostState {
  posts: IPost[];
  userPosts: IPost[];
  tempPostImg: string;
  editId: Edit;
  editModalOpen: boolean;
  previewLoading: boolean;
  scrapedPost: IScrapedPost;
  comments: IComment[];
  currentCommentsCount: number | null;
  likes: ILike[];
  error: string;
  lastPostAdded: number | null;
  lastDeleted: boolean | null;
  sessionExpired: boolean;
}

interface IPost {
  id?: number;
  author: PostAuthor;
  title: string;
  text: string | null;
  date: string;
  imgUrl?: string;
  isPreview: boolean;
  preview?: ScrapedPost;
  engagement?: PostEngagement;
}

type PostAuthor = {
  id?: number;
  username?: string;
  picUrl?: string;
};

interface PostEngagement {
  likesCount: number;
  commentCount: number;
}

type ScrapedPost = {
  title?: string;
  image?: string;
  text?: string;
  publisher?: string;
  logo?: string;
  url?: string;
};

interface IComment {
  commentId?: number;
  fk_userId_comment: number;
  fk_postId_comment: number;
  username?: string;
  picUrl?: string;
  text: string;
  date: string;
  likesCount?: number;
  replyCount?: number;
  replies?: IReply[];
}

interface IReply {
  replyId?: number;
  fk_commentId: number;
  fk_userId_reply: number;
  username?: string;
  picUrl?: string;
  text: string;
  date: string;
  likesCount?: number;
}

interface IEdit {
  id: number;
  text: string;
}

interface ILike {
  userId: number;
  postId?: number;
  commentId?: number;
  replyId?: number;
}

///////////////////////
///   USER STATE   ///
//////////////////////

interface IUser {
  id: number;
  email: string;
  username: string;
  picUrl: string | null;
  bannerUrl: string | null;
  creationDate: string;
  followingCount: number;
  followersCount: number;
  role: string;
}

interface IFollower {
  id: number | null;
  username: string;
  picUrl?: string;
  userId: number;
}

interface IUserState {
  id: number | null;
  email: string;
  username: string;
  picUrl: string | null;
  bannerUrl: string | null;
  creationDate: string;
  followingCount: number;
  followersCount: number;
  error: string;
  isAuthenticated: boolean;
  isVisitor: boolean;
  isPreviewImg: boolean;
  visitorMessage: string;
  language: string;
  darkMode: boolean;
  userCreated: boolean;
  usernameAdded: boolean;
  usernameEdited: boolean;
  isNewUser: boolean;
  greetingsAnimationPlayed: boolean;
  role: string | null;
  currentComment: {
    postId: number | null;
  };
  liked: boolean;
  currentProfileVisit: {
    id: number | null;
    followers: IFollower[];
    following: IFollower[];
  };
  followers: IFollower[];
  following: IFollower[];
  recentUsers: IUser[];
  mods: IUser[];
  searchQuery: {
    query: string;
    filter?: string;
  };
  searchResults: {
    posts: IPost[] | null;
    users: IUser[] | null;
  };
  sessionExpired: boolean;
}

interface IState {
  user: IUserState;
  posts: IPostState;
}

///////////////////////
///     ACTIONS    ///
//////////////////////

type Action = {
  type: string;
  payload: any;
};

type clearAction = {
  type: string;
};

type toggleAction = {
  type: string;
};
type basicAction = {
  type: string;
};
