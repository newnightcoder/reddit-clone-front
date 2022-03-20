import React from "react";
import useDelete from "../utils/useDelete";

const DeleteModal = (props) => {
  const {
    toggleDeleteModal,
    handleDeletePost,
    handleDeleteProfile,
    handleDeleteProfileFromMenu,
    toggleMenu,
    postId,
    postIdComment,
    origin,
  } = props;
  const { message, deleteFunction } = useDelete(props);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 rounded absolute top-0 left-0 z-50 bg-gray-900 opacity-90 text-white text-sm">
      <span className="w-full h-max text-center px-2 whitespace-wrap overflow-hidden">{message}</span>
      <div className="w-1/3 flex items-center justify-center gap-4 ">
        <button className="w-max px-2 rounded-sm text-center bg-gray-100 text-black " onClick={toggleDeleteModal}>
          Annuler
        </button>
        <button className="w-max px-2 rounded-sm text-center bg-gray-100 text-black " onClick={deleteFunction}>
          Oui
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
