import React from "react";
import { XCircle } from "react-bootstrap-icons";
import { useLanguage } from "../../utils/hooks";
import ImgUploader from "../ImgUploader";
import { ImgUploaderProps } from "../react-app-env";

const ImgUploadModal = (props: ImgUploaderProps) => {
  const userLanguage = useLanguage();

  return (
    <div
      style={{ opacity: props.imgUploadModalOpen ? 1 : 0, zIndex: props.imgUploadModalOpen ? 1500 : -1 }}
      className="fixed w-full md:w-2/3 inset-0 m-auto h-full flex flex-col items-center justify-center space-y-4 bg-black text-white transition-opacity duration-300 overflow-y-auto"
    >
      <span className="md:text-sm">{userLanguage.imgUploadModal.label}</span>
      <ImgUploader {...props} imgType={"post"} />
      <button className="absolute top-0 right-4 text-white" onClick={props.toggleImgUploadModal}>
        <XCircle size={25} />
      </button>
    </div>
  );
};

export default ImgUploadModal;
