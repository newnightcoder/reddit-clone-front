import { TrashIcon } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useLocation } from "react-router-dom";
import { bannerPlaceholder, logo_mobile_blue, picPlaceholder } from "../assets";
import { DeleteModal, EditModal, Layout, Post, ProfileOptions, Skeleton } from "../components";
import { getUserPosts } from "../store/actions/posts.action";
import { deleteUser } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useGetProfile, useLanguage } from "../utils/hooks";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openProfileOptions, setOpenProfileOptions] = useState(false);
  const { id, picUrl, bannerUrl, username, creationDate, role, isAuthenticated, language } = useSelector((state) => state?.user);
  const posts = useSelector((state) => state?.posts.userPosts);
  const dispatch = useDispatch();
  const location = useLocation();
  const { profileId } = location?.state;
  const userData = useGetProfile(profileId);
  const userLanguage = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUserPosts(profileId));
  }, [profileId, dispatch]);

  const profilePostsTitle = (
    <>
      <span style={{ display: language === "en" ? "none" : "inline-block" }}>{userLanguage.profile.userPosts}</span>&nbsp;
      <span className="capitalize">{userData?.username}</span>
      <span>{language === "en" && userLanguage.profile.userPosts}</span>
    </>
  );

  const toggleDeleteModal = useCallback(() => {
    setOpenModal((openModal) => !openModal);
  }, []);

  const toggleEditModal = useCallback(() => {
    setOpenEditModal((openEditModal) => !openEditModal);
  }, []);

  const toggleProfileOptions = useCallback(() => {
    setOpenProfileOptions((prevState) => !prevState);
  }, [setOpenProfileOptions]);

  const handleDeleteProfile = useCallback(
    (profileId) => {
      if (profileId === id) {
        dispatch(deleteUser(id));
        history.push("/fin");
      } else if (profileId === userData?.id) {
        dispatch(deleteUser(userData?.id));
        history.push({ pathname: "/fin", state: { admin: true } });
      }
    },
    [dispatch, id, userData]
  );

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <Layout>
          <div
            className="page-container h-full w-full  flex items-start md:items-center justify-center md:rounded-md"
            style={{ minHeight: "calc(100vh - 4rem)" }}
          >
            {userData === undefined || !userData ? (
              <Skeleton element="profile" number={1} />
            ) : (
              <div
                style={{ minHeight: "calc(100vh - 7rem)" }}
                className="bg-white dark:bg-gray-900 w-full md:w-5/6 rounded-md md:mt-8 flex flex-col items-center justify-start gap-2 pb-24 md:pb-12"
              >
                <div
                  style={{
                    background: `url(${
                      bannerUrl ? bannerUrl : userData.bannerUrl ? userData.bannerUrl : bannerPlaceholder
                    }) no-repeat center/cover`,
                  }}
                  className="top-section relative h-48 w-full pb-2 flex flex-col items-center justify-center gap-2 md:rounded-tl-md md:rounded-tr-md"
                >
                  {profileId === id && (
                    <button
                      className="absolute top-4 right-4 flex items-center justify-center space-x-1 text-xs italic text-white py-1 px-6 rounded-full shadow-xl bg-blue-400 dark:bg-black transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
                      onClick={toggleProfileOptions}
                    >
                      Edit profile
                    </button>
                  )}
                  {openProfileOptions && (
                    <ProfileOptions
                      setOpenModal={setOpenModal}
                      toggleEditModal={toggleEditModal}
                      toggleProfileOptions={toggleProfileOptions}
                      profileId={profileId}
                    />
                  )}
                  <div
                    className="w-36 h-36 rounded-full border-4 border-white dark:border-gray-900 absolute left-4 -bottom-20"
                    style={
                      userData?.username === username && picUrl !== null
                        ? { background: `url(${picUrl}) no-repeat center/cover` }
                        : userData?.username !== username && userData?.picUrl !== null
                        ? { background: `url(${userData?.picUrl}) no-repeat center/cover` }
                        : { background: `url(${picPlaceholder}) no-repeat center/cover` }
                    }
                  ></div>
                  {openEditModal && <EditModal toggleEditModal={toggleEditModal} openEditModal={openEditModal} />}
                </div>
                <div className="username-member relative h-max w-max self-start transform translate-x-44 flex flex-col items-start justify-start">
                  <span className="text-xl font-bold capitalize">{userData?.id === id ? username : userData.username}</span>
                  <span className="block italic text-sm flex items-center justify-center gap-1 transform -translate-x-2">
                    <img src={logo_mobile_blue} className="h-6" alt="forum logo" />
                    <span>{userLanguage.profile.member}</span>
                    {userData?.creationDate
                      ? formatTimestamp(userData?.creationDate, null, language)
                      : creationDate?.length !== 0
                      ? formatTimestamp(creationDate, null, language)
                      : null}
                  </span>
                </div>

                <div className="main-container h-full w-10/12 flex flex-col items-center justify-start"></div>
                <div className="w-10/12 pl-4">
                  {role === "admin" && userData?.id !== id && (
                    <button
                      className="flex items-center justify-center gap-1 text-md rounded-full hover:drop-shadow"
                      onClick={() => setOpenModal(true)}
                    >
                      <TrashIcon className="h-8 text-gray-700" />
                      {userLanguage.profile.modDeleteBtn}
                    </button>
                  )}
                </div>
                {openModal && (
                  <DeleteModal
                    toggleDeleteModal={toggleDeleteModal}
                    handleDeleteProfile={handleDeleteProfile}
                    origin={role === "admin" && userData?.id !== id ? "profile-admin" : "profile"}
                  />
                )}
                <div className="w-10/12 flex flex-col items-center justify-center">
                  <h2 className="font-bold">
                    {userData?.id !== id ? (
                      <>
                        {profilePostsTitle}&nbsp;
                        {`(${posts.length})`}
                      </>
                    ) : (
                      `${userLanguage.profile.posts} (${posts.length})`
                    )}
                  </h2>
                  <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-3 pt-4">
                    {posts.map((post) => (
                      <Post key={post.postId} post={post} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Layout>
      )}
    </>
  );
};

export default Profile;
