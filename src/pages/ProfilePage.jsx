import { TrashIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useLocation } from "react-router-dom";
import { bannerPlaceholder, logo_mobile_blue, picPlaceholder } from "../assets";
import { DeleteModal, EditUsernameModal, Error, Followers, Layout, Post, ProfileOptions, Skeleton } from "../components";
import { getUserPosts } from "../store/actions/posts.action";
import { deleteUser, followUser, getFollowers } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useGetProfile, useLanguage, useToggle } from "../utils/hooks";

const Profile = () => {
  const {
    id,
    picUrl,
    bannerUrl,
    username,
    creationDate,
    role,
    followingCount,
    followersCount,
    followers,
    isAuthenticated,
    language,
  } = useSelector((state) => state?.user);
  const { userPosts, posts, likes } = useSelector((state) => state?.posts);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openProfileOptions, setOpenProfileOptions] = useState(false);
  const [postTabOpen, setPostTabOpen] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const profileId = isAuthenticated ? location?.state?.profileId : null;
  const { userData, loading } = useGetProfile(profileId);
  const userLanguage = useLanguage();
  const initialFollowersCount = userData?.followersCount;
  const [updatedFollowersCount, setUpdatedFollowersCount] = useState(initialFollowersCount);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [isFollowersClicked, setIsFollowersClicked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [btnFollowStatus, setBtnFollowStatus] = useState(isFollowed);
  const toggleDeleteModal = useToggle(openModal, setOpenModal);
  const toggleEditModal = useToggle(openEditModal, setOpenEditModal);
  const toggleProfileOptions = useToggle(openProfileOptions, setOpenProfileOptions);
  const toggleTabs = useToggle(postTabOpen, setPostTabOpen);
  const toggleFollowers = useToggle(followersOpen, setFollowersOpen);
  const toggleBtnTextFollow = useToggle(btnFollowStatus, setBtnFollowStatus);

  const checkIsFollowed = useCallback(
    (id) => {
      const followed = followers?.find((follower) => follower.userId === id);
      if (followed) {
        setIsFollowed(true);
        setBtnFollowStatus(true);
      }
    },
    [followers, id]
  );

  const formatNumber = useCallback((number) => {
    const thousand = 1000;
    const million = 1000000;
    if (number >= million) return `${number / million}M`;
    if (number >= thousand) return `${number / thousand}K`;
    return number;
  }, []);

  const updateCount = useCallback(
    (bool) => {
      bool ? setUpdatedFollowersCount(updatedFollowersCount + 1) : setUpdatedFollowersCount(updatedFollowersCount - 1);
    },
    [setUpdatedFollowersCount, updatedFollowersCount]
  );

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
  }, []);

  useEffect(() => {
    dispatch(getUserPosts(profileId));
    dispatch(getFollowers(profileId));
    getLikedPostArray();
  }, [profileId, userData, dispatch]);

  useEffect(() => {
    setUpdatedFollowersCount(initialFollowersCount);
  }, [userData, initialFollowersCount]);

  useEffect(() => {
    checkIsFollowed(id);
  }, [followers, checkIsFollowed, id]);

  const handleDeleteProfile = useCallback(
    (profileId) => {
      if (profileId === id) {
        dispatch(deleteUser(id));
        history.push("/fin");
      } else if (profileId === userData?.id) {
        dispatch(deleteUser(userData?.id));
        history.push("/fin");
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
            className="page-container relative h-max w-full flex items-start justify-center md:rounded-md text-gray-900 dark:text-gray-100 transition duration-500 lg:border-r lg:border-l lg:border-[#ededed] dark:md:border-gray-900 md:px-12"
            style={{ minHeight: "calc(100vh - 4rem)" }}
          >
            <Error />
            {userData === undefined || !userData || loading ? (
              <Skeleton element="profile" number={1} />
            ) : (
              <div
                style={{ minHeight: "calc(100vh - 7rem)" }}
                className={`bg-white relative dark:bg-gray-900 transition duration-500 border-2 border-purple-500 w-full h-max rounded-md md:mt-8 flex items-start justify-center overflow-x-hidden`}
              >
                <Followers
                  toggleFollowers={toggleFollowers}
                  followersOpen={followersOpen}
                  username={userData.username}
                  userId={userData.id}
                  bool={isFollowersClicked}
                />
                <div
                  className={`border-2 border-red-500 w-full h-max  transition duration-300 ${
                    followersOpen ? "-translate-x-full" : "translate-x-0"
                  } rounded-md  flex flex-col items-center justify-start pb-24 md:pb-12`}
                >
                  <div
                    style={{
                      background: `${
                        userData?.id === id && bannerUrl
                          ? `url(${bannerUrl})`
                          : userData?.id === id && !bannerUrl
                          ? `url(${bannerPlaceholder})`
                          : userData?.id !== id && userData?.bannerUrl
                          ? `url(${userData?.bannerUrl})`
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
                        profileId={profileId}
                      />
                    )}
                    <div
                      className="w-36 h-36 rounded-full border-4 border-white dark:border-gray-900 absolute left-4 -bottom-20"
                      style={
                        userData?.id === id && picUrl !== null
                          ? { background: `url(${picUrl}) no-repeat center/cover` }
                          : userData?.id !== id && userData?.picUrl !== null
                          ? { background: `url(${userData?.picUrl}) no-repeat center/cover` }
                          : { background: `url(${picPlaceholder}) no-repeat center/cover` }
                      }
                    ></div>
                    {openEditModal && <EditUsernameModal toggleEditModal={toggleEditModal} openEditModal={openEditModal} />}
                    {profileId !== id && !loading && (
                      <button
                        className="z-10 followBtn absolute right-4 bottom-0 translate-y-[calc(100%+.75rem)] flex items-center justify-center space-x-1 text-md bg-blue-500 text-white text-sm px-4 py-1 rounded-full hover:drop-shadow"
                        onClick={
                          !btnFollowStatus
                            ? () => {
                                dispatch(followUser(id, profileId, true));
                                updateCount(true);
                                toggleBtnTextFollow();
                              }
                            : () => {
                                dispatch(followUser(id, profileId, false));
                                updateCount(false);
                                toggleBtnTextFollow();
                              }
                        }
                      >
                        <span className="capitalize">
                          {btnFollowStatus ? userLanguage.profile.unfollow : userLanguage.profile.follow}
                        </span>
                      </button>
                    )}
                    <div className="deleteBtn absolute left-4 top-4 w-10/12 pl-4">
                      {role === "admin" && userData?.id !== id && !loading && (
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
                  <div className="username-member mb-2  relative h-max w-full self-start transform flex flex-col items-start justify-start">
                    <span className="translate-x-40 text-xl font-bold capitalize w-[calc(100vw-12rem)] md:w-[68%] overflow-x-hidden overflow-ellipsis pl-1 pr-4">
                      {id === profileId && username
                        ? username
                        : id === profileId && !username
                        ? "Noname"
                        : userData.username
                        ? userData.username
                        : "Noname"}
                    </span>
                    <div className="italic text-sm flex items-center justify-center space-x-1 transform translate-x-40 mt-1">
                      <img src={logo_mobile_blue} className="h-6" alt="forum logo" />
                      <span>{userLanguage.menu.member}</span>
                      <span>
                        {userData?.creationDate
                          ? formatTimestamp(userData?.creationDate, null, language)
                          : creationDate?.length !== 0
                          ? formatTimestamp(creationDate, null, language)
                          : null}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-start space-x-2 text-sm translate-x-40 pl-2 mb-4">
                    <button
                      className="outline-none"
                      onClick={() => {
                        setIsFollowersClicked(false);
                        toggleFollowers();
                      }}
                    >
                      <span className="font-bold font-sans">{profileId === id ? followingCount : userData?.followingCount}</span>
                      Following
                    </button>
                    <button
                      className="outline-none"
                      onClick={() => {
                        setIsFollowersClicked(true);
                        toggleFollowers();
                      }}
                    >
                      <span className="font-bold font-sans">
                        {profileId === id ? formatNumber(followersCount) : formatNumber(updatedFollowersCount)}
                      </span>
                      Followers
                    </button>
                  </div>
                  {openModal && (
                    <DeleteModal
                      toggleDeleteModal={toggleDeleteModal}
                      handleDeleteProfile={handleDeleteProfile}
                      origin={role === "admin" && userData?.id !== id ? "profile-admin" : "profile"}
                    />
                  )}
                  <div className="w-full h-full md:w-11/12 flex flex-col items-center justify-center">
                    <div className="w-full h-min px-4">
                      <div className="tabs-container h-max relative w-full h-full flex items-center justify-evenly">
                        <button
                          onClick={!postTabOpen ? toggleTabs : undefined}
                          className="h-max py-[0.55rem] w-1/2 flex items-center justify-center rounded-tl rounded-tr outline-none font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          {userData?.id !== id ? (
                            <>
                              {userLanguage.profile.userPosts} {`(${userPosts.length})`}
                            </>
                          ) : (
                            <>
                              {userLanguage.profile.posts} {`(${userPosts.length})`}
                            </>
                          )}
                        </button>
                        <button
                          onClick={postTabOpen ? toggleTabs : undefined}
                          className="h-max py-[0.55rem] w-1/2 flex items-center justify-center rounded-tl rounded-tr outline-none font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          {`Likes (${likedPosts.length})`}
                        </button>
                        <div
                          className={`absolute left-0 bottom-0 w-1/2 h-1 bg-blue-500 rounded-full transform transition duration-100 ${
                            postTabOpen ? "translate-x-0" : "translate-x-full"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div className="w-full h-full flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700 transition duration-500">
                      {postTabOpen ? (
                        <div className="w-full h-max flex flex-col items-center justify-center space-y-3">
                          {userPosts.map((post) => (
                            <Post key={post.postId} post={post} />
                          ))}
                        </div>
                      ) : (
                        <div className="w-full h-max flex flex-col items-center justify-center space-y-3">
                          {likedPosts?.map((post) => (
                            <Post key={post.postId} post={post} />
                          ))}
                        </div>
                      )}
                    </div>
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
