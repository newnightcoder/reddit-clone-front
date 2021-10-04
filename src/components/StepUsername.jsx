import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo2.svg";
import { saveUserName } from "../store/actions/user.action";
import StepImage from "./StepImage";

const StepUsername = () => {
  const [userName, setUserName] = useState("");
  const [isLong, setIsLong] = useState(false);
  const [errorServer, setErrorServer] = useState("");
  const [errorDuplicate, setErrorDuplicate] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(saveUserName(userName, userId, date));
    setIsCreated(true);
  };

  const toNextStep = isCreated
    ? {
        transform: "translateX(0%)",
        background: `url(${logo}) no-repeat center/250%`,
      }
    : {
        transform: "translateX(100%)",
        background: `url(${logo}) no-repeat center/250%`,
      };

  const error = errorServer !== "" || errorDuplicate !== "";

  return (
    <div
      className="h-screen w-screen bg-red-300 flex flex-col items-center justify-center gap-2 transition-transform duration-500 absolute top-0 left-0"
      style={toNextStep}
    >
      <span
        className="whitespace-wrap w-screen h-max py-2 px-3 border border-red-700 rounded"
        style={error ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        {errorServer || errorDuplicate}
      </span>
      <div>
        <p>choisissez votre pseudo:</p>
        <form
          className="flex flex-col items-center justify-center gap-1"
          method="post"
          onSubmit={handleSubmit}
        >
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
