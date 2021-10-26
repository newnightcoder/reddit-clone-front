import React from "react";

const DeleteModal = ({
  toggleDeleteModal,
  handleDeletePost,
  handleDeleteProfile,
  origin,
}) => {
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
      handleDelete = handleDeleteProfile;

      break;
    default:
  }

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
          onClick={handleDelete}
        >
          Oui
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
