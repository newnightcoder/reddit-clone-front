import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { savePostImage } from "../store/actions/posts.action";
import { saveUserPic } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import { useLanguage } from "../utils/hooks";

const ImgUploader = ({ profile, imgType, toggleImgUploadModal }) => {
  const [blob, setBlob] = useState(null);
  const [blobName, setBlobName] = useState(null);
  const file = useRef(null);
  const { id } = useSelector((state) => state.user);
  const { imgUrl } = useSelector((state) => state.posts.currentPost);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const userLanguage = useLanguage();

  const handleImgSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // console.log("FILE!!!", file.current.files[0]);
      if (profile) return dispatch(saveUserPic(blob, id, imgType));
      // console.log(`ready to add file ${blobName}`);
      dispatch(savePostImage(blob));
      console.log("re-render");
      toggleImgUploadModal(e);
    },
    [blob, dispatch, id, imgType, profile, toggleImgUploadModal]
  );

  useEffect(() => {
    if (!imgUrl) setBlobName(null);
  }, [imgUrl]);

  return (
    <form
      className="w-full flex flex-col items-center justify-center z-40"
      action=""
      method="POST"
      encType="multipart/form-data"
      onSubmit={handleImgSubmit}
    >
      {pathname.includes("profile") ? null : profile && <span>{userLanguage.imgUploader.chooseBtn}</span>}
      {/* LABEL */}
      <label
        style={{
          width: pathname.includes("profile") ? "100%" : "12rem",
          padding: pathname.includes("profile") ? ".5rem 1rem" : ".5rem",
          display: blobName === null ? "block" : "none",
        }}
        className="text-center text-white text-xs rounded-full shadow-xl cursor-pointer bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
        htmlFor={imgType}
      >
        <span className="whitespace-nowrap">
          {pathname.includes("profile") && imgType === "pic"
            ? userLanguage.imgUploader.changePicBtn
            : pathname.includes("profile") && imgType === "banner"
            ? userLanguage.imgUploader.changeBannerBtn
            : userLanguage.imgUploader.browse}
        </span>
      </label>
      {/* FILE UPLOADER + FILE NAME */}
      <div style={blobName === null ? { display: "flex" } : { display: "none" }} className="items-center">
        <input
          className="text-white p-2 rounded hidden bg-blue-400"
          type="file"
          accept="image/x-png,image/jpeg,image/jpg, image/gif"
          id={imgType}
          name="image"
          ref={file}
          onChange={(e) => {
            setBlob(file.current?.files[0]);
            setBlobName(file.current.files[0]?.name);
          }}
        />
        <div className="italic text-xs">
          {blobName || imgUrl
            ? blobName
            : pathname.includes("profile")
            ? null
            : !imgUrl && <span>{userLanguage.imgUploader.noPic}</span>}
        </div>
      </div>
      {/* // PREVIEW + OK BTNS CONTAINER */}
      <div className="w-full flex items-center justify-center gap-4">
        {profile && (
          <button
            className="text-white text-xs py-2 px-4 rounded-full  shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
            style={blobName === null ? { display: "none" } : { display: "block" }}
          >
            {userLanguage.imgUploader.preview}
          </button>
        )}
        <button
          className="w-max items-center gap-1 text-black font-bold py-2 px-4 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
          style={blobName === null ? { display: "none" } : { display: "flex" }}
          onClick={
            pathname.includes("profile")
              ? (e) => {
                  e.preventDefault();
                  setBlobName(null);
                }
              : profile
              ? () => {
                  setTimeout(() => {
                    history.push("/feed");
                  }, 300);
                }
              : null
          }
        >
          {profile && !pathname.includes("profile") ? (
            <span className="flex items-center justify-center text-xs">
              {userLanguage.imgUploader.ok}
              <ChevronDoubleRightIcon className="h-4 w-4 text-black font-bold" style={{ transform: "translateY(1px)" }} />
            </span>
          ) : (
            <span className="uppercase text-white text-xs">ok</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ImgUploader;
