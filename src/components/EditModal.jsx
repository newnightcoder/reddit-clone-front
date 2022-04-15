import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUsername } from "../store/actions/user.action";
import { useLanguage } from "../utils/hooks";

const EditModal = ({ toggleEditModal, openEditModal }) => {
  const { id: userId, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const userLanguage = useLanguage();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(editUsername(userId, username));
      if (error.length !== 0) return;
      toggleEditModal();
    },
    [username, error]
  );

  const handleChange = useCallback(
    (e) => {
      console.log(e.currentTarget.value);
      setUsername(e.currentTarget.value);
    },
    [setUsername]
  );

  return (
    <div
      className="w-full h-full flex items-center justify-center absolute top-0 inset-0 items-center justify-center rounded-tl rounded-tr bg-gray-800 opacity-90 text-gray-100 text-sm"
      style={{ zIndex: 100 }}
    >
      <form className="w-10/12 md:w-1/2 flex flex-col items-center justify-center space-y-2" onSubmit={handleSubmit}>
        <label htmlFor="username" className="for">
          {userLanguage.editModal.newUsername}:
        </label>
        <span
          className="whitespace-wrap w-10/12 md:text-center h-max py-2 px-3 bg-black text-white border border-red-700 rounded"
          style={error.length !== 0 ? { visibility: "visible" } : { visibility: "hidden" }}
        >
          {error}
        </span>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          className="w-10/12 p-2 rounded focus:outline-none text-gray-900"
        />
        <div className="w-10/12 flex items-center justify-center space-x-4">
          <button
            className="w-full md:w-max py-2 px-3 flex items-center justify-center text-white text-xs rounded-full shadow-xl cursor-pointer bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none uppercase"
            onClick={toggleEditModal}
          >
            {userLanguage.editModal.cancel}
          </button>
          <button
            type="submit"
            className="w-full md:w-max py-2 px-3 flex items-center justify-center text-white text-xs rounded-full shadow-xl cursor-pointer bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none uppercase"
          >
            {userLanguage.editModal.ok}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
