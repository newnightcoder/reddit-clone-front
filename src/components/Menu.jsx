import { CogIcon, PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import Div100vh from "react-div-100vh";
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
  const { id, picUrl, username, creationDate, isAuthenticated, language } = useSelector((state) => state?.user);
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
    <Div100vh
      className="menu-container overflow-y-auto h-full lg:hidden flex flex-col items-center justify-start gap-2 fixed top-0 left-0 w-9/12 pt-5 pb-6 bg-gray-100 dark:bg-gray-800 dark:text-white  transition-transform duration-300"
      style={{ transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)", zIndex: 1100 }}
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
            <img src={logo_mobile_blue} className="h-6" alt="forum logo" />
            {isAuthenticated ? (
              <span>
                {userLanguage.navbarDesktop.member} {creationDate?.length !== 0 && formatTimestamp(creationDate, null, language)}
              </span>
            ) : (
              <span>{userLanguage.navbarDesktop.visitor}</span>
            )}
          </span>
        </div>
      </div>
      <div className="main-section relative h-full w-max self-start flex flex-col items-start justify-start pt-5">
        <ul className="h-max w-48 pl-2 flex flex-col items-start justify-center gap-3 text-sm text-gray-900 dark:text-gray-200">
          <li>
            <button
              className="flex items-center justify-center space-x-2 px-3 py-1 border-2 border-transparent transition-color duration-100 hover:border-blue-400 rounded-full"
              onClick={() => {
                handleLink("profile", id, username);
                isAuthenticated && toggleMenu();
              }}
            >
              <UserIcon className="h-6 text-gray-500 dark:text-gray-200" />
              <span>{userLanguage.navbarDesktop.profile}</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-center space-x-2 px-3 py-1 border-2 border-transparent transition-color duration-100 hover:border-blue-400 rounded-full"
              onClick={() => {
                handleLink("post");
                isAuthenticated && toggleMenu();
              }}
            >
              <PencilIcon className="h-6 text-gray-500 dark:text-gray-200" />
              <span>{userLanguage.navbarDesktop.publish}</span>
            </button>
          </li>
          <li>
            <button
              className={`flex items-center justify-center space-x-2 px-3 py-1 border-2 transition-color duration-100 active:border-blue-400 rounded-full ${
                settingsOpen ? "border-blue-400" : "border-transparent"
              }`}
              onClick={toggleSettings}
            >
              <CogIcon className="h-6 text-gray-500 dark:text-gray-200" />
              <span className="inline-block">{userLanguage.navbarDesktop.settings}</span>
            </button>
            <div className="w-full relative transition duration-300 h-max pt-1">
              <Settings settingsOpen={settingsOpen} isMenuOpen={isMenuOpen} />
            </div>
          </li>
          <li>
            <button
              className="flex items-center justify-center space-x-2 px-3 py-1 border-2 border-transparent transition-color duration-100 hover:border-blue-400 rounded-full"
              onClick={() => (isAuthenticated ? setOpenModal(true) : handleLink("delete"))}
            >
              <TrashIcon className="h-6 text-gray-500 dark:text-gray-200" />
              <span>{userLanguage.navbarDesktop.delete}</span>
            </button>
          </li>
        </ul>
      </div>
      <div
        style={{ minWidth: "50%" }}
        className="h-12 w-max flex items-center justify-center space-x-1 border border-green-500 text-green-500 text-sm rounded-full"
      >
        <span className="w-3 h-3 rounded-full bg-green-500 "></span> <span>{userLanguage.navbarDesktop.status}</span>
      </div>
      {openModal && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          handleDeleteProfile={handleDeleteProfileFromMenu}
          origin={"menu"}
          toggleMenu={toggleMenu}
        />
      )}
    </Div100vh>
  );
};

export default Menu;
