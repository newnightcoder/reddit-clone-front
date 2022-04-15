import { XIcon } from "@heroicons/react/solid";
import React from "react";
import { useSelector } from "react-redux";
import { useGetProfile, useLanguage } from "../utils/hooks";
import ImgUploader from "./ImgUploader";

const ProfileOptions = ({ toggleProfileOptions, toggleEditModal, profileId, setOpenModal }) => {
  const { username } = useSelector((state) => state.user);
  const userData = useGetProfile(profileId);
  const userLanguage = useLanguage();

  return (
    <>
      {userData?.username === username && (
        <div className="btns-container px-2 pb-1 flex flex-col items-start justify-end space-y-2 h-full absolute top-0 right-0 z-50 bg-gray-100">
          <button className="absolute top-2 right-3" onClick={toggleProfileOptions}>
            <XIcon className="h-5 text-black" />
          </button>
          <ImgUploader profile={true} imgType="pic" />
          <ImgUploader profile={true} imgType="banner" />
          <button
            className="w-full py-2 flex items-center justify-center text-white text-xs rounded-full shadow-xl cursor-pointer bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
            onClick={toggleEditModal}
          >
            {/* <UserCircleIcon className="h-5" />  */}
            {userLanguage.profile.usernameBtn}
          </button>
          <button
            className="w-full py-2 flex items-center justify-center text-white text-xs rounded-full shadow-xl cursor-pointer bg-blue-400 transition-all duration-300 hover:bg-red-500 hover:shadow-none"
            onClick={() => setOpenModal(true)}
          >
            {/* <TrashIcon className="h-5" /> */}
            {userLanguage.profile.deleteBtn}{" "}
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileOptions;
