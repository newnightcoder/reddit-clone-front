import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  DeleteModal,
  Error,
  Followers,
  FollowersToggle,
  Layout,
  ProfileBanner,
  ProfileInfo,
  Skeleton,
  ToggleDiv,
} from "../components";
import { datasetTypes } from "../components/dataForToggleDiv";
import { IDataSet } from "../components/react-app-env";
import { getUserPostsAction } from "../store/actions/posts.action";
import { deleteUserAction, getFollowersAction } from "../store/actions/user.action";
import { IPost } from "../store/types";
import { history } from "../utils/helpers";
import { useGetProfile, useToggle } from "../utils/hooks";

const Profile = () => {
  const { id, role, followers, isAuthenticated, idCurrentProfileVisit: profileId } = useSelector((state) => state?.user);
  const { posts, likes, userPosts } = useSelector((state) => state?.posts);
  const [openModal, setOpenModal] = useState(false);
  const [postTabOpen, setPostTabOpen] = useState(true);
  const [likedPosts, setLikedPosts] = useState<IPost[]>([]);
  const dispatch = useDispatch();
  const { userData, loading } = useGetProfile(profileId!);
  const initialFollowersCount = userData?.followersCount;
  const [updatedFollowersCount, setUpdatedFollowersCount] = useState(initialFollowersCount);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [isFollowersClicked, setIsFollowersClicked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [btnFollowStatus, setBtnFollowStatus] = useState(isFollowed);
  const toggleDeleteModal = useToggle(openModal, setOpenModal);
  const toggleFollowers = useToggle(followersOpen, setFollowersOpen);
  const toggleTabs = useToggle(postTabOpen, setPostTabOpen);
  const dataset1: IDataSet = {
    name: datasetTypes.post,
    data: userPosts,
  };
  const dataset2: IDataSet = {
    name: datasetTypes.post,
    data: likedPosts,
  };

  const checkIsFollowed = useCallback(
    (id) => {
      const followed = followers?.find((follower) => follower.id === id);
      if (followed) {
        setIsFollowed(true);
        setBtnFollowStatus(true);
      }
    },
    [followers, id]
  );

  const getLikedPostArray = useCallback(() => {
    const postsArr: number[] = [];
    const likedPostArr: IPost[] = [];
    likes?.forEach((like) => {
      if (like.fk_userId_like === profileId && like.fk_postId_like !== null) {
        postsArr.push(like.fk_postId_like!);
      }
    });
    for (let post of posts) {
      for (let id of postsArr) {
        if (post.id === id) {
          likedPostArr.push(post);
        }
      }
    }
    console.log(likedPosts);

    return setLikedPosts(likedPostArr);
  }, [likes, posts, setLikedPosts, profileId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getUserPostsAction(profileId!));
    dispatch(getFollowersAction(profileId!));
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
        dispatch(deleteUserAction(id!));
        history.push("/fin");
      } else if (profileId === userData?.id) {
        dispatch(deleteUserAction(userData?.id!));
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
                  <ProfileBanner
                    user={userData}
                    loading={loading}
                    btnFollowStatus={btnFollowStatus}
                    setBtnFollowStatus={setBtnFollowStatus}
                    setUpdatedFollowersCount={setUpdatedFollowersCount}
                    updatedFollowersCount={updatedFollowersCount!}
                    setOpenModal={setOpenModal}
                  />
                  <ProfileInfo user={userData} />
                  <FollowersToggle
                    user={userData}
                    setIsFollowersClicked={setIsFollowersClicked}
                    toggleFollowers={toggleFollowers}
                    updatedFollowersCount={updatedFollowersCount!}
                  />
                  {openModal && (
                    <DeleteModal
                      toggleDeleteModal={toggleDeleteModal}
                      handleDeleteProfile={handleDeleteProfile}
                      origin={role === "admin" && userData?.id !== id ? "profile-admin" : "profile"}
                    />
                  )}
                  <ToggleDiv bool={postTabOpen} setter={toggleTabs} dataset1={dataset1} dataset2={dataset2} />
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
