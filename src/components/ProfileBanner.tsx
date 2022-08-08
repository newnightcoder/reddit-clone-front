import { TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { EditUsernameModal, ProfileOptions } from ".";
import { bannerPlaceholder, picPlaceholder } from "../assets";
import { fromCDN } from "../utils/helpers";
import { useLanguage, useToggle } from "../utils/hooks";
import { ProfileBannerProps } from "./react-app-env";

const ProfileBanner = ({ user, loading, setOpenModal }: ProfileBannerProps) => {
  const {
    id,
    picUrl,
    bannerUrl,
    currentProfileVisit: { id: profileId },
    role,
  } = useSelector((state) => state.user);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openProfileOptions, setOpenProfileOptions] = useState(false);
  const toggleEditModal = useToggle(openEditModal, setOpenEditModal);
  const toggleProfileOptions = useToggle(openProfileOptions, setOpenProfileOptions);
  const userLanguage = useLanguage();

  return (
    <div className="h-[17rem] w-full">
      <div
        style={{
          background: `${
            user?.id === id && bannerUrl
              ? `url(${fromCDN(bannerUrl)})`
              : user?.id === id && !bannerUrl
              ? `url(${bannerPlaceholder})`
              : user?.id !== id && user?.bannerUrl
              ? `url(${fromCDN(user?.bannerUrl)})`
              : `url(${bannerPlaceholder})`
          }
       no-repeat center/cover`,
        }}
        className="top-section mb-3 relative h-48 w-full pb-2 flex flex-col items-center justify-center md:rounded-tl-md md:rounded-tr-md"
      >
        <button
          className={`${
            profileId === id ? "flex" : "hidden"
          } absolute top-4 right-4 items-center justify-center space-x-1 text-xs italic text-white py-1 px-6 rounded-full shadow-xl bg-blue-400 dark:bg-black transition-all duration-300 hover:bg-blue-500 hover:shadow-none`}
          onClick={toggleProfileOptions}
        >
          {userLanguage.profile.editBtn}
        </button>
        <div
          className="w-36 h-36 rounded-full border-4 border-white dark:border-gray-900 absolute left-4 -bottom-20"
          style={
            user?.id === id && picUrl !== null
              ? { background: `url(${fromCDN(picUrl)}) no-repeat center/cover` }
              : user?.id !== id && user?.picUrl !== null
              ? { background: `url(${fromCDN(user?.picUrl)}) no-repeat center/cover` }
              : { background: `url(${picPlaceholder}) no-repeat center/cover` }
          }
        ></div>
        <div className="deleteBtn absolute left-4 top-4 w-10/12 pl-4">
          {role === "admin" && user?.id !== id && !loading && (
            <button
              className="flex items-center justify-center space-x-1 text-md bg-black text-white text-sm  pl-2 pr-3 py-1 rounded-full hover:drop-shadow"
              onClick={() => setOpenModal(true)}
            >
              <TrashIcon className="h-6 text-white" />
              <span>{userLanguage.profile.modDeleteBtn}</span>
            </button>
          )}
        </div>
        <ProfileOptions
          isOpen={openProfileOptions}
          setOpenModal={setOpenModal}
          toggleEditModal={toggleEditModal}
          toggleProfileOptions={toggleProfileOptions}
          profileId={profileId!}
        />
        {openEditModal && <EditUsernameModal toggleEditModal={toggleEditModal} />}
      </div>
    </div>
  );
};

export default ProfileBanner;
