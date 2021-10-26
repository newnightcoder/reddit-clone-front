import React from "react";

const DeleteModal = ({ toggleDeleteModal, handleDelete }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 rounded absolute top-0 left-0 z-50 bg-gray-900 opacity-90 text-white text-sm">
      <span>Supprimer ce post définitivement?</span>
      <div className="w-1/3 flex items-center justify-between ">
        <button
          className="w-max px-2 rounded-sm text-center bg-gray-100 text-black "
          onClick={toggleDeleteModal}
        >
          annuler
        </button>
        <button
          className="w-max px-2 rounded-sm text-center bg-gray-100 text-black "
          onClick={handleDelete}
        >
          oui
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
