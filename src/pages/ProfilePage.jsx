import { TrashIcon } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useLocation } from "react-router-dom";
import { bannerPlaceholder, logo_mobile_blue, picPlaceholder } from "../assets";
import { DeleteModal, EditUsernameModal, Layout, Post, ProfileOptions, Skeleton } from "../components";
import { getUserPosts } from "../store/actions/posts.action";
import { deleteUser } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useError, useGetProfile, useLanguage } from "../utils/hooks";

const Profile = () => {
  const { id, picUrl, bannerUrl, username, creationDate, role, isAuthenticated, language } = useSelector((state) => state?.user);
  const { userPosts, posts, likes } = useSelector((state) => state?.posts);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openProfileOptions, setOpenProfileOptions] = useState(false);
  const [postTabOpen, setPostTabOpen] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const profileId = isAuthenticated ? location?.state?.profileId : null;
  const userData = useGetProfile(profileId);
  const userLanguage = useLanguage();
  const error = useError();

  const getLikedPostArray = useCallback(() => {
    const postsArr = [];
    const likedPostArr = [];
    likes?.forEach((like) => {
      if (like.fk_userId_like === profileId && like.fk_postId_like !== null) {
        postsArr.push(like.fk_postId_like);
      }
    });
    for (let post of posts) {
      for (let id of postsArr) {
        if (post.postId === id) {
          likedPostArr.push(post);
        }
      }
    }
    return setLikedPosts(likedPostArr);
  }, [likes, posts, setLikedPosts, profileId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) return;
    dispatch(getUserPosts(profileId));
    getLikedPostArray();
  }, [profileId, error, userData, dispatch]);

  const toggleTabs = useCallback(() => {
    if (postTabOpen) {
      return setPostTabOpen(false);
    } else setPostTabOpen(true);
  }, [postTabOpen, setPostTabOpen]);

  const toggleDeleteModal = useCallback(() => {
    setOpenModal((openModal) => !openModal);
  }, []);

  const toggleEditModal = useCallback(() => {
    setOpenEditModal((openEditModal) => !openEditModal);
  }, [setOpenEditModal]);

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
        <Redirect to="/" />
      ) : (
        <Layout>
          <div
            className="page-container relative h-max w-full flex items-start justify-center md:rounded-md"
            style={{ minHeight: "calc(100vh - 4rem)" }}
          >
            {error && (
              <div className="fixed top-16 inset-x-0 h-min w-full p-2 bg-black text-center text-white text-sm z-10 whitespace-pre rounded">
                {error}
              </div>
            )}
            {userData === undefined || !userData ? (
              <Skeleton element="profile" number={1} />
            ) : (
              <div
                style={{ minHeight: "calc(100vh - 7rem)" }}
                className="bg-white dark:bg-gray-900 w-full h-max md:w-5/6 rounded-md md:mt-8 flex flex-col items-center justify-start space-y-3 pb-24 md:pb-12"
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
                  {openEditModal && <EditUsernameModal toggleEditModal={toggleEditModal} openEditModal={openEditModal} />}
                </div>
                <div className="username-member relative h-max w-max self-start transform translate-x-44 flex flex-col items-start justify-start">
                  <span className="text-xl font-bold capitalize">{id === profileId ? username : userData.username}</span>
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
                <div className="w-full h-full md:w-10/12 flex flex-col items-center justify-center">
                  <div className="w-full h-min px-4">
                    <div className="relative w-full h-full flex items-center justify-evenly">
                      <button
                        onClick={!postTabOpen ? toggleTabs : undefined}
                        className="h-12 w-1/2 flex items-center justify-center outline-none font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {userData?.id !== id ? (
                          <>
                            {userLanguage.profile.userPosts}&nbsp;
                            {`(${userPosts.length})`}
                          </>
                        ) : (
                          `${userLanguage.profile.posts} (${userPosts.length})`
                        )}
                      </button>
                      <button
                        onClick={postTabOpen ? toggleTabs : undefined}
                        className="h-12 w-1/2 flex items-center justify-center outline-none font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {`Likes (${likedPosts.length})`}
                      </button>
                      <div
                        className={`absolute left-0 bottom-0 w-1/2 h-1 bg-blue-500 transform transition duration-100 ${
                          postTabOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <div className="w-full max-w-3xl h-full flex items-center justify-center pt-4 border-t border-gray-200">
                    {postTabOpen ? (
                      <div className="w-full h-max flex flex-col items-center justify-center space-y-3">
                        {userPosts.map((post) => (
                          <Post key={post.postId} post={post} />
                        ))}
                      </div>
                    ) : (
                      <div className="w-full max-w-3xl h-max flex flex-col items-center justify-center space-y-3">
                        {likedPosts?.map((post) => (
                          <Post key={post.postId} post={post} />
                        ))}
                      </div>
                    )}
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
