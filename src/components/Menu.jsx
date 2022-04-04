import { CogIcon, PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { DeleteModal } from ".";
import { logo_mobile_blue } from "../assets";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { deleteUser } from "../store/actions/user.action";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useHandleLink, useLanguage, useToggleSettings } from "../utils/hooks";
import Settings from "./Settings";

const Menu = ({ isMenuOpen, toggleMenu }) => {
  const { id, picUrl, username, creationDate, isAuthenticated } = useSelector((state) => state?.user);
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const handleLink = useHandleLink();
  const { settingsOpen, toggleSettings } = useToggleSettings();
  const userLanguage = useLanguage();
  const dispatch = useDispatch();

  const toggleDeleteModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const handleDeleteProfileFromMenu = () => {
    dispatch(deleteUser(id));
    toggleMenu();
    history.push("/fin");
  };

  return (
    <div
      className="menu-container h-screen w-9/12 pt-5 pb-7 bg-white flex flex-col items-center justify-between gap-2 fixed top-0 left-0 z-50 transition-transform duration-300"
      style={{ transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)" }}
    >
      <div className="top-section h-max w-10/12 pb-2 flex flex-col items-center justify-center gap-2 border-b border-gray-300">
        <div className="avatar-container h-max w-full flex items-center justify-center">
          <div
            className="w-40 h-40 rounded-full border border-gray-400"
            style={
              picUrl !== null
                ? { background: `url(${picUrl}) no-repeat center/cover` }
                : {
                    background: `url(${picPlaceholder}) no-repeat center/cover`,
                  }
            }
          ></div>
        </div>
        <div className="username-member h-max w-full flex flex-col items-center justify-start">
          <span className="text-xl font-bold capitalize">{username?.length !== 0 && username}</span>
          <span className="block italic text-sm flex items-center justify-center gap-1">
            <img src={logo_mobile_blue} className="h-6" />
            {isAuthenticated ? (
              <span>membre depuis {creationDate?.length !== 0 && formatTimestamp(creationDate)}</span>
            ) : (
              <span>Visitor Mode</span>
            )}
          </span>
        </div>
      </div>
      <div className="main-section h-full w-full flex flex-col items-center justify-start gap-2 pt-10">
        <ul className="h-max w-11/12 flex flex-col items-start justify-center gap-3 pl-6 text-sm text-gray-900">
          <li>
            <button
              className="flex items-center justify-center space-x-2"
              onClick={() => {
                handleLink("profile");
                isAuthenticated && toggleMenu();
              }}
            >
              <UserIcon className="h-6 text-gray-500" />
              <span>Mon profil</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-center space-x-2"
              onClick={() => {
                handleLink("post");
                isAuthenticated && toggleMenu();
              }}
            >
              <PencilIcon className="h-6 text-gray-500" />
              <span>Créer un nouveau post</span>
            </button>
          </li>
          {/* <li>
            <button className="flex items-center justify-center space-x-2">
              <HeartIcon className="h-6 text-gray-500" />
              Posts que j'ai aimé
            </button>
          </li> */}
          <li>
            <button className="flex items-center justify-center space-x-2" onClick={toggleSettings}>
              <CogIcon className="h-6 text-gray-500" />
              <span className="inline-block">{userLanguage.navbarDesktop.settings}</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-center space-x-2 text-sm"
              onClick={() => (isAuthenticated ? setOpenModal(true) : handleLink("delete"))}
            >
              <TrashIcon className="h-6 text-gray-500" />
              <span>Supprimer mon profil</span>
            </button>
          </li>
        </ul>
      </div>
      <div
        style={{ minWidth: "50%" }}
        className="h-12 w-max flex items-center justify-center space-x-1 border border-green-500 text-green-500 text-sm rounded-full"
      >
        <span className="w-3 h-3 rounded-full bg-green-500 "></span> <span>Statut : en ligne</span>
      </div>
      {openModal && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          handleDeleteProfile={handleDeleteProfileFromMenu}
          origin={"menu"}
          toggleMenu={toggleMenu}
        />
      )}
      <Settings settingsOpen={settingsOpen} isMenuOpen={isMenuOpen} />
    </div>
  );
};

export default Menu;
