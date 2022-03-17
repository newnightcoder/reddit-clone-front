import { PaperAirplaneIcon } from "@heroicons/react/solid";
import React from "react";
import { Image, Link45deg, Youtube } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const PostForm = ({
  handlePostSubmit,
  handleTitleInput,
  toggleImgInput,
  toggleUrlInput,
  toggleYoutubeInput,
  handlePostInput,
}) => {
  const postImg = useSelector((state) => state.posts.currentPost.imgUrl);

  return (
    <form className="h-full w-full flex flex-col items-center justify-center" method="post" onSubmit={handlePostSubmit}>
      <input
        className="h-10 w-full px-2 rounded outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white border border-gray-400 hover:border-gray-500 transition-all duration-200"
        type="text"
        name="Title"
        id="title"
        placeholder="Titre de votre post"
        onChange={handleTitleInput}
      />
      <div className="form-container h-full w-full flex flex-col items-center justify-start pt-4">
        <div className="h-max w-full border border-gray-400 hover:border-gray-500 transition-border-color duration-300 rounded">
          <div className="h-12 w-full flex items-center justify-between rounded-t bg-black border-b border-gray-300 pl-2 pr-4">
            <div className="w-2/3 h-full flex items-center justify-start">
              <button
                className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center"
                onClick={(e) => toggleImgInput(e)}
              >
                <Image className="text-gray-100" />
              </button>
              <button
                className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center"
                onClick={(e) => toggleUrlInput(e)}
              >
                <Link45deg size={20} className="text-gray-100" />
              </button>
              <button
                className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center"
                onClick={(e) => toggleYoutubeInput(e)}
              >
                <Youtube size={20} className="text-red-600" />
              </button>
            </div>
            <div className="w-1/3 h-full whitespace-wrap text-xs text-gray-100 underline flex items-center justify-end text-right">
              Enregistrer <br />
              le brouillon
            </div>
          </div>
          <div className="container relative max-w-full h-56 bg-gray-100 hover:bg-white active:bg-white focus:bg-white rounded-bl rounded-br overflow-y-auto">
            <div
              contentEditable="true"
              suppressContentEditableWarning={true}
              placeholder="test"
              onBlur={handlePostInput}
              className="w-full h-full focus:ring-red-300 flex flex-col items-start justify-start p-2"
            >
              <img src={postImg} alt="" />
            </div>
          </div>
        </div>
        <button
          className="w-48 flex items-center justify-center space-x-1 text-white p-3 rounded-full disabled:opacity-50 mt-4 shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
          disabled={false}
          type="submit"
        >
          <PaperAirplaneIcon className="h-5 w-5 text-white transform rotate-45 -translate-y-0.5" />
          <span className="text-sm uppercase">publier!</span>
        </button>
      </div>
    </form>
  );
};

export default PostForm;
