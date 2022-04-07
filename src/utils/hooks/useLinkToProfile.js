import { useHistory } from "react-router";

const useLinkToProfile = () => {
  const history = useHistory();

  const linkToProfile = (userId, name) => {
    setTimeout(() => {
      history.push({
        pathname: `/profile/${name}`,
        state: { profileId: userId },
      });
    }, 100);
  };

  return linkToProfile;
};

export default useLinkToProfile;
