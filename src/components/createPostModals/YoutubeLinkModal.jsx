import React from "react";
import { XCircle } from "react-bootstrap-icons";

const YoutubeLinkModal = ({ youtubeModalOpen, toggleYoutubeInput }) => {
  return (
    <div
      style={{ opacity: youtubeModalOpen ? 1 : 0 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black text-white z-10 transition-opacity duration-300 overflow-y-auto"
    >
      YoutubeLinkModal
      <button className="absolute top-4 right-4 text-white" onClick={toggleYoutubeInput}>
        <XCircle />
      </button>
    </div>
  );
};

export default YoutubeLinkModal;
