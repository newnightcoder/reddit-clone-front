import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { savePostImageAction, setErrorPostAction } from "../../store/actions/posts.action";
import { saveUserPicAction, toggleIsPreviewImgAction } from "../../store/actions/user.action";
import { useLanguage, useToggle } from "../../utils/hooks";
import { ImgUploaderProps } from "../react-app-env";
import ImgUploaderBtnModal from "./ImgUploaderBtnModal";

const ImgUploader = (props: ImgUploaderProps) => {
  const [blob, setBlob] = useState<File | null>(null);
  const [blobName, setBlobName] = useState<string>("");
  const form = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id } = useSelector((state) => state.user);
  const { tempPostImg: imgUrl, editId, error } = useSelector((state) => state.posts);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const [btnModalOpen, setBtnModalOpen] = useState(false);
  const toggleBtnModal = useToggle(btnModalOpen, setBtnModalOpen);
  const profilePage = pathname.includes("/profile");
  const signupPage = pathname === "/signup";
  const createPostPage = pathname === "/create";
  const editModal = editId.id ? true : false;
  const forPost = createPostPage || editModal;

  const checkFileSize = useCallback(
    (origin) => {
      // const KILO_OCTET = Math.pow(10, 3);
      const MEGA_OCTET = Math.pow(10, 6);
      const MAX_SIZE = 5 * MEGA_OCTET;
      switch (origin) {
        case "post":
          const imgBlob = fileInputRef?.current?.files?.[0]!;
          if (imgBlob.size > MAX_SIZE) {
            dispatch(setErrorPostAction("sizeLimit"));
            return false;
          } else return true;
        case "profile":
          if (blob && blob.size > MAX_SIZE) {
            dispatch(setErrorPostAction("sizeLimit"));
            return false;
          } else return true;
        default:
          return false;
      }
    },
    [dispatch, fileInputRef, blob]
  );

  const resetUploaderPost = useCallback(() => {
    props.deletePostPreview!();
    fileInputRef.current!.value = "";
    props.toggleImgUploadModal!();
  }, [props.deletePostPreview, props.toggleImgUploadModal, fileInputRef]);

  const resetUploaderProfile = useCallback(() => {
    fileInputRef.current!.value = "";
    dispatch(toggleIsPreviewImgAction());
    setBlob(null);
    setBlobName("");
  }, [fileInputRef, dispatch, setBlob, setBlobName]);

  const handleImgSubmit = useCallback(
    (e, origin) => {
      e.preventDefault();
      if (!checkFileSize(origin)) return;
      switch (origin) {
        case "post":
          if (!fileInputRef?.current?.files?.[0]) return;
          dispatch(savePostImageAction(fileInputRef.current.files[0]));
          resetUploaderPost();
          break;
        case "profile":
          if (!blob || !id) return;
          dispatch(saveUserPicAction(blob, id, props.imgType!));
          resetUploaderProfile();
          break;
        default:
          return;
      }
    },
    [checkFileSize, dispatch, resetUploaderPost, resetUploaderProfile, id, blob, fileInputRef, props.imgType]
  );

  const handleChange = useCallback(() => {
    setBlob(fileInputRef?.current?.files?.[0]!);
    setBlobName(fileInputRef?.current?.files?.[0]?.name!);
    if (!btnModalOpen) {
      toggleBtnModal();
    }
    fileInputRef.current!.value! = "";
  }, [setBlob, setBlobName, fileInputRef, btnModalOpen, toggleBtnModal]);

  useEffect(() => {
    if (forPost) {
      form.current!.addEventListener("submit", (e) => {
        if (fileInputRef?.current?.files) {
          return handleImgSubmit(e, "post");
        }
      });
    }
  }, [form, forPost, handleImgSubmit]);

  const handleChangePost = useCallback(
    (e) => {
      e.preventDefault();
      form.current!.dispatchEvent(new Event("submit"));
    },
    [form]
  );

  useEffect(() => {
    if (!imgUrl) setBlobName("");
  }, [imgUrl]);

  useEffect(() => {
    if (error === "sizeLimit") return;
    if (props.imgUploadModalOpen && imgUrl.length > 0) return props.toggleImgUploadModal;
  }, [error, imgUrl, props.imgUploadModalOpen, props.toggleImgUploadModal]);

  return (
    <form
      className={`${
        signupPage ? "h-[15rem] w-10/12 pt-2 relative" : profilePage ? "h-max w-full" : "h-max w-full"
      } flex flex-col items-center justify-start`}
      action=""
      method="POST"
      encType="multipart/form-data"
      onSubmit={(e) => {
        forPost ? handleImgSubmit(e, "post") : handleImgSubmit(e, "profile");
      }}
      ref={form}
    >
      {signupPage && !btnModalOpen && (
        <span className="text-gray-900 dark:text-gray-100 uppercase py-1">{userLanguage.imgUploader.chooseBtn}</span>
      )}
      {/* LABEL */}
      <label
        style={{
          width: signupPage || props.imgType === "post" ? "12rem" : "100%",
          padding: profilePage ? ".5rem 1rem" : ".25rem",
        }}
        className={`block text-center ${profilePage ? "text-gray-100" : "text-gray-900 dark:text-gray-100"} ${
          signupPage ? "text-md" : "text-xs"
        } rounded-full shadow-xl cursor-pointer bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none`}
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
        accept="image/png, image/jpeg, image/jpg, image/gif"
        id={props.imgType}
        name="image"
        ref={fileInputRef}
        onChange={forPost ? handleChangePost : handleChange}
      />
      <span className="italic text-xs text-gray-900 dark:text-gray-100 pt-1">
        {profilePage || createPostPage || editModal
          ? null
          : (blobName || imgUrl) && !btnModalOpen
          ? blobName
          : !imgUrl && !btnModalOpen && userLanguage.imgUploader.noPic}
      </span>
      <ImgUploaderBtnModal
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
