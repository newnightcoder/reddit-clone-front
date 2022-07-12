import { ChangeEventHandler, FocusEventHandler, FormEventHandler, MouseEventHandler } from "react";
import { IFollower, IPost, IScrapedPreview, IUser } from "../store/types";

interface IGifModalProps {
  gifModalOpen: boolean;
  toggleGifModal: (e) => void;
  deletePreview: () => void;
}

interface ImgUploaderProps {
  profile?: boolean;
  imgType?: string;
  imgUploadModalOpen?: boolean;
  toggleImgUploadModal?: () => void;
  deletePreview?: () => void;
}

interface MenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

interface SettingsOptionsProps {
  isSettingsOpen: boolean;
  isMenuOpen?: boolean;
  langOptions: string[];
  modeOptions: string[];
  toggleOption?: (option: string) => void;
  isActive?: string;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SettingsProps {
  settingsOpen?: boolean;
  isMenuOpen?: boolean;
  toggleSettings?: () => void;
  children?: JSX.Element;
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
  toggleOptions: () => void;
  toCommentPage: () => void;
  likesNumber: number;
  commentsNumber: number;
  handleLike: (id: number) => void;
  postId: number;
  like: boolean;
  optionsOpen?: boolean;
  optionsBtnRef: React.MutableRefObject<HTMLButtonElement | null>;
}

interface FormProps {
  title?: string;
  handlePostSubmit?: FormEventHandler;
  handleTitleInput?: ChangeEventHandler;
  toggleImgUploadModal?: () => void;
  toggleGifModal?: () => void;
  toggleLinkModal?: () => void;
  handlePostInput?: FocusEventHandler;
  postToEdit?: IPost;
  postTitle?: string;
  postText?: string;
  editText?: string;
  imgDom?: JSX.Element | null;
  setIsPreview?: React.Dispatch<React.SetStateAction<boolean>>;
  setImgDom?: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  deletePreview?: () => void;
  handleEditPostSubmit?: FormEventHandler;
  handleEditCommentSubmit?: FormEventHandler;
  handleEditTitleInput?: ChangeEventHandler;
  handleEditText?: ChangeEventHandler;
  handleEditCommentText?: ChangeEventHandler;
}

interface CommentFormProps {
  handleCommentSubmit: FormEventHandler;
  handleChange: ChangeEventHandler;
  commentTextRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

interface ReplyFormProps {
  handleReplySubmit: FormEventHandler;
  replyOpen: boolean;
  setReplyOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: ChangeEventHandler;
  replyTextRef: React.RefObject<HTMLTextAreaElement>;
  commentRefNumber: number;
  commentId: number;
}

interface LinkPreviewProps {
  linkPreview: IPreview & IScrapedPreview;
  aside?: boolean;
}

interface OptionsProps {
  postUserId?: number;
  postId?: number;
  commentUserId?: number;
  commentId?: number;
  replyUserId?: number;
  replyId?: number;
  toggleOptions: () => void;
  toggleDeleteModal: () => void;
  optionsOpen: boolean;
  optionsRef?: LegacyRef<HTMLDivElement> | undefined;
}

interface DeleteModalProps {
  toggleDeleteModal: () => void;
  origin: string;
  handleDeletePost?: (postId: number, origin: string, id: number | null) => void;
  postId?: number;
  postIdComment?: number;
  handleDeleteProfile?: (id: number) => void;
  handleDeleteProfileFromMenu?: (id: number) => void;
  toggleMenu?: () => void;
}

interface FollowersProps {
  bool: boolean;
  toggleFollowers?: () => void;
  setter: MouseEventHandler;
  followersOpen: boolean;
  username: string;
  userId: number;
}

interface FollowersToggleProps {
  setIsFollowersClicked: React.Dispatch<React.SetStateAction<boolean>>;
  toggleFollowers: () => void;
  user: IUser;
  updatedFollowersCount: number;
}

interface navbarProps {
  toggleSettings: () => void;
  settingsOpen: boolean;
  toggleMenu: () => void;
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
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProfileOptionsProps {
  toggleProfileOptions: () => void;
  toggleEditModal: () => void;
  profileId: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserCardProps {
  user: IUser;
  mod?: boolean;
}

interface FollowerCardProps {
  user: IFollower;
  // btnFollowStatus: boolean;
  followersCount: number;
  followersCountSetter: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface BtnFollowProps {
  profileId: number;
  count: number;
  countSetter: React.Dispatch<React.SetStateAction<number | undefined>>;
  container: string;
}

interface ExpiredProps {
  isExpired: boolean;
  close: () => void;
}

interface SignupProps {
  handleNewEmail: ChangeEventHandler;
  handleNewPass: ChangeEventHandler;
  handleNewUserSubmit: FormEventHandler;
  isEmail: boolean;
  isLong: boolean;
  isLowercase: boolean;
  isUppercase: boolean;
  isNumber: boolean;
}

interface TabsContainerProps {
  user?: IUser;
  bool: boolean;
  setter: MouseEventHandler;
  //React.Dispatch<React.SetStateAction<boolean>>;
  length1: number;
  length2: number;
  container: string;
}

interface ToggleDivProps {
  bool: boolean;
  setter: MouseEventHandler;
  //React.Dispatch<React.SetStateAction<boolean>>;
  dataset1: IDataSet;
  dataset2: IDataSet;
  followersCountSetter?: React.Dispatch<React.SetStateAction<number | undefined>>;
  followersCount?: number;
  container: string;
}

interface ToggleDivContentProps {
  bool: boolean;
  set1: IDataSet;
  set2: IDataSet;
  followersCountSetter?: React.Dispatch<React.SetStateAction<number | undefined>>;
  followersCount?: number;
}

interface IDataSet {
  name: string;
  data: IPost[] | IUser[] | IFollower[];
}

interface IDatasetTypes {
  post: string;
  user: string;
  follower?: follower;
}
