import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from ".";

const Steps = ({ userId }) => {
  const [userName, setUserName] = useState("");
  const [isLong, setIsLong] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

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
      history.push({
        pathname: "/feed",
        state: { new: true },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-red-300 z-10 transform translate-x-full flex flex-col items-center justify-center absolute top-0 left-0 oveflow-hidden">
      <p>choisissez votre pseudo</p>
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
      {error !== "" && error}
    </div>
  );
};

export default Steps;
