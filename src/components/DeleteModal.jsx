import React from "react";
import { useSelector } from "react-redux";

const DeleteModal = ({
  toggleDeleteModal,
  handleDeletePost,
  handleDeleteProfile,
  handleDeleteProfileFromMenu,
  toggleMenu,
  postId,
  origin,
}) => {
  const profileUserId = useSelector((state) => state?.user?.currentProfileVisit.id);
  const userId = useSelector((state) => state?.user?.id);
  const role = useSelector((state) => state?.user?.role);

  let message;
  let handleDelete;

  switch (origin) {
    case "post":
      message = "Supprimer ce post définitivement?";
      handleDelete = handleDeletePost;
      break;
    case "comment":
      message = "Supprimer ce commentaire définitivement?";
      handleDelete = handleDeletePost;
      break;
    case "reply":
      message = "Supprimer cette réponse définitivement?";
      handleDelete = handleDeletePost;
      break;
    case "menu":
      message = "Votre profil est sur le point d'être supprimé définitement de Groupomania.\n Voulez-vous vraiment l'effacer?";
      handleDelete = handleDeleteProfileFromMenu;
      break;
    case "profile":
      message = "Votre profil est sur le point d'être supprimé définitement de Groupomania.\n Voulez-vous vraiment l'effacer?";
      handleDelete = handleDeleteProfile;
      break;
    case "profile-admin":
      message = "Le profil de l'utilisateur va être supprimé définitement de Groupomania.\n Confirmez-vous sa suppression?";
      handleDelete = handleDeleteProfile;
      break;
    default:
  }

  const selectDelete = () => {
    if (role === "admin" && handleDeleteProfile && profileUserId) {
      console.log("je vais deleter le profil de qqun d'autre!");
      return handleDeleteProfile(profileUserId);
    }
    if (role === "admin" && handleDeletePost) {
      return handleDeletePost(postId, null, "post");
    } else if (handleDeleteProfileFromMenu) {
      return handleDeleteProfile(userId);
    } else if (handleDeleteProfile) {
      return handleDeleteProfile(userId);
    } else return handleDelete();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 rounded absolute top-0 left-0 z-50 bg-gray-900 opacity-90 text-white text-sm">
      <span className="w-full h-max text-center px-2 whitespace-wrap overflow-hidden">{message}</span>
      <div className="w-1/3 flex items-center justify-center gap-4 ">
        <button className="w-max px-2 rounded-sm text-center bg-gray-100 text-black " onClick={toggleDeleteModal}>
          Annuler
        </button>
        <button className="w-max px-2 rounded-sm text-center bg-gray-100 text-black " onClick={selectDelete}>
          Oui
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
