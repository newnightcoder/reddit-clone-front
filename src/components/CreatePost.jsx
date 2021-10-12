import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import {
  Image,
  TypeBold,
  TypeItalic,
  TypeUnderline,
  XLg,
  Youtube,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/logo.svg";
import { createPost } from "../store/actions/posts.action";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const emptyTitleError = "Votre titre est vide!\n Mettez un mot ou deux...";
  const serverError = useSelector((state) => state.posts.error);
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {}, [serverError]);

  const time = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
  };
  const date = `${time.year}-${time.month}-${time.day}-${time.hour}-${time.minute}-${time.second}`;

  const handleTitleInput = (e) => {
    setTitle(e.currentTarget.value);
    setEmptyTitle(false);
  };

  const text = convertToRaw(editorState.getCurrentContent()).blocks[0].text;

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
    dispatch(createPost(userId, title, text, date));
    history.push({
      pathname: "/feed",
    });
  };

  return (
    <div
      className="w-screen flex flex-col items-center justify-center gap-2 pt-2"
      style={{
        height: "calc(100vh - 4rem)",
        background: `url(${logo}) no-repeat fixed center/250%`,
      }}
    >
      <div
        className="error h-12 w-10/12 md:w-1/2 lg:w-1/3 whitespace-pre bg-black text-white text-sm text-center py-1 rounded"
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
          className="h-10 w-full px-2 rounded outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white border border-gray-500 hover:border-red-400 transition-all duration-200"
          type="text"
          name="createPost"
          id="createPost"
          placeholder="Titre de votre post"
          onChange={handleTitleInput}
        />
        <div className="h-96 w-full flex flex-col items-center justify-start pt-4">
          <div className="h-12 w-full flex items-center justify-between rounded-t bg-gray-200 border border-gray-400">
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
          <div className="container max-w-full h-96 bg-gray-100 hover:bg-white active:bg-white focus:bg-white border-l border-r border-b border-gray-500 hover:border-red-400 rounded-b overflow-y-auto p-2 mb-6">
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              placeholder="Votre texte..."
            />
          </div>
          <button
            className="w-48 flex items-center justify-center gap-1 text-white p-2 rounded disabled:opacity-50 shadow-xl"
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
  );
};

export default CreatePost;
