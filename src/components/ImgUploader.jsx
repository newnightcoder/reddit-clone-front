import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { savePostImage } from "../store/actions/posts.action";
import { saveUserPic } from "../store/actions/user.action";

const ImgUploader = ({ profile, toggleImgInput }) => {
  const [blob, setBlob] = useState(null);
  const [blobName, setBlobName] = useState(null);
  const file = useRef(null);
  const { id, picUrl } = useSelector((state) => state.user);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleImgSubmit = (e) => {
    e.preventDefault();
    console.log("FILE!!!", file.current.files[0]);
    if (profile) return dispatch(saveUserPic(blob, id));
    console.log(`ready to add file ${blobName}`);
    dispatch(savePostImage(blob));
    toggleImgInput(e);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-2"
      action=""
      method="POST"
      encType="multipart/form-data"
      onSubmit={handleImgSubmit}
    >
      {profile && <span> Choisissez votre image de profil</span>}
      <label
        className="w-48 text-center text-white p-2 rounded shadow-xl cursor-pointer"
        style={{ backgroundColor: "#ef5350" }}
        htmlFor="file"
      >
        parcourir
      </label>

      <div className="flex items-center gap-4">
        <input
          className="text-white p-2 rounded hidden"
          style={{ backgroundColor: "#ef5350" }}
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
        <div>{blobName !== null ? blobName : <span className="italic text-xs">Aucune photo choisie pour le moment.</span>}</div>
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        {profile && (
          <button
            className="text-white p-2 border border-red-500 rounded transform translate-y-2 transition transition-opacity duration-1000 shadow-xl"
            style={blobName === null ? { opacity: 0 } : { opacity: 1, backgroundColor: "#ef5350" }}
          >
            voir l'aperçu
          </button>
        )}
        <button
          className="w-max flex items-center gap-1 text-black font-bold border border-black p-2 rounded transform translate-y-2 transition transition-opacity duration-1000 shadow-xl"
          style={
            blobName === null ? { opacity: 0, display: "none" } : { opacity: 1, display: "flex", backgroundColor: "#ef5350" }
          }
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
