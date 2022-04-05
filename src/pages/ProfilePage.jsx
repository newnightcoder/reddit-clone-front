import { TrashIcon, UserCircleIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useLocation } from "react-router-dom";
import { logo_mobile_blue, picPlaceholder } from "../assets";
import { DeleteModal, EditModal, ImgUploader, Post } from "../components";
import Layout from "../components/ Layout";
import { getUserPosts } from "../store/actions/posts.action";
import { deleteUser } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useGetProfile, useLanguage } from "../utils/hooks";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { id, picUrl, username, creationDate, role, isAuthenticated, language } = useSelector((state) => state?.user);
  const posts = useSelector((state) => state?.posts.userPosts);
  const dispatch = useDispatch();
  const location = useLocation();
  const { profileId } = location?.state;
  const userData = useGetProfile(profileId);
  const userLanguage = useLanguage();

  useEffect(() => {
    dispatch(getUserPosts(profileId));
  }, [profileId]);

  const profilePostsTitle = (
    <>
      <span style={{ display: language === "en" ? "none" : "inline-block" }}>{userLanguage.profile.userPosts}</span>&nbsp;
      <span className="capitalize">{userData?.username}</span>
      <span>{language === "en" && userLanguage.profile.userPosts}</span>
    </>
  );

  const toggleDeleteModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const handleDeleteProfile = (profileId) => {
    if (profileId === id) {
      dispatch(deleteUser(id));
      history.push("/fin");
    } else if (profileId === userData.id) {
      dispatch(deleteUser(userData.id));
      history.push({ pathname: "/fin", state: { admin: true } });
    }
  };

  const toggleEditModal = () => {
    setOpenEditModal((openEditModal) => !openEditModal);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <Layout>
          <div className="page-container w-full flex items-center justify-center" style={{ minHeight: "calc(100vh - 4rem)" }}>
            <div
              style={{ minHeight: "calc(100vh - 4rem)" }}
              className="md:bg-white w-full md:w-5/6 pt-10 flex flex-col items-center justify-start gap-2 pb-12"
            >
              <div className="top-section h-max w-10/12 pb-2 flex flex-col items-center justify-center gap-2 border-b border-gray-300">
                <div className="avatar-container h-max w-full flex items-center justify-center">
                  <div
                    className="w-40 h-40 rounded-full border border-gray-400"
                    style={
                      userData?.username === username && picUrl !== null
                        ? { background: `url(${picUrl}) no-repeat center/cover` }
                        : userData?.username !== username && userData?.picUrl !== null
                        ? { background: `url(${userData?.picUrl}) no-repeat center/cover` }
                        : { background: `url(${picPlaceholder}) no-repeat center/cover` }
                    }
                  ></div>
                </div>
                <div className="username-member h-max w-full flex flex-col items-center justify-start">
                  <span className="text-xl font-bold capitalize">{userData?.username}</span>
                  <span className="block italic text-sm flex items-center justify-center gap-1">
                    <img src={logo_mobile_blue} className="h-6" />
                    <span>{userLanguage.profile.member}</span>
                    {userData?.creationDate
                      ? formatTimestamp(userData.creationDate, null, language)
                      : creationDate?.length !== 0
                      ? formatTimestamp(creationDate, null, language)
                      : null}
                  </span>
                </div>
              </div>
              <div className="main-section h-full w-10/12 flex flex-col items-center justify-start gap-2">
                {userData?.username === username && <ImgUploader profile={true} />}
                {userData?.username === username && (
                  <ul className="h-max w-11/12 xl:w-3/4 2xl:w-2/3 flex items-start justify-center gap-3 md:justify-evenly pt-10 md:pt-0 pl-4 mb-4 text-sm text-gray-900">
                    <li>
                      <button
                        className="h-10 w-max px-3 py-1 flex items-center justify-center gap-1 hover:drop-shadow hover:bg-gray-700 text-gray-700 hover:text-white transition duration-200 rounded-full"
                        // onClick={toggleEditModal}
                      >
                        <UserCircleIcon className="h-8" /> {userLanguage.profile.usernameBtn}
                      </button>
                    </li>
                    <li>
                      <button
                        className="h-10 w-max px-3 py-1 flex items-center justify-center gap-1 hover:drop-shadow hover:bg-red-600 text-gray-700 hover:text-white hover:font-bold transition duration-300 rounded-full text-sm"
                        onClick={() => setOpenModal(true)}
                      >
                        <TrashIcon className="h-8" />
                        {userLanguage.profile.deleteBtn}{" "}
                      </button>
                    </li>
                  </ul>
                )}
              </div>
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
              {openEditModal && <EditModal toggleEditModal={toggleEditModal} openEditModal={openEditModal} />}
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
                <div className="w-full md:w-2/3 max-w-3xl flex flex-col items-center justify-center gap-3 pt-4">
                  {posts.map((post) => (
                    <Post key={post.postId} post={post} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Profile;
