import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLanguage from "./useLanguage";

const useDelete = (props) => {
  const { postId, postIdComment, origin, handleDeletePost, handleDeleteProfile, handleDeleteProfileFromMenu } = props;
  const [message, setMessage] = useState("");
  const profileUserId = useSelector((state) => state?.user?.currentProfileVisit.id);
  const userId = useSelector((state) => state?.user?.id);
  const userLanguage = useLanguage();

  const toggleMessage = () => {
    switch (origin) {
      case "post":
        return setMessage(userLanguage.deleteModal.msgPost);
      case "comment":
        return setMessage(userLanguage.deleteModal.msgComment);
      case "reply":
        return setMessage(userLanguage.deleteModal.msgReply);
      case "menu":
        return setMessage(userLanguage.deleteModal.msgWarning);
      case "profile":
        return setMessage(userLanguage.deleteModal.msgWarning);
      case "profile-admin":
        return setMessage(userLanguage.deleteModal.msgModWarning);
      default:
        return message;
    }
  };

  const deleteFunction = () => {
    switch (origin) {
      case "post":
        return handleDeletePost(postId, origin, null);
      case "comment":
        return handleDeletePost(postId, origin, postIdComment);
      case "reply":
        return handleDeletePost(postId, origin, null);
      case "menu":
        return handleDeleteProfileFromMenu(userId);
      case "profile":
        return handleDeleteProfile(userId);
      case "profile-admin":
        return handleDeleteProfile(profileUserId);
      default:
        return deleteFunction;
    }
  };

  useEffect(() => {
    toggleMessage();
  }, [userLanguage]);

  return { message, deleteFunction };
};

export default useDelete;
