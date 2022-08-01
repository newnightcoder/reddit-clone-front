import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { savePostImageAction } from "../store/actions/posts.action";
import { saveUserPicAction, toggleIsPreviewImgAction } from "../store/actions/user.action";
import { useLanguage, useToggle } from "../utils/hooks";
import ImgUploaderBtnModal from "./ImgUploaderBtnModal";
import { ImgUploaderProps } from "./react-app-env";

const ImgUploader = (props: ImgUploaderProps) => {
  const [blob, setBlob] = useState<File | null>(null);
  const [blobName, setBlobName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const fileSelected = fileInputRef?.current?.files?.[0];
  const { id } = useSelector((state) => state.user);
  const { tempPostImg: imgUrl, editId } = useSelector((state) => state.posts);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const [btnModalOpen, setBtnModalOpen] = useState(false);
  const toggleBtnModal = useToggle(btnModalOpen, setBtnModalOpen);
  const profilePage = pathname.includes("/profile");
  const signupPage = pathname === "/signup";
  const createPostPage = pathname === "/create";
  const editModal = editId.id ? true : false;

  const handleImgSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!blob || !id) return;
      if (profilePage || signupPage) {
        dispatch(saveUserPicAction(blob, id, props.imgType!));
      }
      if (createPostPage || editModal) {
        dispatch(savePostImageAction(blob));
        props.deletePreview!();
      }
      setBlob(null);
      setBlobName("");
      dispatch(toggleIsPreviewImgAction());
    },
    [blob, dispatch, id, props.imgType, props.deletePreview, signupPage, profilePage, createPostPage, editModal]
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

  const handleImgPost = useCallback(() => {
    dispatch(savePostImageAction(fileInputRef?.current?.files?.[0]!));
    props.deletePreview!();
    props.toggleImgUploadModal!();
  }, [dispatch, fileInputRef?.current?.files, props]);

  useEffect(() => {
    if (!imgUrl) setBlobName("");
  }, [imgUrl]);

  return (
    <form
      className={`${
        signupPage ? "h-[15rem] w-10/12 pt-2 relative" : profilePage ? "h-max w-full" : "h-full w-full"
      } flex flex-col items-center justify-start`}
      action=""
      method="POST"
      encType="multipart/form-data"
      onSubmit={(e) => handleImgSubmit(e)}
    >
      {signupPage && <span>{userLanguage.imgUploader.chooseBtn}</span>}
      {/* LABEL */}
      <label
        style={{
          width: props.imgType === "post" ? "12rem" : "100%",
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
        onChange={createPostPage || editModal ? handleImgPost : handleChange}
      />
      {profilePage
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
