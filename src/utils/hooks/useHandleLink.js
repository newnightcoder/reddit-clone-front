import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleVisitorModal } from "../../store/actions/user.action";
import history from "../helpers/history";
import useLinkToProfile from "./useLinkToProfile";

const useHandleLink = () => {
  const visitorMessage = useRef("");
  const { id, username, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const linkToProfile = useLinkToProfile();

  const handleVisitorModal = (origin) => {
    switch (origin) {
      case "post":
        visitorMessage.current = "Veuillez créer un compte pour publier un post!";
        break;
      case "profile":
        visitorMessage.current = "Veuillez créer un compte pour voir votre profil!";
        break;
      case "login":
        visitorMessage.current = "Veuillez vous inscrire pour vous connecter à Forum!";
        break;
      case "post-profile":
        visitorMessage.current = "Veuillez vous inscrire pour voir le profil des utilisateurs!";
        break;
      case "new-members":
        visitorMessage.current = "Veuillez vous inscrire pour voir les nouveaux membres!";
        break;
      case "mods":
        visitorMessage.current = "Veuillez vous inscrire pour voir les modérateurs!";
        break;
      case "like":
        visitorMessage.current = "Veuillez vous inscrire pour liker les posts des utilisateurs!";
        break;
      case "comment":
        visitorMessage.current = "Veuillez vous inscrire pour voir et laisser des commentaires!";
        break;
      case "delete":
        visitorMessage.current = "Rien à supprimer, vous n'avez pas encore de profil sur Forum!";
        break;
      default:
        visitorMessage.current = "";
    }
    dispatch(toggleVisitorModal(visitorMessage.current));
  };

  const handleLink = useCallback(
    (link, userId, username) => {
      switch (link) {
        case "post":
          if (!isAuthenticated) return handleVisitorModal("post");
          return history.push("/create");
        case "profile":
          if (!isAuthenticated) return handleVisitorModal("profile");
          return linkToProfile(userId, username);
        case "navbar-profile":
          if (!isAuthenticated) return handleVisitorModal("profile");
          return linkToProfile(userId, username);
        case "navbar-login":
          if (!isAuthenticated) return handleVisitorModal("login");
          return history.push("/login");
        case "post-profile":
          if (!isAuthenticated) return handleVisitorModal("post-profile");
          linkToProfile(userId, username);
        case "new-members":
          if (!isAuthenticated) return handleVisitorModal("new-members");
          return linkToProfile(userId, username);
        case "mods":
          if (!isAuthenticated) return handleVisitorModal("mods");
          return linkToProfile(userId, username);
        case "like":
          if (!isAuthenticated) return handleVisitorModal("like");
        case "comment":
          if (!isAuthenticated) return handleVisitorModal("comment");
        case "delete":
          if (!isAuthenticated) return handleVisitorModal("delete");
        default:
      }
    },
    [visitorMessage.current]
  );

  return handleLink;
};

export default useHandleLink;
