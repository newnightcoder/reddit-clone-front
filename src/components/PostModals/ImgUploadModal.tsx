import { XCircle } from "react-bootstrap-icons";
import { useLanguage } from "../../utils/hooks";
import ImgUploader from "../ImgUploader/ImgUploader";
import { ImgUploaderProps } from "../react-app-env";

const ImgUploadModal = (props: ImgUploaderProps) => {
  const userLanguage = useLanguage();

  return (
    <div
      style={{ opacity: props.imgUploadModalOpen ? 1 : 0, zIndex: props.imgUploadModalOpen ? 1001 : -1 }}
      //  md:w-[570px] md:h-[420px]
      className="md:rounded-md fixed md:absolute w-full h-full md:w-[95%] md:h-[95%] inset-0 m-auto flex flex-col items-center justify-center space-y-4 bg-black text-white transition-opacity duration-300"
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
