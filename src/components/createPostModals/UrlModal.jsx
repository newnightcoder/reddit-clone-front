import React, { useState } from "react";
import { XCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { saveLinkUrl } from "../../store/actions/posts.action";

const UrlModal = ({ urlModalOpen, toggleUrlInput }) => {
  const [link, setLink] = useState("");
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setLink(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveLinkUrl(link));
    toggleUrlInput(e);
  };

  return (
    <div
      style={{ opacity: urlModalOpen ? 1 : 0, zIndex: urlModalOpen ? 10 : -1 }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center space-y-2 bg-black text-white transition-opacity duration-300 overflow-y-auto"
    >
      <span className="text-sm uppercase w-10/12 text-center">ajouter un lien vers un article ou une page web</span>

      <form action="" onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-4">
        <input type="text" name="gif-link" id="gif-link" className="text-black" onChange={(e) => handleInput(e)} />
        <button className="bg-black text-white transition-color duration-300 hover:bg-white hover:text-black border border-white px-2 rounded">
          valider
        </button>
      </form>
      <button className="absolute top-4 right-4 text-white" onClick={toggleUrlInput}>
        <XCircle />
      </button>
    </div>
  );
};

export default UrlModal;
