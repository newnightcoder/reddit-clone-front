import { useDelete, useLanguage, useWindowSize } from "../../utils/hooks";
import { DeleteModalProps } from "../react-app-env";

const DeleteModal = (props: DeleteModalProps) => {
  const { toggleDeleteModal, profilePage } = props;
  const { message, deleteFunction } = useDelete(props);
  const userLanguage = useLanguage();
  const { width } = useWindowSize();

  return (
    <div
      className={`w-full h-full z-[1100] flex flex-col items-center justify-center space-y-4 md:rounded  absolute inset-0 bg-gray-900 dark:bg-black ${
        profilePage ? "opacity-100 dark:bg-gray-700" : "opacity-90"
      } text-white text-sm px-5 md:px-24`}
    >
      <span
        className={`w-full h-max ${
          props.origin == "menu" ? "text-left" : "text-center"
        } font-bold text-lg whitespace-pre-wrap overflow-hidden border border-white rounded-xl bg-black p-4`}
      >
        {message}
      </span>
      <div className="w-1/3 flex items-center justify-center space-x-4">
        <button
          className="w-max py-2 px-5 text-md rounded-full text-center bg-gray-100 bg-white hover:bg-blue-500 transition-colors duration-300 text-black uppercase"
          onClick={toggleDeleteModal}
        >
          {userLanguage.deleteModal.cancel}
        </button>
        <button
          className="w-max py-2 px-5 text-md rounded-full text-center bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white uppercase"
          onClick={deleteFunction}
        >
          {userLanguage.deleteModal.yes}
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
