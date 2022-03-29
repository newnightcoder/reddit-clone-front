import { PaperAirplaneIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Image, Link45deg, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { clearTempPostImg } from "../store/actions/posts.action";

const PostForm = ({
  title,
  handlePostSubmit,
  handleTitleInput,
  toggleImgInput,
  toggleUrlInput,
  toggleYoutubeInput,
  handlePostInput,
  postToEdit,
  postTitle,
  postText,
  postImgUrl,
  handleEditSubmit,
  handleEditTitleInput,
  handleEditText,
}) => {
  const currentPostImgUrl = useSelector((state) => state.posts.currentPost.imgUrl);
  const [imgUrl, setImgUrl] = useState(currentPostImgUrl);
  const { pathname } = useLocation();
  const imgDom = currentPostImgUrl ? <img id="postImg" src={currentPostImgUrl} alt="" className="w-full" /> : null;

  const imgToEdit = useSelector((state) => state?.posts.currentPost.imgUrl);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setImgUrl(currentPostImgUrl);
  //   // const imgContainer = document.querySelector("#imgContainer");
  //   // imgContainer.addEventListener("keydown", (e) => {
  //   //   if (e.keycode === "Backspace" || e.keycode === "Delete") {
  //   //     console.log("delete img");
  //   //   }
  //   // });
  // }, []);

  return (
    <form
      className="h-max w-full flex flex-col items-center justify-center bg-white border rounded py-6 px-4"
      method="post"
      onSubmit={pathname === "/edit" ? handleEditSubmit : handlePostSubmit}
    >
      <input
        className="h-10 w-full px-2 rounded outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white border border-gray-400 hover:border-gray-500 transition-all duration-200 placeholder-gray-400"
        type="text"
        name="Title"
        id="title"
        placeholder={pathname === "/create" ? "Titre de votre post" : null}
        onChange={pathname === "/edit" ? (e) => handleEditTitleInput(e) : (e) => handleTitleInput(e)}
        value={pathname === "/edit" ? postTitle : title}
      />
      <div className="form-container h-full w-full flex flex-col items-center justify-start pt-4 space-y-6">
        <div className="h-max w-full border border-gray-400 hover:border-gray-500 transition-border-color duration-300 rounded">
          <div className="h-12 w-full flex items-center justify-between rounded-t bg-black border-b border-gray-300 pl-2 pr-4">
            <div className="w-2/3 h-full flex items-center justify-start space-x-2">
              <button
                className="h-10 w-max text-gray-100 text-xs bg-transparent ouline-none flex items-center justify-start space-x-1"
                onClick={(e) => toggleImgInput(e)}
              >
                <Image size={16} className="text-gray-100" />
                <span className="hidden md:inline-block">{!currentPostImgUrl ? "Ajouter une image" : "Changer l'image"}</span>
              </button>
              <button
                className="h-8 w-max  text-gray-100 text-xs bg-transparent ouline-none flex items-center justify-start"
                onClick={(e) => toggleUrlInput(e)}
              >
                <Link45deg size={20} className="text-gray-100" /> <span className="hidden md:inline-block">Ajouter un gif</span>
              </button>
              {/* <button
                className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center"
                onClick={(e) => toggleYoutubeInput(e)}
              >
                <Youtube size={20} className="text-red-600" />
              </button> */}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                currentPostImgUrl && dispatch(clearTempPostImg());
              }}
              className="w-1/3 h-full whitespace-wrap text-xs text-gray-100 underline flex items-center justify-end text-right"
            >
              {currentPostImgUrl ? "effacer l'image" : null}
            </button>
          </div>
          <div
            style={{ minHeight: "12rem" }}
            className="container relative max-w-full bg-gray-100 hover:bg-white active:bg-white focus:bg-white rounded-bl rounded-br overflow-y-auto"
          >
            <span
              id="postInput"
              style={{ minHeight: !currentPostImgUrl ? "12rem" : "max-content" }}
              className="w-full h-full block focus:outline-none p-2"
              contentEditable="true"
              suppressContentEditableWarning={true}
              placeholder="Texte (facultatif)"
              onBlur={pathname === "/edit" ? handleEditText : handlePostInput}
            >
              {postText && postText}
            </span>
            <div id="imgContainer" className="px-2">
              {imgDom}
            </div>
          </div>
        </div>
        <div className="w-full h-max flex items-center justify-between px-8">
          <Link
            to={"/feed"}
            className="w-12 md:w-max flex items-center justify-center md:space-x-2 text-white px-4 py-3 rounded-full shadow-xl bg-gray-500 transition-all duration-300 hover:bg-black hover:shadow-none"
            disabled={false}
          >
            <span className="hidden md:inline-block text-sm uppercase">annuler</span> <XLg />
          </Link>
          <button
            className="w-48 flex items-center justify-center space-x-1 text-white p-3 rounded-full disabled:opacity-50 shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
            disabled={false}
            type="submit"
          >
            <PaperAirplaneIcon className="h-5 w-5 text-white transform rotate-45 -translate-y-0.5" />
            <span className="text-sm uppercase">publier!</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
