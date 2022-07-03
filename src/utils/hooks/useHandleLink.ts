import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleVisitorModalAction } from "../../store/actions/user.action";
import history from "../helpers/history";
import useLanguage from "./useLanguage";
import useLinkToProfile from "./useLinkToProfile";

const useHandleLink = () => {
  const visitorMessage = useRef("");
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const linkToProfile = useLinkToProfile();
  const userLanguage = useLanguage();

  const handleVisitorModal = useCallback(
    (origin) => {
      switch (origin) {
        case "post":
          visitorMessage.current = userLanguage.visitorModal.msgPost;
          break;
        case "profile":
          visitorMessage.current = userLanguage.visitorModal.msgSelfProfile;
          break;
        case "login":
          visitorMessage.current = userLanguage.visitorModal.msgConnect;
          break;
        case "post-profile":
          visitorMessage.current = userLanguage.visitorModal.msgProfiles;
          break;
        case "new-members":
          visitorMessage.current = userLanguage.visitorModal.msgNewMembers;
          break;
        case "mods":
          visitorMessage.current = userLanguage.visitorModal.msgMods;
          break;
        case "like":
          visitorMessage.current = userLanguage.visitorModal.msgLike;
          break;
        case "comment":
          visitorMessage.current = userLanguage.visitorModal.msgComments;
          break;
        case "delete":
          visitorMessage.current = userLanguage.visitorModal.msgDeleteProfile;
          break;
        default:
          visitorMessage.current = "";
      }
      dispatch(toggleVisitorModalAction(visitorMessage.current));
    },
    [visitorMessage, userLanguage, dispatch]
  );

  const handleLink = useCallback(
    (link: string, userId?: number, username?: string) => {
      switch (link) {
        case "post":
          if (!isAuthenticated) return handleVisitorModal("post");
          break;
        case "profile":
          if (!isAuthenticated) return handleVisitorModal("profile");
          return linkToProfile(userId!, username!);
        case "navbar-profile":
          if (!isAuthenticated) return handleVisitorModal("profile");
          return linkToProfile(userId!, username!);
        case "navbar-login":
          if (!isAuthenticated) return handleVisitorModal("login");
          return history.push("/login");
        case "post-profile":
          if (!isAuthenticated) return handleVisitorModal("post-profile");
          linkToProfile(userId!, username!);
          break;
        case "new-members":
          if (!isAuthenticated) return handleVisitorModal("new-members");
          return linkToProfile(userId!, username!);
        case "mods":
          if (!isAuthenticated) return handleVisitorModal("mods");
          return linkToProfile(userId!, username!);
        case "like":
          if (!isAuthenticated) return handleVisitorModal("like");
          break;
        case "comment":
          if (!isAuthenticated) return handleVisitorModal("comment");
          break;
        case "delete":
          if (!isAuthenticated) return handleVisitorModal("delete");
          break;
        default:
      }
    },
    [isAuthenticated, linkToProfile]
  );

  return handleLink;
};

export default useHandleLink;
