import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setProfileVisitIdAction } from "../../store/actions/user.action";
import history from "../helpers/history";

const useLinkToProfile = () => {
  const dispatch = useDispatch();

  const linkToProfile = useCallback(
    (userId: number, name: string) => {
      dispatch(setProfileVisitIdAction(userId));
      setTimeout(() => {
        history.push(`/profile/${name}`);
      }, 100);
    },
    [dispatch]
  );

  return linkToProfile;
};

export default useLinkToProfile;
