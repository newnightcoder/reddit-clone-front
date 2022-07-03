import { TrashIcon } from "@heroicons/react/solid";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditUsernameModal, ProfileOptions } from ".";
import { bannerPlaceholder, picPlaceholder } from "../assets";
import { followUserAction } from "../store/actions/user.action";
import { useLanguage, useToggle } from "../utils/hooks";
import { ProfileBannerProps } from "./react-app-env";

const ProfileBanner = ({
  user,
  loading,
  btnFollowStatus,
  setBtnFollowStatus,
  updatedFollowersCount,
  setUpdatedFollowersCount,
  setOpenModal,
}: ProfileBannerProps) => {
  const { id, picUrl, bannerUrl, idCurrentProfileVisit: profileId, role } = useSelector((state) => state.user);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openProfileOptions, setOpenProfileOptions] = useState(false);
  const toggleEditModal = useToggle(openEditModal, setOpenEditModal);
  const toggleProfileOptions = useToggle(openProfileOptions, setOpenProfileOptions);
  const toggleBtnTextFollow = useToggle(btnFollowStatus, setBtnFollowStatus);
  const userLanguage = useLanguage();
  const dispatch = useDispatch();

  const updateCount = useCallback(
    (bool: boolean) => {
      bool ? setUpdatedFollowersCount(updatedFollowersCount + 1) : setUpdatedFollowersCount(updatedFollowersCount - 1);
    },
    [setUpdatedFollowersCount, updatedFollowersCount]
  );

  return (
    <div
      style={{
        background: `${
          user?.id === id && bannerUrl
            ? `url(${bannerUrl})`
            : user?.id === id && !bannerUrl
            ? `url(${bannerPlaceholder})`
            : user?.id !== id && user?.bannerUrl
            ? `url(${user?.bannerUrl})`
            : `url(${bannerPlaceholder})`
        }
     no-repeat center/cover`,
      }}
      className="top-section mb-2 relative h-48 w-full pb-2 flex flex-col items-center justify-center space-y-2 md:rounded-tl-md md:rounded-tr-md"
    >
      <button
        className={`${
          profileId === id && !loading ? "visible" : "invisible"
        } absolute top-4 right-4 items-center justify-center space-x-1 text-xs opacity-0 flex italic text-white py-1 px-6 rounded-full shadow-xl bg-blue-400 dark:bg-black transition-all duration-300 hover:bg-blue-500 hover:shadow-none`}
        onClick={toggleProfileOptions}
      >
        {userLanguage.profile.editBtn}
      </button>
      {openProfileOptions && (
        <ProfileOptions
          setOpenModal={setOpenModal}
          toggleEditModal={toggleEditModal}
          toggleProfileOptions={toggleProfileOptions}
          profileId={profileId!}
        />
      )}
      {openEditModal && <EditUsernameModal toggleEditModal={toggleEditModal} />}
      <div
        className="w-36 h-36 rounded-full border-4 border-white dark:border-gray-900 absolute left-4 -bottom-20"
        style={
          user?.id === id && picUrl !== null
            ? { background: `url(${picUrl}) no-repeat center/cover` }
            : user?.id !== id && user?.picUrl !== null
            ? { background: `url(${user?.picUrl}) no-repeat center/cover` }
            : { background: `url(${picPlaceholder}) no-repeat center/cover` }
        }
      ></div>
      {profileId !== id && !loading && (
        <button
          className="z-10 followBtn absolute right-4 bottom-0 translate-y-[calc(100%+.75rem)] flex items-center justify-center space-x-1 text-md bg-blue-500 text-white text-sm px-4 py-1 rounded-full hover:drop-shadow"
          onClick={
            !btnFollowStatus
              ? () => {
                  dispatch(followUserAction(id!, profileId!, true));
                  updateCount(true);
                  toggleBtnTextFollow();
                }
              : () => {
                  dispatch(followUserAction(id!, profileId!, false));
                  updateCount(false);
                  toggleBtnTextFollow();
                }
          }
        >
          <span className="capitalize">{btnFollowStatus ? userLanguage.profile.unfollow : userLanguage.profile.follow}</span>
        </button>
      )}
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
    </div>
  );
};

export default ProfileBanner;
