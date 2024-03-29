import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUserAction } from "../../store/actions/user.action";
import { useLanguage, useToggle } from "../../utils/hooks";
import { BtnFollowProps } from "../react-app-env";

const BtnFollow = ({ userId, profileId, user, countSetter, count, container, btnFollowRef }: BtnFollowProps) => {
  const {
    id,
    following,
    currentProfileVisit: { followers: userFollowers },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const statusBtnProfile = container === "profile" && userFollowers.some((follower) => follower.userId === id) ? true : false;
  const statusBtnFollowerCard =
    container === "followerCard" && following.some((follow) => follow.userId === userId) ? true : false;
  const [btnFollowStatusProfile, setBtnFollowStatusProfile] = useState(statusBtnProfile);
  const [btnFollowStatusFollowerCard, setBtnFollowStatusFollowerCard] = useState(statusBtnFollowerCard);
  const toggleBtnProfileTextFollow = useToggle(btnFollowStatusProfile, setBtnFollowStatusProfile);
  const toggleBtnFollowerCardTextFollow = useToggle(btnFollowStatusFollowerCard, setBtnFollowStatusFollowerCard);
  const [isMounted, setIsMounted] = useState(false);

  const updateCount = useCallback(
    (bool: boolean) => {
      bool ? countSetter(count + 1) : countSetter(count - 1);
    },
    [countSetter, count]
  );

  useEffect(() => {
    setIsMounted(false);
    if (container === "profile") {
      setBtnFollowStatusProfile(userFollowers.some((follower) => follower.userId === id));
    }
    if (container === "FollowerCard") {
      setBtnFollowStatusFollowerCard(following.some((follow) => follow.userId === userId));
    }
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, [container, userFollowers, following, id, userId]);

  const handleFollow = useCallback(() => {
    if (container === "profile") {
      if (!btnFollowStatusProfile) {
        dispatch(followUserAction(id!, profileId!, user, true, "profile"));
        updateCount(true);
      } else {
        dispatch(followUserAction(id!, profileId!, user, false, "profile"));
        updateCount(false);
      }
    }
    if (container === "followerCard") {
      if (!btnFollowStatusFollowerCard) {
        dispatch(followUserAction(id!, userId!, user, true, "followerCard"));
        updateCount(true);
      } else {
        dispatch(followUserAction(id!, userId!, user, false, "followerCard"));
        updateCount(false);
      }
    }
    toggleBtnProfileTextFollow();
    toggleBtnFollowerCardTextFollow();
  }, [
    container,
    btnFollowStatusProfile,
    btnFollowStatusFollowerCard,
    dispatch,
    updateCount,
    toggleBtnProfileTextFollow,
    toggleBtnFollowerCardTextFollow,
    id,
    profileId,
    user,
    userId,
  ]);

  return (
    <button
      ref={btnFollowRef}
      className={`z-10 followBtn ${
        container === "profile" ? "absolute right-4 top-0 translate-y-[12.8rem]" : container === "followerCard" ? "relative" : ""
      }  flex items-center justify-center space-x-1 text-md bg-blue-500 text-white text-sm px-4 py-1 rounded-full hover:drop-shadow`}
      onClick={handleFollow}
    >
      {isMounted && (
        <span className="capitalize">
          {(container === "profile" && btnFollowStatusProfile) || (container === "followerCard" && btnFollowStatusFollowerCard)
            ? userLanguage.profile.unfollow
            : userLanguage.profile.follow}
        </span>
      )}
    </button>
  );
};

export default BtnFollow;
