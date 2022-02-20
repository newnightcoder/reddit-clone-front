import React from "react";
import { XCircle } from "react-bootstrap-icons";

const UrlModal = ({ urlModalOpen, toggleUrlInput }) => {
  return (
    <div
      style={{ opacity: urlModalOpen ? 1 : 0, zIndex: urlModalOpen ? 10 : -1 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black text-white transition-opacity duration-300 overflow-y-auto"
    >
      <span className="text-sm uppercase">ajouter un lien vers un article ou une page web</span>
      <button className="absolute top-4 right-4 text-white" onClick={toggleUrlInput}>
        <XCircle />
      </button>
    </div>
  );
};

export default UrlModal;
