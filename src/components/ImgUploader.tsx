import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { savePostImageAction, setErrorPostAction } from "../store/actions/posts.action";
import { saveUserPicAction, toggleIsPreviewImgAction } from "../store/actions/user.action";
import { useLanguage, useToggle } from "../utils/hooks";
import ImgUploaderBtnModal from "./ImgUploaderBtnModal";
import { ImgUploaderProps } from "./react-app-env";

const ImgUploader = (props: ImgUploaderProps) => {
  const [blob, setBlob] = useState<File | null>(null);
  const [blobName, setBlobName] = useState<string>("");
  const form = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const fileSelected = fileInputRef?.current?.files?.[0];
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
      const KILO_OCTET = Math.pow(10, 3);
      const MEGA_OCTET = Math.pow(10, 6);
      const MAX_SIZE = 5 * MEGA_OCTET;
      switch (origin) {
        case "post":
          const imgBlob = fileInputRef?.current?.files?.[0]!;
          console.log(`${origin} - checkFileSize of:`, imgBlob);
          if (imgBlob.size > MAX_SIZE) {
            dispatch(setErrorPostAction("sizeLimit"));
            return false;
          } else return true;
        case "profile":
          console.log(`${origin} - checkFileSize of:`, blob);
          if (blob!.size > MAX_SIZE) {
            dispatch(setErrorPostAction("sizeLimit"));
            return false;
          } else return true;
        default:
          return false;
      }
    },
    [dispatch, fileInputRef.current, blob]
  );

  const resetUploaderPost = useCallback(() => {
    props.deletePostPreview!();
    fileInputRef.current!.value = "";
    props.toggleImgUploadModal!();
  }, [props.deletePostPreview, props.toggleImgUploadModal, fileInputRef.current]);

  const resetUploaderProfile = useCallback(() => {
    fileInputRef.current!.value = "";
    dispatch(toggleIsPreviewImgAction());
    setBlob(null);
    setBlobName("");
  }, [fileInputRef.current, dispatch, setBlob, setBlobName, toggleBtnModal]);

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
    [checkFileSize, dispatch, resetUploaderPost, resetUploaderProfile, id, blob, fileInputRef.current, props.imgType]
  );

  const handleChange = useCallback(() => {
    console.log("file selected handleChange", fileInputRef?.current?.files?.[0]);
    setBlob(fileInputRef?.current?.files?.[0]!);
    setBlobName(fileInputRef?.current?.files?.[0]?.name!);
    if (!btnModalOpen) {
      toggleBtnModal();
    }
    fileInputRef.current!.value! = "";
  }, [setBlob, setBlobName, fileInputRef, btnModalOpen, toggleBtnModal]);

  const handleChangePost = useCallback(
    (e) => {
      e.preventDefault();
      form.current!.requestSubmit();
    },
    [form.current]
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
      {signupPage && <span>{userLanguage.imgUploader.chooseBtn}</span>}
      {/* LABEL */}
      <label
        style={{
          width: signupPage || props.imgType === "post" ? "12rem" : "100%",
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
        onChange={forPost ? handleChangePost : handleChange}
      />
      {profilePage || createPostPage || editModal
        ? null
        : blobName || imgUrl
        ? blobName
        : !imgUrl && <span className="italic text-xs">{userLanguage.imgUploader.noPic}</span>}
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
