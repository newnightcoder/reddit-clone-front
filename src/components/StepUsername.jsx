import React, { useState } from "react";
import { API } from "./index";
import StepImage from "./StepImage";

const StepUsername = ({ userId }) => {
  const [userName, setUserName] = useState("");
  const [isLong, setIsLong] = useState(false);
  const [error, setError] = useState("");
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
      const data = response.json();
      if (response.status !== 200) {
        setError(data.errorMsg);
        return;
      }
      // alert(`pseudo ${userName} enregisré dans la DB!`);
      setIsCreated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const toNextStep = isCreated
    ? { transform: "translateX(0%)" }
    : { transform: "translateX(100%)" };

  return (
    <div
      style={toNextStep}
      className="h-screen w-screen bg-red-300 flex flex-col items-center justify-center transition-transform translation-duration-500 absolute top-0 left-0"
    >
      <p>choisissez votre pseudo</p>
      {error !== "" && error}
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
