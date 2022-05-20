import React from "react";
import { XCircle } from "react-bootstrap-icons";
import { useLanguage } from "../../utils/hooks";
import ImgUploader from "../ImgUploader";

const ImgUploadModal = ({ imgInputModalOpen, toggleImgUploadModal, deletePreview }) => {
  const userLanguage = useLanguage();

  return (
    <div
      style={{ opacity: imgInputModalOpen ? 1 : 0, zIndex: imgInputModalOpen ? 1500 : -1 }}
      className="fixed w-full md:w-2/3 inset-0 m-auto h-full flex flex-col items-center justify-center space-y-4 bg-black text-white transition-opacity duration-300 overflow-y-auto"
    >
      <span className="md:text-sm">{userLanguage.imgUploadModal.label}</span>
      <ImgUploader toggleImgUploadModal={toggleImgUploadModal} deletePreview={deletePreview} imgType={"post"} />
      <button className="absolute top-0 right-4 text-white" onClick={toggleImgUploadModal}>
        <XCircle size={25} />
      </button>
    </div>
  );
};

export default ImgUploadModal;
