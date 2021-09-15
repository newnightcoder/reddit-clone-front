import { useState } from "react";

const App = () => {
  const API = "http://localhost:3001";
  const [userInput, setUserInput] = useState("");

  const handleInput = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userInput,
      }),
    };
    try {
      const response = await fetch(API, request);
      const data = await response.json();
      console.log(response.status, data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-blue-400 text-black  text-center h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="uppercase">hello</h1>
      <form
        className="flex flex-col items-center justify-evenly"
        onSubmit={handleSubmit}
      >
        <label htmlFor="input">votre email</label>
        <input onChange={handleInput} style={{ width: "200px" }}></input>
        <label htmlFor="input">votre mdp</label>
        <input onChange={handleInput} style={{ width: "200px" }}></input>
        <button className="bg-red-400 px-4 transform translate-y-8">
          submit
        </button>
      </form>
    </div>
  );
};

export default App;
