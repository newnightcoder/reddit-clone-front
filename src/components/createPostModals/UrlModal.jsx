import React from "react";
import { XCircle } from "react-bootstrap-icons";

const UrlModal = ({ urlModalOpen, toggleUrlInput }) => {
  return (
    <div
      style={{ opacity: urlModalOpen ? 1 : 0 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black text-white z-10 transition-opacity duration-300 overflow-y-auto"
    >
      UrlModal
      <button className="absolute top-4 right-4 text-white" onClick={toggleUrlInput}>
        <XCircle />
      </button>
    </div>
  );
};

export default UrlModal;
