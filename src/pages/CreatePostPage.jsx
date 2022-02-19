import { PaperAirplaneIcon } from "@heroicons/react/solid";
import "draft-js/dist/Draft.css";
import React, { useState } from "react";
import { Image, TypeBold, TypeItalic, TypeUnderline, XLg, Youtube } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { createPost } from "../store/actions/posts.action";
import { createDate } from "../utils/formatTime";
import history from "../utils/history";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const emptyTitleError = "Votre titre est vide!\n Mettez un mot ou deux...";
  const serverError = useSelector((state) => state.posts.error);
  const userId = useSelector((state) => state.user.id);
  const isAuthenticated = useSelector((state) => state.user.loginSuccess);
  const dispatch = useDispatch();

  const handleTitleInput = (e) => {
    setTitle(e.currentTarget.value);
    setEmptyTitle(false);
  };

  const handlePostInput = (e) => {
    setPostText(e.currentTarget.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      setEmptyTitle(true);
      return;
    }
    if (serverError.length !== 0) {
      setServerErrorMsg(serverError);
      return;
    }
    setServerErrorMsg("");
    dispatch(createPost(userId, title, postText, createDate()));
    history.push({
      pathname: "/feed",
    });
  };

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <div
          className="w-screen bg-gray-200 flex flex-col items-center justify-center gap-2 pt-2"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div
            className="error h-12 w-10/12 md:w-1/2 xl:w-1/3 whitespace-pre bg-black text-white text-sm text-center py-1 rounded"
            style={{ visibility: emptyTitle ? "visible" : "hidden" }}
          >
            {emptyTitle && emptyTitleError}
            {serverError.length !== 0 && serverErrorMsg}
          </div>
          <form
            className="h-3/4 w-10/12 md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center"
            method="post"
            onSubmit={handlePostSubmit}
          >
            <input
              className="h-10 w-full px-2 rounded outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white border border-gray-400 hover:border-gray-500 transition-all duration-200"
              type="text"
              name="createPost"
              id="createPost"
              placeholder="Titre de votre post"
              onChange={handleTitleInput}
            />
            <div className="form-container h-full w-full flex flex-col items-center justify-start pt-4">
              <div className="h-max w-full border border-gray-400 hover:border-gray-500 transition-border-color duration-300 rounded">
                <div className="h-12 w-full flex items-center justify-between rounded-t bg-gray-200 border-b border-gray-300">
                  <div className="w-2/3 h-full flex items-center justify-start">
                    <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                      <TypeBold />
                    </button>
                    <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                      <TypeItalic />
                    </button>
                    <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                      <TypeUnderline />
                    </button>
                    <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                      <Image />
                    </button>
                    <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                      <Youtube />
                    </button>
                  </div>
                  <div className="w-1/3 h-full whitespace-wrap text-xs text-gray-500 underline flex items-center justify-end text-right pr-4">
                    Enregistrer le brouillon
                  </div>
                </div>
                <div className="container max-w-full h-56 bg-gray-100 hover:bg-white active:bg-white focus:bg-white rounded-bl rounded-br overflow-y-auto">
                  <textarea
                    type="text"
                    name="post"
                    id="post"
                    value={postText}
                    onChange={handlePostInput}
                    className="w-full h-full focus:ring-red-300 flex items-start justify-start p-2"
                  />
                </div>
              </div>
              <button
                className="w-48 flex items-center justify-center gap-1 text-white p-2 rounded disabled:opacity-50 mt-4 shadow-xl"
                style={{ backgroundColor: "#ef5350" }}
                disabled={false}
                type="submit"
              >
                <PaperAirplaneIcon className="h-5 w-5 text-white transform rotate-45 -translate-y-0.5" />
                <span className="text-md">publier!</span>
              </button>{" "}
            </div>
          </form>
          <div className="h-1/4 flex flex-col items-center justify-center rounded-full">
            <Link
              to={"/feed"}
              className="h-12 w-12 flex items-center justify-center text-white p-2 rounded-full shadow-xl"
              style={{ backgroundColor: "#ef5350" }}
              disabled={false}
            >
              <XLg />{" "}
            </Link>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
