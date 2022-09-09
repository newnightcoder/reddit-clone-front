import { ChangeEventHandler, FocusEventHandler, FormEventHandler, MouseEventHandler } from "react";
import { IFollower, IPost, IUser, ScrapedPost } from "../store/types";

interface IGifModalProps {
  gifModalOpen: boolean;
  toggleGifModal: (e) => void;
  deletePostPreview: () => void;
}

interface ImgUploaderProps {
  profile?: boolean;
  imgType?: string;
  imgUploadModalOpen?: boolean;
  toggleImgUploadModal?: () => void;
  deletePostPreview?: () => void;
}

interface BtnModalProps {
  blobName: string;
  imgType: string;
  btnModalOpen: bool;
  toggleBtnModal: () => void;
  toggleImgModal?: () => void;
  setBlob: React.Dispatch<React.SetStateAction<File | null>>;
  setBlobName: React.Dispatch<React.SetStateAction<string>>;
}

interface MenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

interface SettingsOptionsProps {
  isSettingsOpen: boolean;
  isMenuOpen?: boolean;
  langLabel: string[];
  appearanceLabel: string[];
  langOptions: string[];
  modeOptions: string[];
  isActive?: string;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SettingsProps {
  settingsOpen?: boolean;
  isMenuOpen?: boolean;
  children?: JSX.Element;
  toggleSettings?: () => void;
}

interface SkeletonProps {
  element: string;
  number: number;
  mod?: bool;
  aside?: bool;
}

interface PostProps {
  post: IPost;
  aside?: boolean;
}

interface PostFooterProps {
  likesNumber: number;
  commentsNumber: number;
  postId: number;
  like: boolean;
  optionsOpen?: boolean;
  optionsBtnRef: React.MutableRefObject<HTMLButtonElement | null>;
  toCommentPage: () => void;
  toggleOptions: () => void;
  handleLike: (id: number) => void;
}

interface FormProps {
  title?: string;
  postToEdit?: IPost;
  postText?: string;
  editTitle?: string;
  editText?: string;
  imgDom?: JSX.Element | null;
  editTitleRef?: React.RefObject<HTMLInputElement>;
  editTextRef?: React.RefObject<HTMLSpanElement>;
  toggleImgUploadModal?: () => void;
  toggleGifModal?: () => void;
  toggleLinkModal?: () => void;
  deletePostPreview: () => void;
  handlePostInput?: FocusEventHandler;
  handlePostSubmit?: FormEventHandler;
  handleEditPostSubmit?: FormEventHandler;
  handleEditCommentSubmit?: FormEventHandler;
  handleTitleInput?: ChangeEventHandler;
  handleEditTitleInput?: ChangeEventHandler;
  handleEditText?: ChangeEventHandler;
  handleEditCommentText?: ChangeEventHandler;
  setIsPreview?: React.Dispatch<React.SetStateAction<boolean>>;
  setImgDom?: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}

interface CommentFormProps {
  commentTextRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  handleCommentSubmit: FormEventHandler;
  handleChange: ChangeEventHandler;
}

interface ReplyFormProps {
  replyOpen: boolean;
  replyTextRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  commentRefNumber: number;
  commentId: number;
  handleReplySubmit: FormEventHandler;
  handleChange: ChangeEventHandler;
  setReplyOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LinkPreviewProps {
  linkPreview: ScrapedPost;
  aside?: boolean;
}

interface OptionsProps {
  postUserId?: number;
  postId?: number;
  commentUserId?: number;
  commentId?: number;
  replyUserId?: number;
  replyId?: number;
  optionsOpen: boolean;
  optionsRef?: React.RefObject<HTMLDivElement> | undefined;
  toggleOptions: () => void;
  toggleDeleteModal: () => void;
}

interface DeleteModalProps {
  postId?: number;
  origin: string;
  postIdComment?: number | null;
  profile?: boolean;
  profilePage?: boolean;
  toggleDeleteModal: () => void;
  toggleMenu?: () => void;
  handleDeleteProfileFromMenu?: (id: number) => void;
  handleDeleteProfile?: (id: number) => void;
  handleDeletePost?: (
    postId: DeleteModalProps["postId"],
    origin: DeleteModalProps["origin"],
    commentId: DeleteModalProps["postIdComment"],
    profile?: DeleteModalProps["profile"]
  ) => void;
}

interface FollowersProps {
  bool: boolean;
  followersOpen: boolean;
  username: string;
  userId: number;
  toggleFollowers?: () => void;
  setter: () => void;
  followersCountSetter: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface FollowersToggleProps {
  user: IUser;
  updatedFollowersCount: number;
  toggleFollowers: () => void;
}

interface navbarProps {
  settingsOpen: boolean;
  toggleMenu: () => void;
  toggleSettings: () => void;
}

interface OverlayProps {
  isMenuOpen: boolean;
  close: () => void;
}

interface ProfileBannerProps {
  user: IUser;
  loading: boolean;
  updatedFollowersCount: number;
  setUpdatedFollowersCount: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface ProfileInfoProps {
  user: IUser;
  updatedFollowersCount: number;
  btnFollowWidth: number | null;
  toggleFollowers: () => void;
}

interface ProfileOptionsProps {
  isOpen: boolean;
  profileId: number;
  toggleProfileOptions: () => void;
  toggleEditModal: () => void;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserCardProps {
  user: IUser;
  mod?: boolean;
}

interface FollowerCardProps {
  user: IFollower;
  followersCount: number;
  followersCountSetter: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface BtnFollowProps {
  profileId?: number;
  userId?: number | null;
  user: IUser | IFollower;
  count: number;
  container: string;
  btnFollowRef?: React.RefObject<HTMLButtonElement>;
  countSetter: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface ExpiredProps {
  isExpired: boolean;
  close: () => void;
}

interface SignupProps {
  isEmail: boolean;
  isLong: boolean;
  isLowercase: boolean;
  isUppercase: boolean;
  isNumber: boolean;
  handleNewUserSubmit: FormEventHandler;
  handleNewEmail: ChangeEventHandler;
  handleNewPass: ChangeEventHandler;
}

interface TabsContainerProps {
  user?: IUser;
  set1: IDataSet;
  set2: IDataSet;
  container: string;
  bool: boolean;
  setter: MouseEventHandler;
}

interface ToggleDivProps {
  dataset1: IDataSet;
  dataset2: IDataSet;
  followersCount?: number;
  container: string;
  bool: boolean;
  setter: () => void;
  followersCountSetter?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface ToggleDivContentProps {
  set1: IDataSet;
  set2: IDataSet;
  followersCount?: number;
  bool: boolean;
  followersCountSetter?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface IDataSet {
  name: string | null;
  data: IPost[] | IUser[] | IFollower[] | null;
}

interface IDatasetTypes {
  post: string;
  user: string;
  follower?: follower;
}
