import React, { useCallback, useState } from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { PostForm } from ".";
import { clearErrorPost, editPost, toggleEditModal } from "../store/actions/posts.action";
import { breakpoint } from "../utils/breakpoints";
import { useError, useWindowSize } from "../utils/hooks";

const EditCommentModal = () => {
  const { comments, replies, editId, editModalOpen } = useSelector((state) => state.posts);
  const commentToEdit = editId.type === "comment" && comments.filter((comment) => comment.commentId === editId.id);
  const replyToEdit = editId.type === "reply" && replies.filter((reply) => reply.replyId === editId.id);
  const [postText, setPostText] = useState((commentToEdit && commentToEdit[0].text) || (replyToEdit && replyToEdit[0].text));
  const dispatch = useDispatch();
  const error = useError();
  const { width } = useWindowSize();

  const handleEditText = useCallback((e) => {
    if (error) dispatch(clearErrorPost());
    setPostText(e.currentTarget.textContent);
  }, []);

  const handleEditCommentSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (error) return;
      if (commentToEdit) {
        dispatch(editPost("comment", editId.id, null, postText));
      }
      if (replyToEdit) {
        dispatch(editPost("reply", editId.id, null, postText));
      }
      console.log(postText);
      dispatch(toggleEditModal());
    },
    [dispatch, commentToEdit, replyToEdit, editId, postText]
  );

  return (
    <Div100vh
      className={`fixed inset-0 bg-black/60 flex items-start justify-center pt-28 transition duration-300 ${
        editModalOpen ? "opacity-100 z-[1000]" : "opacity-0 z-[-1]"
      }`}
    >
      <div className={`${width > breakpoint.md ? "max-w-[600px]" : ""} w-full`}>
        <PostForm
          postText={postText}
          commentToEdit={commentToEdit}
          replyToEdit={replyToEdit}
          handleEditText={handleEditText}
          handleEditCommentSubmit={handleEditCommentSubmit}
        />
      </div>
    </Div100vh>
  );
};

export default EditCommentModal;
