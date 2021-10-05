import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { Editor, EditorState } from "draft-js";
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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Post } from ".";
import logo from "../assets/logo.svg";

const Comment = () => {
  const posts = useSelector((state) => state.posts);
  const postId = useSelector((state) => state.user.currentComment.postId);
  const post = posts.find((post) => post.postId === postId);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-start gap-4 pt-6"
      style={{
        height: "calc(100vh - 4rem)",
        background: `url(${logo}) no-repeat fixed center/250%`,
      }}
    >
      <Post post={post} />
      <form
        className="w-11/12 h-max flex flex-col items-center justify-center"
        method="post"
        // onSubmit={handlePostSubmit}
      >
        <div className="h-72 w-full flex flex-col items-center justify-start">
          <div className="h-12 w-full flex items-center justify-between rounded-t bg-gray-200 border border-gray-300">
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
          </div>
          <div className="container max-w-full h-96 bg-gray-100 hover:bg-white active:bg-white focus:bg-white border-l border-r border-b border-gray-300 hover:border-red-400 rounded-b overflow-y-auto p-2 mb-6">
            <Editor
              editorState={editorState}
              // onChange={setEditorState}
              placeholder="Votre commentaire..."
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
      <div className="flex flex-col items-center justify-center rounded-full transform translate-y-5">
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

export default Comment;
