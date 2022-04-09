import React, { useCallback, useState } from "react";
import { XCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { getPreviewData } from "../../store/actions/posts.action";

const PreviewLinkModal = ({ linkModalOpen, toggleLinkModal }) => {
  const [targetUrl, setTargetUrl] = useState("");
  const dispatch = useDispatch();

  const handleTargetUrl = useCallback((e) => {
    e.preventDefault();
    console.log(targetUrl);
    dispatch(getPreviewData(targetUrl));
    toggleLinkModal(e);
  });

  return (
    <div
      style={{ opacity: linkModalOpen ? 1 : 0, zIndex: linkModalOpen ? 1500 : -1 }}
      className="fixed w-full md:w-2/3 inset-0 m-auto h-full flex flex-col items-center justify-center space-y-4 bg-black text-white transition-opacity duration-300 overflow-y-auto"
    >
      <span className="inline-block text-sm w-2/3">
        {
          "Ajouter un lien vers un article: stackoverflow, huffingtonpost, le figaro, le monde, un blog, ou tout ce que vous voulez..."
        }
      </span>
      <form
        action=""
        method="post"
        className="w-11/12 flex flex-col items-center justify-center space-y-4"
        onSubmit={handleTargetUrl}
      >
        <input
          type="text"
          className="w-full p-2 text-black outline-none focus:outline-none rounded"
          placeholder="Coller le lien"
          onChange={(e) => setTargetUrl(e.target.value)}
        />
        <button type="submit" className="rounded-full border border-gray-100 px-5 text-sm py-1 submit uppercase">
          valider
        </button>
      </form>
      <button className="absolute top-4 right-4 text-white" onClick={toggleLinkModal}>
        <XCircle />
      </button>
    </div>
  );
};

export default PreviewLinkModal;