import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { BtnFollow, Error, Followers, Layout, ProfileBanner, ProfileInfo, Skeleton, ToggleDiv } from "../components";
import { IDataSet } from "../components/react-app-env";
import { getUserPostsAction } from "../store/actions/posts.action";
import { getFollowersAction } from "../store/actions/user.action";
import { IPost } from "../store/types";
import { datasetTypes } from "../utils/dataForToggleDiv";
import { useGetProfile, useToggle, useToggleTabs } from "../utils/hooks";

const Profile = () => {
  const {
    id,
    role,
    isAuthenticated,
    currentProfileVisit: { id: profileId },
  } = useSelector((state) => state.user);
  const { posts, likes, userPosts } = useSelector((state) => state.posts);
  const [likedPosts, setLikedPosts] = useState<IPost[]>([]);
  const dispatch = useDispatch();
  const { userData, loading } = useGetProfile(profileId!);
  const initialFollowersCount = userData?.followersCount;
  const [updatedFollowersCount, setUpdatedFollowersCount] = useState(initialFollowersCount);
  const [followersOpen, setFollowersOpen] = useState(false);
  const toggleFollowers = useToggle(followersOpen, setFollowersOpen);
  const [divFollowersHeight, setDivFollowersHeight] = useState(0);
  const { toggleTabs, leftTabOpen } = useToggleTabs();
  const [dataset1, setDataset1] = useState<IDataSet>({ name: null, data: null });
  const [dataset2, setDataset2] = useState<IDataSet>({ name: null, data: null });
  const btnFollowRef = useRef<HTMLButtonElement>(null);
  const [btnFollowWidth, setBtnFollowWidth] = useState<number | null>(null);
  const ref = createRef<HTMLDivElement>();
  const [isMounted, setIsMounted] = useState(false);

  const getLikedPostArray = useCallback(() => {
    const postsArr: number[] = [];
    const likedPostArr: IPost[] = [];
    likes?.forEach((like) => {
      if (like.userId === profileId && like.postId !== null) {
        postsArr.push(like.postId!);
      }
    });
    for (let post of posts) {
      for (let id of postsArr) {
        if (post.id === id) {
          likedPostArr.push(post);
        }
      }
    }
    return setLikedPosts(likedPostArr);
  }, [likes, posts, setLikedPosts, profileId]);

  const setDataSets = useCallback(() => {
    setDataset1({
      name: datasetTypes.post,
      data: userPosts,
    });
    setDataset2({
      name: datasetTypes.post,
      data: likedPosts,
    });
  }, [userPosts, likedPosts, setDataset1, setDataset2]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (followersOpen) toggleFollowers();
      if (!leftTabOpen) toggleTabs();
      setIsMounted(true);
    }, 1000);
  }, [profileId]);

  useEffect(() => {
    dispatch(getUserPostsAction(profileId!));
    dispatch(getFollowersAction(profileId!));
    getLikedPostArray();
  }, [profileId, id]);

  useEffect(() => {
    getLikedPostArray();
  }, [profileId, id, likes]);

  useEffect(() => {
    setUpdatedFollowersCount(userData?.followersCount);
  }, [userData]);

  useEffect(() => {
    setDataSets();
  }, [userData, userPosts, likedPosts]);

  useEffect(() => {
    setDivFollowersHeight(ref.current?.getBoundingClientRect().height!);
  }, [ref, leftTabOpen]);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, [profileId]);

  useEffect(() => {
    if (btnFollowRef.current) {
      setBtnFollowWidth(btnFollowRef.current.getBoundingClientRect().width);
    }
  }, [btnFollowRef]);

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Layout>
          <div
            className="page-container relative h-max w-full flex items-start justify-center md:rounded-md text-gray-900 dark:text-gray-100 transition duration-500 dark:md:border-gray-900 md:px-4 lg:px-0 pb-4"
            style={{ minHeight: "calc(100vh - 4rem)" }}
          >
            <Error />
            {!isMounted || userData === undefined || !userData || loading ? (
              <Skeleton element="profile" number={1} />
            ) : (
              <div
                style={{
                  minHeight: "calc(100vh - 7rem)",
                  height: followersOpen ? `${divFollowersHeight}px` : "max-content",
                }}
                className={`w-full overflow-hidden relative bg-white dark:bg-gray-900 transition duration-500 md:rounded-md md:mt-8 flex items-start justify-center`}
              >
                <div
                  className={`w-full h-max transition duration-300 ${
                    followersOpen ? "-translate-x-full" : "translate-x-0"
                  } md:rounded-md  flex flex-col items-center justify-start pb-24 md:pb-12`}
                >
                  <ProfileBanner
                    user={userData}
                    loading={loading}
                    setUpdatedFollowersCount={setUpdatedFollowersCount}
                    updatedFollowersCount={updatedFollowersCount!}
                  />
                  {profileId !== id && !loading && (
                    <BtnFollow
                      userId={null}
                      user={userData}
                      profileId={profileId!}
                      count={updatedFollowersCount!}
                      countSetter={setUpdatedFollowersCount}
                      container={"profile"}
                      btnFollowRef={btnFollowRef}
                    />
                  )}
                  <ProfileInfo
                    user={userData}
                    btnFollowWidth={btnFollowWidth}
                    toggleFollowers={toggleFollowers}
                    updatedFollowersCount={updatedFollowersCount!}
                  />

                  <ToggleDiv
                    bool={leftTabOpen}
                    setter={toggleTabs}
                    dataset1={dataset1}
                    dataset2={dataset2}
                    followersCountSetter={setUpdatedFollowersCount}
                    followersCount={updatedFollowersCount!}
                    container={"profile"}
                  />
                </div>
                <Followers
                  setter={toggleTabs}
                  followersCountSetter={setUpdatedFollowersCount}
                  toggleFollowers={toggleFollowers}
                  followersOpen={followersOpen}
                  username={userData.username}
                  userId={userData.id}
                  bool={leftTabOpen}
                  ref={ref}
                />
              </div>
            )}
          </div>
        </Layout>
      )}
    </>
  );
};

export default Profile;
