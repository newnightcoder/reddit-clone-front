import React, { useCallback, useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { PostForm } from ".";
import { clearErrorPost, editPost, toggleEditModal } from "../store/actions/posts.action";
import { breakpoint } from "../utils/breakpoints";
import { useError, useWindowSize } from "../utils/hooks";

const EditCommentModal = () => {
  const { comments, replies, editId, editModalOpen } = useSelector((state) => state.posts);
  const [editText, setEditText] = useState("test");
  const dispatch = useDispatch();
  const error = useError();
  const { width } = useWindowSize();

  const setText = useCallback(() => {
    let text = "";
    switch (editId.type) {
      case "comment":
        const comment = comments.filter((comment) => comment.commentId === editId.id);
        text = comment[0].text;
        setEditText(text);
        break;
      case "reply":
        const reply = replies.filter((reply) => reply.replyId === editId.id);
        text = reply[0].text;
        setEditText(text);
        break;
      default:
        return setEditText(text);
    }
  }, [editId.id, editId.type, comments, replies]);

  useEffect(() => {
    setText();
  }, [editId.id, editId.type, setText]);

  const handleEditText = useCallback(
    (e) => {
      if (error) dispatch(clearErrorPost());
      setEditText(e.currentTarget.textContent);
    },
    [dispatch]
  );

  const handleEditCommentSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (error) return;

      switch (editId.type) {
        case "comment":
          dispatch(editPost("comment", editId.id, null, editText));

          break;
        case "reply":
          dispatch(editPost("reply", editId.id, null, editText));

          break;
        default:
          return;
      }

      console.log(editText);
      dispatch(toggleEditModal());
    },
    [dispatch, editId.id, editId.type, editText]
  );

  return (
    <Div100vh
      className={`fixed inset-0 bg-black/60 flex items-start justify-center pt-28 transition duration-300 ${
        editModalOpen ? "opacity-100 z-[1000]" : "opacity-0 z-[-1]"
      }`}
    >
      <div className={`${width > breakpoint.md ? "max-w-[600px]" : ""} w-full`}>
        <PostForm editText={editText} handleEditText={handleEditText} handleEditCommentSubmit={handleEditCommentSubmit} />
      </div>
    </Div100vh>
  );
};

export default EditCommentModal;
