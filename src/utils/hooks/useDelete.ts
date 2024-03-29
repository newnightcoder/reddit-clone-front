import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeleteModalProps } from "../../components/react-app-env";
import useLanguage from "./useLanguage";

const useDelete = (props: DeleteModalProps) => {
  const { postId, postIdComment, origin, handleDeletePost, handleDeleteProfile, handleDeleteProfileFromMenu, profile } = props;
  const [message, setMessage] = useState("");
  const {
    currentProfileVisit: { id: profileId },
  } = useSelector((state) => state.user);
  const userId = useSelector((state) => state?.user?.id);
  const userLanguage = useLanguage();

  const toggleMessage = useCallback(() => {
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
  }, [setMessage, userLanguage, message, origin]);

  const deleteFunction = useCallback(() => {
    switch (origin) {
      case "post":
        return handleDeletePost!(postId!, origin, null, profile);
      case "comment":
        return handleDeletePost!(postId!, origin, postIdComment!);
      case "reply":
        return handleDeletePost!(postId!, origin, postIdComment!);
      case "menu":
        return handleDeleteProfileFromMenu!(userId!);
      case "profile":
        return handleDeleteProfile!(userId!);
      case "profile-admin":
        return handleDeleteProfile!(profileId!);
      default:
        return;
    }
  }, [
    origin,
    postId,
    profile,
    postIdComment,
    userId,
    profileId,
    handleDeletePost,
    handleDeleteProfileFromMenu,
    handleDeleteProfile,
  ]);

  useEffect(() => {
    toggleMessage();
  }, [userLanguage, toggleMessage]);

  return { message, deleteFunction };
};

export default useDelete;
