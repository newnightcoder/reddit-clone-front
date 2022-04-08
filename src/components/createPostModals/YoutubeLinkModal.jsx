import React, { useCallback, useState } from "react";
import { XCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { getLinkData } from "../../store/actions/posts.action";

const YoutubeLinkModal = ({ linkModalOpen, toggleYoutubeInput }) => {
  const [targetUrl, setTargetUrl] = useState("");
  const dispatch = useDispatch();

  const handleTargetUrl = useCallback((e) => {
    e.preventDefault();
    console.log(targetUrl);
    dispatch(getLinkData(targetUrl));
    toggleYoutubeInput(e);
  });

  return (
    <div
      style={{ opacity: linkModalOpen ? 1 : 0, zIndex: linkModalOpen ? 500 : -1 }}
      className="absolute w-1/2 h-1/2 top-36 mx-auto flex flex-col items-center justify-center bg-black text-white transition-opacity duration-300 overflow-y-auto"
    >
      <span className="text-sm uppercase">ajouter un lien vers une video youtube</span>
      <form action="" method="post" className="flex flex-col items-center justify-center " onSubmit={handleTargetUrl}>
        <input
          type="text"
          className="py-2 text-black"
          placeholder="coller le lien"
          onChange={(e) => setTargetUrl(e.target.value)}
        />
        <button type="submit">valider</button>
      </form>
      <button className="absolute top-4 right-4 text-white" onClick={toggleYoutubeInput}>
        <XCircle />
      </button>
    </div>
  );
};

export default YoutubeLinkModal;
