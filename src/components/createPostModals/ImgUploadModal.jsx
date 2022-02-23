import React from "react";
import { XCircle } from "react-bootstrap-icons";
import ImgUploader from "../ImgUploader";

const ImgUploadModal = ({ imgInputModalOpen, toggleImgInput }) => {
  return (
    <div
      style={{ opacity: imgInputModalOpen ? 1 : 0, zIndex: imgInputModalOpen ? 10 : -1 }}
      className="absolute w-full h-2/3 inset-0 my-auto flex flex-col items-center justify-center bg-black text-white transition-opacity duration-300 overflow-y-auto"
    >
      <span className="text-sm uppercase">ajouter une image</span>
      <ImgUploader toggleImgInput={toggleImgInput} />
      <button className="absolute top-4 right-4 text-white" onClick={toggleImgInput}>
        <XCircle />
      </button>
    </div>
  );
};

export default ImgUploadModal;
