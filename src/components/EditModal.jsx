import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUsername, getUserProfile } from "../store/actions/user.action";

const EditModal = ({ toggleEditModal, openEditModal }) => {
  const userId = useSelector((state) => state?.user.id);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUsername(userId, username));
    setTimeout(() => {
      dispatch(getUserProfile(userId));
      toggleEditModal();
    }, 250);
  };

  const handleChange = (e) => {
    setUsername(e.currentTarget.value);
  };

  return (
    <div
      className="hidden items-center justify-center w-10/12 h-2/3 bg-gray-100 rounded bg-gray-800 opacity-50"
      style={{ zIndex: 100, display: openEditModal && "flex" }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="for">
          Entrez votre nouveau pseudp
        </label>
        <input type="text" id="username" onChange={handleChange} />
        <button type="submit">valider</button>
      </form>
    </div>
  );
};

export default EditModal;
