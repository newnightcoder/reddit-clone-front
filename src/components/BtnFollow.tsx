import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUserAction } from "../store/actions/user.action";
import { useLanguage, useToggle } from "../utils/hooks";
import { BtnFollowProps } from "./react-app-env";

const BtnFollow = ({ profileId, countSetter, count, container }: BtnFollowProps) => {
  const { id, followers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const [isFollowed, setIsFollowed] = useState(false);
  const [btnFollowStatus, setBtnFollowStatus] = useState(isFollowed);
  const toggleBtnTextFollow = useToggle(btnFollowStatus, setBtnFollowStatus);

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

  const updateCount = useCallback(
    (bool: boolean) => {
      bool ? countSetter(count + 1) : countSetter(count - 1);
    },
    [countSetter, count]
  );

  useEffect(() => {
    checkIsFollowed(id);
  }, [followers, checkIsFollowed, id]);

  return (
    <button
      className={`z-10 followBtn ${
        container === "profile"
          ? "absolute right-4 bottom-0 translate-y-[calc(100%+.75rem)]"
          : container === "follower"
          ? "relative"
          : ""
      }  flex items-center justify-center space-x-1 text-md bg-blue-500 text-white text-sm px-4 py-1 rounded-full hover:drop-shadow`}
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
  );
};

export default BtnFollow;
