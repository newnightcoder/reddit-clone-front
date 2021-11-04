import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo2.svg";
import { saveUserName } from "../store/actions/user.action";
import StepImage from "./StepImage";

const StepUsername = () => {
  const [userName, setUserName] = useState("");
  const [isLong, setIsLong] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const error = useSelector((state) => state.user.error);
  const usernameAdded = useSelector((state) => state.user.usernameAdded);

  const handleInput = (e) => {
    setUserName(e.currentTarget.value);
    const name = e.currentTarget.value.split("");
    if (name.length >= 2) {
      setIsLong(true);
    } else setIsLong(false);
  };

  const time = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
  };
  const date = `${time.year}-${time.month}-${time.day}-${time.hour}-${time.minute}-${time.second}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveUserName(userId, userName, date));
    if (!usernameAdded) return;
  };

  const toNextStep = usernameAdded
    ? {
        transform: "translateX(0%)",
        background: `url(${logo}) no-repeat center/250%`,
      }
    : {
        transform: "translateX(100%)",
        background: `url(${logo}) no-repeat center/250%`,
      };

  return (
    <div
      className="h-screen w-screen bg-red-300 flex flex-col items-center justify-center gap-2 transition-transform duration-500 absolute top-0 left-0"
      style={toNextStep}
    >
      <span
        className="whitespace-wrap w-10/12 md:w-1/2 lg:w-1/3 md:text-center h-max py-2 px-3 bg-black text-white border border-red-700 rounded"
        style={error.length !== 0 ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        {error}
      </span>
      <div>
        <p>choisissez votre pseudo:</p>
        <form className="flex flex-col items-center justify-center gap-1" method="post" onSubmit={handleSubmit}>
          <label htmlFor="username"></label>
          <input
            className="w-48 rounded p-1 border border-red-300 outline-none"
            type="text"
            id="username"
            onChange={handleInput}
          />
          <button
            className="w-48 p-2 rounded transform translate-y-2 disabled:opacity-50 shadow-xl"
            style={{ backgroundColor: "#ef5350" }}
            disabled={!isLong ? true : false}
          >
            valider
          </button>
        </form>
      </div>
      <StepImage />
    </div>
  );
};

export default StepUsername;
