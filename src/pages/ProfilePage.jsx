import {
  ChevronDoubleRightIcon,
  HeartIcon,
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import logo2 from "../assets/logo2.svg";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { DeleteModal } from "../components";
import {
  cleanCurrentProfileVisit,
  deleteUser,
  saveUserPic,
} from "../store/actions/user.action";
import { formatTimestamp } from "../utils/formatTime";

const Profile = () => {
  // const  = user;
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const [blob, setBlob] = useState(null);
  const [blobName, setBlobName] = useState(null);
  const file = useRef(null);
  const [isHidden, setIsHidden] = useState(true);
  const user = useSelector((state) => state.user);
  const { id, picUrl, username, creationDate } = user;
  const profileUser = useSelector((state) => state?.user?.currentProfileVisit);

  useEffect(() => {
    return function cleanup() {
      dispatch(cleanCurrentProfileVisit());
    };
  }, []);

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    dispatch(saveUserPic(blob, id));
  };

  const toggleDeleteModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const handleDeleteProfile = () => {
    dispatch(deleteUser(id));
    history.push("/fin");
  };
  return (
    <div className="page-container h-max w-screen py-5 bg-gray-100 flex flex-col items-center justify-start gap-2 rounded-tr rounded-br transition transition-transform duration-300">
      <div className="top-section h-max w-10/12 pb-2 flex flex-col items-center justify-center gap-2 border-b border-gray-300">
        <div className="avatar-container h-max w-full flex items-center justify-center">
          <div
            className="w-40 h-40 rounded-full border border-gray-400"
            style={
              profileUser?.picUrl
                ? { background: `url(${profileUser.picUrl}) no-repeat center/cover` }
                : profileUser?.picUrl === null
                ? { background: `url(${picPlaceholder}) no-repeat center/cover` }
                : picUrl?.length !== 0
                ? { background: `url(${picUrl}) no-repeat center/cover` }
                : { background: `url(${picPlaceholder}) no-repeat center/cover` }
            }
          ></div>
        </div>
        <div className="username-member h-max w-full flex flex-col items-center justify-start">
          <span className="text-xl font-bold capitalize">
            {profileUser.username
              ? profileUser.username
              : username?.length !== 0 && username}
          </span>
          <span className="block italic text-sm flex items-center justify-center gap-1">
            <span
              className="block w-6 h-6 rounded-full outline-none transform translate-y-px"
              style={{ background: `url(${logo2}) no-repeat center/cover` }}
            ></span>
            membre depuis{" "}
            {profileUser.creationDate
              ? formatTimestamp(profileUser.creationDate)
              : creationDate?.length !== 0
              ? formatTimestamp(creationDate)
              : null}
          </span>
        </div>
      </div>
      <div className="main-section h-full w-full flex flex-col items-center justify-start gap-2">
        {!profileUser?.username && (
          <form
            className="handle-img h-max w-full flex flex-col items-center justify-start gap-1"
            action=""
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleImgSubmit}
            // style={{ diplay: profileUser !== undefined ? "none" : "flex" }}
          >
            <label
              className="button-changer-choisir w-48 text-center text-white text-sm p-2 rounded shadow-xl hover:cursor-pointer"
              style={{ backgroundColor: "#ef5350" }}
              htmlFor="file"
            >
              {!picUrl ? "Choisir une photo de profil" : "Changer la photo de profil"}
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
                  setIsHidden(false);
                }}
              />
              <div className="text-center text-xs">
                {!isHidden ? (
                  blobName
                ) : !picUrl ? (
                  <span className="italic text-xs">Aucune photo pour le moment.</span>
                ) : null}
              </div>
            </div>
            <div className="buttons-container-apercu-valider w-full flex items-center justify-center gap-4">
              <button
                className="text-white text-sm px-2 shadow py-1 border border-red-500 rounded transform transition transition-opacity duration-1000 shadow-xl"
                style={
                  isHidden
                    ? { display: "none", opacity: 0 }
                    : { display: "block", opacity: 1, backgroundColor: "#ef5350" }
                }
              >
                voir l'aperçu
              </button>
              <button
                className="w-max flex items-center gap-1 text-black font-bold px-2 shadow py-1 rounded transform transition transition-opacity duration-1000 shadow-xl"
                style={
                  isHidden
                    ? { opacity: 0, display: "none" }
                    : { opacity: 1, display: "flex", backgroundColor: "#ef5350" }
                }
                onClick={() => setIsHidden(true)}
              >
                valider
                <ChevronDoubleRightIcon
                  className="h-4 w-4 text-black font-bold"
                  style={{ transform: "translateY(1px)" }}
                />
              </button>
            </div>
          </form>
        )}
        {!profileUser && (
          <ul className="h-max w-11/12 flex flex-col items-start justify-center gap-3 pt-10 pl-4 text-sm text-gray-900">
            <li>
              <button className="flex items-center justify-center gap-1">
                <UserCircleIcon className="h-8 text-gray-700" /> Mon profil
              </button>
            </li>
            <li>
              <button className="flex items-center justify-center gap-1">
                <PencilIcon className="h-8 text-gray-700" />
                Créer un nouveau post
              </button>
            </li>
            <li>
              <button className="flex items-center justify-center gap-1">
                <HeartIcon className="h-8 text-gray-700" />
                Posts que j'ai aimé
              </button>
            </li>
            <li>
              <button
                className="flex items-center justify-center gap-1 text-sm"
                onClick={() => setOpenModal(true)}
              >
                <TrashIcon className="h-8 text-gray-700" />
                Supprimer mon profil
              </button>
            </li>
          </ul>
        )}
      </div>
      {openModal && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          handleDeleteProfile={handleDeleteProfile}
          origin={"menu"}
        />
      )}
    </div>
  );
};

export default Profile;
