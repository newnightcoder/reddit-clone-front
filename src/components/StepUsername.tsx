import React, { useCallback, useState } from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { logo } from "../assets";
import { saveUserNameAction } from "../store/actions/user.action";
import { useError, useLanguage } from "../utils/hooks";
import StepImage from "./StepImage";

const StepUsername = () => {
  const [userName, setUserName] = useState("");
  const [isLong, setIsLong] = useState(false);
  const { id: userId, usernameAdded } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const error = useError();

  const toNextStep = usernameAdded ? { transform: "translateX(0%)" } : { transform: "translateX(100%)" };

  const handleInput = useCallback(
    (e) => {
      setUserName(e.currentTarget.value);
      const name = e.currentTarget.value.split("");
      if (name.length >= 2) {
        setIsLong(true);
      } else setIsLong(false);
    },
    [setUserName, setIsLong]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("working babe");
      dispatch(saveUserNameAction(userId!, userName));
    },
    [dispatch, userId, userName]
  );

  return (
    <Div100vh
      className="w-screen bg-gray-200 flex flex-col items-center justify-center space-y-2 transition-transform duration-500 absolute top-0 left-0"
      style={toNextStep}
    >
      <header className="h-1/3 flex items-center justify-center">
        <img src={logo} alt="" />
      </header>
      {error && (
        <span className="whitespace-pre w-full md:w-max h-max py-2 px-3 text-sm md:text-sm text-white transition duration-500 bg-black dark:bg-white dark:text-black text-center rounded">
          {error}
        </span>
      )}
      <div className="h-1/2">
        <p className="font-bold">{userLanguage.signup.stepUsername.choose}</p>
        <form className="flex flex-col items-center justify-center space-y-1" method="post" onSubmit={handleSubmit}>
          <label htmlFor="username"></label>
          <input
            className="w-48 rounded p-1 border border-blue-300 transition-color duration-300 hover:border-blue-400 outline-none"
            type="text"
            id="username"
            onChange={handleInput}
          />
          <button
            className="w-48 p-2 rounded-full transform translate-y-2 disabled:opacity-50 shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
            disabled={!isLong ? true : false}
          >
            {userLanguage.signup.stepUsername.ok}
          </button>
        </form>
      </div>
      {usernameAdded && <StepImage />}
    </Div100vh>
  );
};

export default StepUsername;
