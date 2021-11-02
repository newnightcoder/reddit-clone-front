import React from "react";
import { useSelector } from "react-redux";

const DeleteModal = ({
  toggleDeleteModal,
  handleDeletePost,
  handleDeleteProfile,
  handleDeleteProfileFromMenu,
  toggleMenu,
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
    case "menu":
      message =
        "Votre profil est sur le point d'être supprimé définitement de Groupomania.\n Voulez-vous vraiment l'effacer?";
      handleDelete = handleDeleteProfileFromMenu;
      break;
    case "profile":
      message =
        "Votre profil est sur le point d'être supprimé définitement de Groupomania.\n Voulez-vous vraiment l'effacer?";
      handleDelete = handleDeleteProfile;
      break;
    default:
  }

  const selectDelete = () => {
    if (role === "admin") {
      console.log("je vais deleter le profil de qqun d'autre!");
      if (handleDeleteProfile && profileUserId) {
        return handleDeleteProfile(profileUserId);
      }
    } else if (handleDeleteProfileFromMenu) {
      return handleDeleteProfile(userId);
    } else if (handleDeleteProfile) {
      return handleDeleteProfile(userId);
    } else return handleDelete();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 rounded absolute top-0 left-0 z-50 bg-gray-900 opacity-90 text-white text-sm">
      <span className="w-full h-max text-center px-2 whitespace-wrap overflow-hidden">
        {message}
      </span>
      <div className="w-1/3 flex items-center justify-center gap-4 ">
        <button
          className="w-max px-2 rounded-sm text-center bg-gray-100 text-black "
          onClick={toggleDeleteModal}
        >
          Annuler
        </button>
        <button
          className="w-max px-2 rounded-sm text-center bg-gray-100 text-black "
          onClick={selectDelete}
        >
          Oui
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
