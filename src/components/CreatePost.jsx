import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useState } from "react";
import {
  Image,
  TypeBold,
  TypeItalic,
  TypeUnderline,
  XLg,
  Youtube,
} from "react-bootstrap-icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { API_POST } from "./API";

const CreatePost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [title, setTitle] = useState("");
  const location = useLocation();
  const history = useHistory();
  const userId = location?.state?.userId || history?.state?.userId;
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();
  const minute = new Date().getMinutes();
  const second = new Date().getSeconds();
  const date = `${year},${month},${day},${minute},${second}`;

  console.log("id user depuis feed", userId);

  const handleTitleInput = (e) => {
    setTitle(e.currentTarget.value);
  };

  const text = convertToRaw(editorState.getCurrentContent()).blocks[0].text;

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title, text, userId, date }),
    };

    try {
      const response = await fetch(API_POST, request);
      const data = await response.json();
      if (response.status !== 201) {
        console.log("problem while posting...");
        return;
      }
      console.log(data.message);
      history.push({
        pathname: "/feed",
        state: { userId },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-screen flex flex-col items-center justify-evenly"
      style={{
        height: "calc(100vh - 4rem)",
        background: `url(${logo}) no-repeat fixed center/250%`,
      }}
    >
      <form
        className="w-10/12 h-3/4 flex flex-col items-center justify-center"
        method="post"
        onSubmit={handlePostSubmit}
      >
        <input
          className="h-14 w-full px-2 rounded outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white border border-gray-500 hover:border-red-400 transition-all duration-200"
          type="text"
          name="createPost"
          id="createPost"
          placeholder="Titre de votre post"
          onChange={handleTitleInput}
        />
        <div className="h-full w-full flex flex-col items-center justify-start pt-4">
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
              placeholder="Votre texte"
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
      <div className="flex flex-col items-center justify-center border">
        <Link
          to="/feed"
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
