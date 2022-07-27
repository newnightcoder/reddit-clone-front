import { ChevronDoubleRightIcon, XIcon } from "@heroicons/react/solid";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearTempPostImgAction } from "../store/actions/posts.action";
import { clearUserpicAction, toggleIsPreviewImgAction } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import { useLanguage } from "../utils/hooks";
import { BtnModalProps } from "./react-app-env";

const ImgUploaderBtnModal = ({
  btnModalOpen,
  toggleBtnModal,
  toggleImgModal,
  setBlob,
  setBlobName,
  imgType,
  blobName,
}: BtnModalProps) => {
  const { editId } = useSelector((state) => state.posts);
  const { id: userId, picUrl, bannerUrl, isPreviewImg } = useSelector((state) => state.user);
  const userLanguage = useLanguage();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const profilePage = pathname.includes("/profile");
  const signupPage = pathname === "/signup";
  const createPostPage = pathname === "/create";
  const editModal = editId.id ? true : false;

  const toFeedPage = useCallback(() => {
    if (!signupPage) return;
    setBlobName("");
    setBlob(null);
    setTimeout(() => {
      history.push("/feed");
    }, 300);
  }, [signupPage, setBlobName, setBlob, history]);

  const backToOptions = useCallback(() => {
    if (!profilePage) return;
    toggleBtnModal();
  }, [profilePage, toggleBtnModal]);

  const backToPostForm = useCallback(() => {
    if (profilePage || signupPage) return;
    toggleBtnModal();
    toggleImgModal!()!;
  }, [createPostPage, toggleBtnModal, toggleImgModal]);

  const handleSaveBtn = useCallback(() => {
    if (signupPage || profilePage) {
      dispatch(toggleIsPreviewImgAction());
    }
    if (signupPage) return toFeedPage();
    if (profilePage) return backToOptions();
    if (createPostPage || editModal) return backToPostForm();
  }, [dispatch, signupPage, createPostPage, editModal, profilePage, toFeedPage, backToPostForm, backToOptions]);

  const handleDeleteBtn = useCallback(() => {
    if (signupPage || profilePage) {
      dispatch(clearUserpicAction(userId!, imgType));
    } else if (createPostPage || editModal) {
      dispatch(clearTempPostImgAction());
      toggleBtnModal();
      toggleImgModal!();
    }
  }, [
    dispatch,
    toggleBtnModal,
    toggleImgModal,
    userId,
    imgType,
    signupPage,
    profilePage,
    createPostPage,
    editModal,
    picUrl,
    bannerUrl,
    blobName,
  ]);

  return (
    <div
      className={`${btnModalOpen ? "flex z-100" : "hidden -z-10"}  ${
        signupPage ? "w-max bg-gray-200 dark:bg-gray-700 px-4" : " w-full px-2 bg-black"
      } absolute inset-0 mx-auto h-full flex-col items-center justify-center  space-y-2 pb-2`}
    >
      <button
        type="button"
        onClick={toggleBtnModal}
        className="h-max absolute top-2 right-2 flex items-center justify-center outline-none"
      >
        <XIcon className="h-5 text-white" />
      </button>
      <span
        className={`${
          signupPage
            ? "w-full text-sm text-black dark:text-white"
            : profilePage
            ? "h-8 w-[19ch] self-start pl-2 truncate text-xs text-white"
            : "text-xs text-white"
        } italic text-center`}
      >
        {blobName}
      </span>
      <div
        className={` w-full h-full flex flex-col items-center justify-center ${
          signupPage || createPostPage || editModal ? "space-y-4" : "space-y-2"
        }`}
      >
        <button
          type="submit"
          className={`block text-white ${
            profilePage ? "w-full text-xs" : "md:w-48 text-sm"
          } py-2 px-4 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none`}
        >
          {userLanguage.imgUploader.preview}
        </button>
        <label
          htmlFor={imgType}
          onClick={() => dispatch(toggleIsPreviewImgAction())}
          className={`flex items-center justify-center text-white ${
            profilePage ? "w-full text-xs" : "md:w-48 text-sm"
          } py-2 px-4 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none`}
        >
          <span className="whitespace-nowrap">{userLanguage.imgUploader.changeBtn}</span>
        </label>
        <button
          type="button"
          disabled={!isPreviewImg}
          className={`disabled:opacity-50 block ${
            profilePage ? "w-full text-xs" : "md:w-48 text-sm"
          } font-bold py-2 px-4 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none`}
          onClick={handleSaveBtn}
        >
          <span className="flex items-center justify-center">
            <span>{createPostPage || editModal ? "ok" : userLanguage.imgUploader.save}</span>
            <ChevronDoubleRightIcon
              className={`${profilePage ? "h-3 translate-y-[0.05rem]" : "h-4 translate-y-px"} w-4 text-white font-bold`}
            />
          </span>
        </button>
      </div>
      <button
        type="button"
        onClick={handleDeleteBtn}
        className={`block ${
          profilePage ? "w-full text-xs" : "md:w-48 text-sm"
        } font-bold py-2 px-4 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none`}
      >
        {userLanguage.imgUploader.delete}
      </button>
    </div>
  );
};

export default ImgUploaderBtnModal;
