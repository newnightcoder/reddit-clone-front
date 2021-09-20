import React, { useState } from "react";
import { API } from "./index";
import StepImage from "./StepImage";

const StepUsername = ({ userId }) => {
  const [userName, setUserName] = useState("");
  const [isLong, setIsLong] = useState(false);
  const [errorServer, setErrorServer] = useState("");
  const [errorDuplicate, setErrorDuplicate] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const handleInput = (e) => {
    setUserName(e.currentTarget.value);
    const name = e.currentTarget.value.split("");
    if (name.length >= 2) {
      setIsLong(true);
    } else setIsLong(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userName, userId }),
    };
    try {
      const response = await fetch(`${API}/signup/username`, request);
      const data = await response.json();
      console.log("error number", data.errorNumber);
      if (data.errorNumber === 1062) {
        setErrorDuplicate(data.errorMsg);
        return;
      }
      if (!data.errorNumber && response.status !== 200) {
        setErrorServer(data.errorMsg);
        return;
      }
      setIsCreated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const toNextStep = isCreated
    ? { transform: "translateX(0%)" }
    : { transform: "translateX(100%)" };

  const error = errorServer !== "" || errorDuplicate !== "";

  return (
    <div
      style={toNextStep}
      className="h-screen w-screen bg-red-300 flex flex-col items-center justify-center transition-transform duration-500 absolute top-0 left-0"
    >
      <p>choisissez votre pseudo</p>
      <span
        className="block w-max h-max py-2 px-3 border border-red-400 rounded"
        style={
          error
            ? { visibility: "visible", whiteSpace: "pre", textAlign: "center" }
            : { visibility: "hidden" }
        }
      >
        {errorServer || errorDuplicate}
      </span>
      <form
        className="flex flex-col items-center justify-center"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username"></label>
        <input type="text" id="username" onChange={handleInput} />
        <button
          className="bg-red-500 text-white px-4 transform translate-y-2 disabled:opacity-50"
          disabled={!isLong ? true : false}
        >
          valider
        </button>
      </form>
      <StepImage userId={userId} />
    </div>
  );
};

export default StepUsername;
