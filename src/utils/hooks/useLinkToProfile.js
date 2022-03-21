import { useHistory } from "react-router";

const useLinkToProfile = (id, username) => {
  const history = useHistory();

  const linkToProfile = () => {
    setTimeout(() => {
      history.push({ pathname: `/profile/${username}`, state: { profileId: id } });
    }, 100);
  };

  return linkToProfile;
};

export default useLinkToProfile;
