import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { formatDistanceToNowStrict } from "date-fns";
import fr from "date-fns/locale/fr";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import logo2 from "../assets/logo2.svg";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { API_AUTH } from "./API/index";

const Menu = ({ isOpen, userId, userName, userPic, userDate }) => {
  const [blob, setBlob] = useState(null);
  const [blobName, setBlobName] = useState(null);
  const [newPic, setNewPic] = useState("");
  const file = useRef(null);
  const history = useHistory;

  const formatTimestamp = (date) => {
    const convertedDate = {
      year: date.split("-")[0],
      month: date.split("-")[1],
      day: date.split("-")[2],
      minute: date.split("-")[3],
      seconds: date.split("-")[4],
    };

    return formatDistanceToNowStrict(
      new Date(
        convertedDate.year,
        convertedDate.month,
        convertedDate.day,
        convertedDate.minute,
        convertedDate.seconds
      ),
      { addSuffix: false, locale: fr }
    );
  };

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    console.log("FILE!!!", file.current.files[0]);
    const formData = new FormData();
    formData.append("userBlob", blob);
    formData.append("userId", userId);
    const request = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(`${API_AUTH}/userpic`, request);
      const data = await response.json();
      if (response.status !== 200) {
        return;
      }
      setNewPic(data.picUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="menu-container h-screen w-9/12 py-3 bg-gray-100 flex flex-col items-center justify-center absolute top-0 left-0 z-50 transform -translate-x-full transition transition-transform duration-300"
      style={{ transform: isOpen && "translateX(0)" }}
    >
      <div className="top-section h-2/6 w-10/12 flex flex-col items-center justify-center gap-2 border-b border-gray-300">
        <div className="avatar-container h-2/3 w-full flex items-center justify-center">
          <div
            className="w-40 h-40 rounded-full border border-gray-400"
            style={
              newPic === "" && userPic
                ? { background: `url(${userPic}) no-repeat center/cover` }
                : newPic !== ""
                ? { background: `url(${newPic}) no-repeat center/cover` }
                : {
                    background: `url(${picPlaceholder}) no-repeat center/cover`,
                  }
            }
          ></div>
        </div>
        <div className="username-member h-max w-full flex flex-col items-center justify-start">
          <span className="text-xl font-bold capitalize">{userName}</span>
          <span className="block italic flex items-center justify-center gap-1">
            <span
              className="block w-6 h-6 rounded-full outline-none transform translate-y-px"
              style={{ background: `url(${logo2}) no-repeat center/cover` }}
            ></span>
            membre depuis {formatTimestamp(userDate)}
          </span>
        </div>
      </div>
      <div className="main-section h-4/6 w-full flex items-start justify-center">
        <form
          className="h-1/3 w-full flex flex-col items-center justify-center gap-2  border-4 border-red-500"
          action=""
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleImgSubmit}
        >
          <label
            className="w-48 text-center text-white text-sm p-2 rounded shadow-xl"
            style={{ backgroundColor: "#ef5350" }}
            htmlFor="file"
          >
            {newPic === "" || userPic === null
              ? "choisir une photo de profil"
              : "changer la photo de profil"}
          </label>

          <div className="flex items-center ">
            <input
              className="text-white p-2 rounded hidden"
              style={{ backgroundColor: "#ef5350" }}
              type="file"
              accept="image/x-png,image/jpeg,image/jpg, image/gif"
              id="file"
              ref={file}
              onChange={() => {
                setBlob(file.current.files[0]);
                setBlobName(file.current.files[0].name);
              }}
            />
            <div>
              {blobName !== null ? (
                blobName
              ) : (
                <span className="italic text-xs">
                  Aucune photo pour le moment.
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-4">
            <button
              className="text-white text-sm p-2 border border-red-500 rounded transform translate-y-2 transition transition-opacity duration-1000 shadow-xl"
              style={
                blobName == null
                  ? { opacity: 0 }
                  : { opacity: 1, backgroundColor: "#ef5350" }
              }
            >
              voir l'aperçu
            </button>
            <button
              className="w-max flex items-center gap-1 text-black font-bold border border-black p-2 rounded transform translate-y-2 transition transition-opacity duration-1000 shadow-xl"
              style={
                userPic == null
                  ? { opacity: 0, display: "none" }
                  : { opacity: 1, display: "flex", backgroundColor: "#ef5350" }
              }
              onClick={() => {
                console.log(userPic);
              }}
            >
              valider
              <ChevronDoubleRightIcon
                className="h-4 w-4 text-black font-bold"
                style={{ transform: "translateY(1px)" }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Menu;
