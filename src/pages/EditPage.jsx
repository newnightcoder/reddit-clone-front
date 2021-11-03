import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { ContentState, convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useState } from "react";
import { Image, TypeBold, TypeItalic, TypeUnderline, XLg, Youtube } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { editPost } from "../store/actions/posts.action";
import history from "../utils/history";

const EditPage = () => {
  const serverError = useSelector((state) => state.posts.error);
  const userId = useSelector((state) => state.user.id);
  const posts = useSelector((state) => state.posts.posts);
  const comments = useSelector((state) => state.posts.comments);
  const replies = useSelector((state) => state.posts.replies);
  const location = useLocation();
  const postId = location.state.postId;
  const commentId = location.state.commentId;
  const replyId = location.state.replyId;
  const [postToEdit] = posts.filter((post) => post.postId === postId);
  const [commentToEdit] = comments.filter((comment) => comment.commentId === commentId);
  const [replyToEdit] = replies.filter((reply) => reply.replyId === replyId);
  const [title, setTitle] = useState(postToEdit && postToEdit.title);
  const [editorState, setEditorState] = useState(
    postToEdit && !postToEdit.text
      ? () => EditorState.createEmpty()
      : () =>
          EditorState.createWithContent(
            ContentState.createFromText(
              (postToEdit && postToEdit.text) || (commentToEdit && commentToEdit.text) || (replyToEdit && replyToEdit.text)
            )
          )
  );

  const text = convertToRaw(editorState.getCurrentContent()).blocks[0].text || undefined;
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const emptyTitleError = "Votre titre est vide!\n Mettez un mot ou deux...";
  const dispatch = useDispatch();

  console.log("post to edit", postId, "comment to edit", commentId, "reply to edit", replyId);
  console.log(postToEdit, commentToEdit, replyToEdit);
  console.log(location);

  const handleTitleInput = (e) => {
    setTitle(e.currentTarget.value);
    setEmptyTitle(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (title && title.length === 0) {
      setEmptyTitle(true);
      return;
    }
    if (serverError.length !== 0) {
      setServerErrorMsg(serverError);
      return;
    }
    setServerErrorMsg("");

    if (postToEdit !== undefined) dispatch(editPost("post", postId, title, text));
    if (commentToEdit !== undefined) dispatch(editPost("comment", commentId, title, text));
    if (replyToEdit !== undefined) dispatch(editPost("reply", replyId, title, text));
    console.log(text);
    history.push({
      pathname: "/feed",
    });
  };

  return (
    <div
      className="w-screen bg-gray-200 flex flex-col items-center justify-center gap-2 pt-2"
      style={{
        height: "calc(100vh - 4rem)",
        // background: `url(${logo}) no-repeat fixed center/250%`,
      }}
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
        onSubmit={handleEdit}
      >
        {postToEdit && (
          <input
            className="h-10 w-full px-2 rounded outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white border border-gray-400 hover:border-gray-500 transition-all duration-200"
            type="text"
            name="editPost"
            id="editPost"
            value={title}
            onChange={handleTitleInput}
          />
        )}
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
            <div className="container max-w-full h-56 bg-gray-100 hover:bg-white active:bg-white focus:bg-white rounded-bl rounded-br overflow-y-auto p-2">
              <Editor editorState={editorState} onChange={setEditorState} />
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
  );
};

export default EditPage;
