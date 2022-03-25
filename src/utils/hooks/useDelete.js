import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useDelete = (props) => {
  const { postId, postIdComment, origin, handleDeletePost, handleDeleteProfile, handleDeleteProfileFromMenu } = props;
  const [message, setMessage] = useState("");
  const profileUserId = useSelector((state) => state?.user?.currentProfileVisit.id);
  const userId = useSelector((state) => state?.user?.id);

  const toggleMessage = () => {
    switch (origin) {
      case "post":
        return setMessage("Supprimer ce post définitivement?");
      case "comment":
        return setMessage("Supprimer ce commentaire définitivement?");
      case "reply":
        return setMessage("Supprimer cette réponse définitivement?");
      case "menu":
        return setMessage(
          "Votre profil est sur le point d'être supprimé définitement de Groupomania.\n Voulez-vous vraiment l'effacer?"
        );
      case "profile":
        return setMessage(
          "Votre profil est sur le point d'être supprimé définitement de Groupomania.\n Voulez-vous vraiment l'effacer?"
        );
      case "profile-admin":
        return setMessage(
          "Le profil de l'utilisateur va être supprimé définitement de Groupomania.\n Confirmez-vous sa suppression?"
        );
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
  }, []);

  return { message, deleteFunction };
};

export default useDelete;
