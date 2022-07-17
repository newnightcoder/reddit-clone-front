import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUserAction } from "../store/actions/user.action";
import { useLanguage, useToggle } from "../utils/hooks";
import { BtnFollowProps } from "./react-app-env";

const BtnFollow = ({ userId, profileId, countSetter, count, container }: BtnFollowProps) => {
  const {
    id,
    followers,
    following,
    currentProfileVisit: { followers: userFollowers, following: userFollowing },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  // const [isFollowed, setIsFollowed] = useState(false);
  const statusBtnProfile = container === "profile" && userFollowers.some((follower) => follower.userId === id);
  const statusBtnFollowerCard = container === "follower" && following.some((follow) => follow.userId === userId);
  const [btnFollowStatusProfile, setBtnFollowStatusProfile] = useState(statusBtnProfile);
  const [btnFollowStatusFollowerCard, setBtnFollowStatusFollowerCard] = useState(statusBtnFollowerCard);
  const toggleBtnProfileTextFollow = useToggle(btnFollowStatusProfile, setBtnFollowStatusProfile);
  const toggleBtnFollowerCardTextFollow = useToggle(btnFollowStatusFollowerCard, setBtnFollowStatusFollowerCard);

  const checkIsFollowed = useCallback(() => {
    setBtnFollowStatusProfile(userFollowers.some((follower) => follower.userId === id));
    setBtnFollowStatusFollowerCard(following.some((follow) => follow.userId === userId));
  }, [userFollowers, following, userId, id, setBtnFollowStatusProfile, setBtnFollowStatusFollowerCard]);

  const updateCount = useCallback(
    (bool: boolean) => {
      bool ? countSetter(count + 1) : countSetter(count - 1);
    },
    [countSetter, count]
  );

  useEffect(() => {
    checkIsFollowed();
    console.log("container", container);
  }, []);
  // useEffect(() => {
  //   return () => {
  //     setBtnFollowStatusProfile(false);
  //     setBtnFollowStatusFollowerCard(false);
  //   };
  // }, []);

  return (
    <button
      className={`z-10 followBtn ${
        container === "profile"
          ? "absolute right-4 bottom-0 translate-y-[calc(100%+.8rem)]"
          : container === "follower"
          ? "relative"
          : ""
      }  flex items-center justify-center space-x-1 text-md bg-blue-500 text-white text-sm px-4 py-1 rounded-full hover:drop-shadow`}
      onClick={
        !btnFollowStatusProfile
          ? () => {
              dispatch(followUserAction(id!, profileId!, true));
              updateCount(true);
              toggleBtnProfileTextFollow();
              toggleBtnFollowerCardTextFollow();
            }
          : () => {
              dispatch(followUserAction(id!, profileId!, false));
              updateCount(false);
              toggleBtnProfileTextFollow();
              toggleBtnFollowerCardTextFollow();
            }
      }
    >
      <span className="capitalize">
        {(container === "profile" && btnFollowStatusProfile) || (container === "follower" && btnFollowStatusFollowerCard)
          ? userLanguage.profile.unfollow
          : userLanguage.profile.follow}
      </span>
    </button>
  );
};

export default BtnFollow;
