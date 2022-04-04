import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { savePostImage } from "../store/actions/posts.action";
import { saveUserPic } from "../store/actions/user.action";
import { history } from "../utils/helpers";

const ImgUploader = ({ profile, toggleImgInput }) => {
  const [blob, setBlob] = useState(null);
  const [blobName, setBlobName] = useState(null);
  const file = useRef(null);
  const { id, picUrl } = useSelector((state) => state.user);
  const { imgUrl } = useSelector((state) => state.posts.currentPost);
  // const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleImgSubmit = (e) => {
    e.preventDefault();
    // console.log("FILE!!!", file.current.files[0]);
    if (profile) return dispatch(saveUserPic(blob, id));
    // console.log(`ready to add file ${blobName}`);
    dispatch(savePostImage(blob));
    console.log("re-render");
    toggleImgInput(e);
  };

  useEffect(() => {
    if (!imgUrl) setBlobName(null);
  }, [imgUrl]);

  return (
    <form
      className="flex flex-col items-center justify-center gap-2"
      action=""
      method="POST"
      encType="multipart/form-data"
      onSubmit={handleImgSubmit}
    >
      {pathname.includes("profile") ? null : profile && <span> Choisissez votre image de profil</span>}
      <label
        style={{
          width: pathname.includes("profile") ? "max-content" : "12rem",
          padding: pathname.includes("profile") ? ".5rem 1rem" : ".5rem",
        }}
        className="text-center text-white text-sm rounded-full shadow-xl cursor-pointer bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
        htmlFor="file"
      >
        <span className="whitespace-nowrap">{pathname.includes("profile") ? "changer la photo de profil" : "parcourir"}</span>
      </label>

      <div className="flex items-center gap-4">
        <input
          className="text-white p-2 rounded hidden bg-blue-400"
          type="file"
          accept="image/x-png,image/jpeg,image/jpg, image/gif"
          id="file"
          name="image"
          ref={file}
          onChange={() => {
            setBlob(file.current.files[0]);
            setBlobName(file.current.files[0].name);
          }}
        />
        <div>
          {blobName || imgUrl
            ? blobName
            : pathname.includes("profile")
            ? null
            : !imgUrl && <span className="italic text-xs">Aucune photo choisie pour le moment.</span>}
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        {profile && (
          <button
            className="text-white py-2 px-4 rounded-full  transform translate-y-2 shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
            style={blobName === null ? { opacity: 0 } : { opacity: 1 }}
          >
            Aperçu
          </button>
        )}
        <button
          className="w-max flex items-center gap-1 text-black font-bold py-2 px-4 rounded-full transform translate-y-2 shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
          style={blobName === null ? { opacity: 0, display: "none" } : { opacity: 1, display: "flex" }}
          onClick={
            profile
              ? () => {
                  setTimeout(() => {
                    history.push("/feed");
                  }, 300);
                }
              : null
          }
        >
          {profile ? "c'est bon!" : <span className="uppercase">ok</span>}
          {profile && (
            <ChevronDoubleRightIcon className="h-4 w-4 text-black font-bold" style={{ transform: "translateY(1px)" }} />
          )}
        </button>
      </div>
    </form>
  );
};

export default ImgUploader;
