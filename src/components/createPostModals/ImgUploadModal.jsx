import React from "react";
import { XCircle } from "react-bootstrap-icons";
import ImgUploader from "../ImgUploader";

const ImgUploadModal = ({ imgInputModalOpen, toggleImgUploadModal }) => {
  return (
    <div
      style={{ opacity: imgInputModalOpen ? 1 : 0, zIndex: imgInputModalOpen ? 10 : -1 }}
      className="absolute w-1/2 h-1/2 top-36 mx-auto flex flex-col items-center justify-center bg-black text-white transition-opacity duration-300 overflow-y-auto"
    >
      <span className="text-sm uppercase">ajouter une image</span>
      <ImgUploader toggleImgUploadModal={toggleImgUploadModal} imgType={"post"} />
      <button className="absolute top-4 right-4 text-white" onClick={toggleImgUploadModal}>
        <XCircle />
      </button>
    </div>
  );
};

export default ImgUploadModal;
