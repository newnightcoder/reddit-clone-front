import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearTempPostImgAction, savePostImageAction } from "../store/actions/posts.action";
import { clearUserpicAction, saveUserPicAction } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import { useLanguage, useToggle } from "../utils/hooks";
import { BtnModalProps, ImgUploaderProps } from "./react-app-env";

const BtnModal = ({ btnModalOpen, toggleBtnModal, toggleImgModal, setBlob, setBlobName, imgType, blobName }: BtnModalProps) => {
  const { editId } = useSelector((state) => state.posts);
  const { id: userId, picUrl, bannerUrl } = useSelector((state) => state.user);
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

  const handleImgValidation = useCallback(() => {
    if (signupPage) return toFeedPage();
    if (createPostPage || editModal) return backToPostForm();
    if (profilePage) return backToOptions();
  }, [signupPage, createPostPage, editModal, profilePage, toFeedPage, backToPostForm, backToOptions]);

  const handleCancel = useCallback(() => {
    if (signupPage || profilePage) {
      if ((imgType === "pic" && picUrl) || (imgType === "banner" && bannerUrl)) {
        dispatch(clearUserpicAction(userId!, imgType));
      }
      toggleBtnModal();
    } else if (createPostPage || editModal) {
      dispatch(clearTempPostImgAction());
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
  ]);

  return (
    <div
      className={`${btnModalOpen ? "flex z-100" : "hidden -z-10"}  ${
        signupPage ? "bg-gray-200 dark:bg-gray-700" : "bg-black"
      } absolute inset-0 mx-auto w-full md:w-1/2 h-full flex-col items-center justify-center space-y-2  px-4`}
    >
      <span className="text-black dark:text-white">{blobName}</span>
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <button
          type="submit"
          className="w-full block text-white text-sm py-2 px-4 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
        >
          {userLanguage.imgUploader.preview}
        </button>
        <label
          htmlFor={imgType}
          className="w-full flex items-center justify-center text-white text-sm py-2 px-4 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
        >
          <span className="whitespace-nowrap">Change image</span>
        </label>
        <button
          className="w-full block text-sm font-bold py-2 px-4 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
          type="button"
          onClick={handleImgValidation}
        >
          <span className="flex items-center justify-center text-xs">
            {userLanguage.imgUploader.ok}
            <ChevronDoubleRightIcon className="h-4 w-4 text-black font-bold" style={{ transform: "translateY(1px)" }} />
          </span>
        </button>
      </div>
      <button
        type="button"
        onClick={handleCancel}
        className="w-full block text-sm font-bold py-2 px-4 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
      >
        cancel
      </button>
    </div>
  );
};

const ImgUploader = (props: ImgUploaderProps) => {
  const [blob, setBlob] = useState<File | null>(null);
  const [blobName, setBlobName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const fileSelected = fileInputRef?.current?.files?.[0];
  const { id } = useSelector((state) => state.user);
  const { tempPostImg: imgUrl } = useSelector((state) => state.posts);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const [btnModalOpen, setBtnModalOpen] = useState(false);
  const toggleBtnModal = useToggle(btnModalOpen, setBtnModalOpen);
  const profilePage = pathname.includes("/profile");
  const signupPage = pathname.includes("/signup");

  const handleImgSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!blob || !id) return;
      if (profilePage || props.profile) {
        dispatch(saveUserPicAction(blob, id, props.imgType!));
      } else dispatch(savePostImageAction(blob));
      if (pathname === "/edit") {
        props.deletePreview!();
      }
      setBlob(null);
      setBlobName("");
      if (!profilePage && !props.profile) {
        props.toggleImgUploadModal!();
      }
    },
    [blob, dispatch, id, props.imgType, props.profile, props.toggleImgUploadModal, props.deletePreview, profilePage]
  );

  const handleChange = useCallback(() => {
    console.log("file selected", fileInputRef?.current?.files?.[0]);
    setBlob(fileInputRef?.current?.files?.[0]!);
    setBlobName(fileInputRef?.current?.files?.[0]?.name!);
    if (!btnModalOpen) {
      toggleBtnModal();
    }
    fileInputRef.current!.value! = "";
  }, [setBlob, setBlobName, fileInputRef, profilePage, toggleBtnModal]);

  useEffect(() => {
    if (!imgUrl) setBlobName("");
  }, [imgUrl]);

  return (
    <form
      className={`${
        signupPage ? "h-[15rem]" : "h-full"
      } w-10/12 flex flex-col items-center justify-start border-2 border-red-500 relative pt-2`}
      action=""
      method="POST"
      encType="multipart/form-data"
      onSubmit={(e) => handleImgSubmit(e)}
    >
      {signupPage && <span>{userLanguage.imgUploader.chooseBtn}</span>}
      {/* LABEL */}
      <label
        style={{
          width: profilePage ? "100%" : "12rem",
          padding: profilePage ? ".5rem 1rem" : ".5rem",
        }}
        className="block text-center text-white text-xs rounded-full shadow-xl cursor-pointer bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
        htmlFor={props.imgType}
      >
        <span className="whitespace-nowrap">
          {profilePage && props.imgType === "pic"
            ? userLanguage.imgUploader.changePicBtn
            : profilePage && props.imgType === "banner"
            ? userLanguage.imgUploader.changeBannerBtn
            : userLanguage.imgUploader.browse}
        </span>
      </label>
      {/* FILE UPLOADER + FILE NAME */}
      <input
        className="text-white p-2 rounded hidden bg-blue-400"
        type="file"
        accept="image/x-png,image/jpeg,image/jpg, image/gif"
        id={props.imgType}
        name="image"
        ref={fileInputRef}
        onChange={handleChange}
      />
      {profilePage
        ? null
        : blobName || imgUrl
        ? blobName
        : !imgUrl && <span className="italic text-xs">{userLanguage.imgUploader.noPic}</span>}
      <BtnModal
        btnModalOpen={btnModalOpen}
        setBlobName={setBlobName}
        setBlob={setBlob}
        imgType={props.imgType!}
        blobName={blobName}
        toggleBtnModal={toggleBtnModal}
        toggleImgModal={props.toggleImgUploadModal}
      />
    </form>
  );
};

export default ImgUploader;
