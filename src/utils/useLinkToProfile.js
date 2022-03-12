import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getUserProfile } from "../store/actions/user.action";

const useLinkToProfile = () => {
  const { id, username } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const linkToProfile = (id) => {
    dispatch(getUserProfile(id));
    setTimeout(() => {
      history.push(`/profile/${username}`);
    }, 100);
  };

  return linkToProfile;
};

export default useLinkToProfile;
