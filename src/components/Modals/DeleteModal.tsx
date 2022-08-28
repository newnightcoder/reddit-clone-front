import { useDelete, useLanguage } from "../../utils/hooks";
import { DeleteModalProps } from "../react-app-env";

const DeleteModal = (props: DeleteModalProps) => {
  const { toggleDeleteModal, origin } = props;
  const { message, deleteFunction } = useDelete(props);
  const userLanguage = useLanguage();

  return (
    <div
      style={{ zIndex: 1100 }}
      className={`w-full h-full flex flex-col items-center justify-center space-y-2 md:rounded ${
        origin === "post" || origin === "comment" || origin === "reply" ? "absolute" : "fixed"
      } top-0 left-0 bg-gray-900 dark:bg-black opacity-90 text-white text-sm`}
    >
      <span className="w-full h-max text-center px-2 whitespace-pre overflow-hidden">{message}</span>
      <div className="w-1/3 flex items-center justify-center space-x-4">
        <button
          className="w-max py-1 px-4 rounded-full text-center bg-gray-100 text-black capitalize"
          onClick={toggleDeleteModal}
        >
          {userLanguage.deleteModal.cancel}
        </button>
        <button className="w-max py-1 px-4 rounded-full text-center bg-blue-500 text-white capitalize" onClick={deleteFunction}>
          {userLanguage.deleteModal.yes}
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
