import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorUser, editUsername, resetUsernameEdited } from "../store/actions/user.action";
import { useError, useLanguage } from "../utils/hooks";

const EditUsernameModal = ({ toggleEditModal, openEditModal }) => {
  const { id: userId, username, usernameEdited } = useSelector((state) => state.user);
  const [newUsername, setNewUsername] = useState("");
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const error = useError();

  useEffect(() => {
    if (usernameEdited) {
      toggleEditModal();
      dispatch(resetUsernameEdited());
    }
  }, [usernameEdited, dispatch]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (newUsername === "" || newUsername === username) return;
      dispatch(editUsername(userId, newUsername));
    },
    [dispatch, userId, newUsername]
  );

  const handleChange = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorUser());
      }
      setNewUsername(e.currentTarget.value);
    },
    [dispatch, setNewUsername, error]
  );

  return (
    <div
      className="w-full h-full flex items-center justify-center absolute top-0 inset-0 items-center justify-center rounded-tl rounded-tr bg-gray-800 text-gray-100 text-sm"
      style={{ zIndex: 100 }}
    >
      <form className="w-10/12 md:w-1/2 flex flex-col items-center justify-center space-y-2" onSubmit={handleSubmit}>
        <label htmlFor="username" className="for">
          {userLanguage.editModal.newUsername}:
        </label>
        {error && (
          <span className="whitespace-pre w-full md:w-max h-max py-2 px-3 text-sm md:text-sm text-white transition duration-500 bg-black dark:bg-white dark:text-black text-center rounded">
            {error}
          </span>
        )}
        <input
          type="text"
          id="username"
          onChange={handleChange}
          className="w-10/12 p-2 rounded focus:outline-none text-gray-900"
        />
        <div className="w-10/12 flex items-center justify-center space-x-4">
          <button
            className="w-full md:w-max py-2 px-3 flex items-center justify-center text-white text-xs rounded-full shadow-xl cursor-pointer bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none uppercase"
            onClick={() => {
              toggleEditModal();
              dispatch(clearErrorUser());
            }}
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

export default EditUsernameModal;
