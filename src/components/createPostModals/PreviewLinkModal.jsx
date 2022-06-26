import { useCallback, useState } from "react";
import { XCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { getPreviewData, setPreviewLoader } from "../../store/actions/posts.action";
import { useLanguage } from "../../utils/hooks";

const PreviewLinkModal = ({ linkModalOpen, toggleLinkModal }) => {
  const [targetUrl, setTargetUrl] = useState("");
  const dispatch = useDispatch();
  const userLanguage = useLanguage();

  const handleTargetUrl = useCallback((e) => {
    e.preventDefault();
    dispatch(getPreviewData(targetUrl));
    dispatch(setPreviewLoader(true));
    toggleLinkModal(e);
    setTargetUrl("");
  });

  return (
    <div
      style={{ opacity: linkModalOpen ? 1 : 0, zIndex: linkModalOpen ? 1500 : -1 }}
      className="fixed w-full md:w-2/3 inset-0 m-auto h-full flex flex-col items-center justify-center space-y-4 bg-black text-white transition-opacity duration-300 overflow-y-auto"
    >
      <span className="inline-block md:text-sm w-2/3">{userLanguage.previewLinkModal.label}</span>
      <form
        action=""
        method="post"
        className="w-11/12 flex flex-col items-center justify-center space-y-4"
        onSubmit={handleTargetUrl}
      >
        <input
          type="text"
          className="w-full p-2 text-black outline-none focus:outline-none rounded"
          placeholder={userLanguage.previewLinkModal.placeholder}
          onChange={(e) => setTargetUrl(e.target.value)}
          value={targetUrl}
        />
        <button type="submit" className="rounded-full border border-gray-100 px-5 text-sm py-1 submit uppercase">
          {userLanguage.previewLinkModal.ok}
        </button>
      </form>
      <button className="absolute top-0 right-4 text-white" onClick={toggleLinkModal}>
        <XCircle size={25} />
      </button>
    </div>
  );
};

export default PreviewLinkModal;
