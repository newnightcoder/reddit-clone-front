import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setProfileVisitIdAction } from "../../store/actions/user.action";

const useLinkToProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const linkToProfile = (userId: number, name: string) => {
    dispatch(setProfileVisitIdAction(userId));
    setTimeout(() => {
      history.push(`/profile/${name}`);
    }, 100);
  };

  return linkToProfile;
};

export default useLinkToProfile;
