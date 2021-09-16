import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "./index";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const handleEmail = (e) => {
    setUserEmail(e.currentTarget.value);
  };
  const handlePass = (e) => {
    setUserPass(e.currentTarget.value);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userEmail,
        userPass,
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
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-16 bg-red-100">
      <h2 className="text-center uppercase">
        Content de vous revoir sur Groupomania!
      </h2>
      <form
        className="flex flex-col items-center justify-evenly"
        onSubmit={handleUserSubmit}
      >
        <div className="flex flex-col items-start">
          <label htmlFor="input">Email</label>
          <input onChange={handleEmail} style={{ width: "200px" }}></input>
          <label htmlFor="input">Mot de passe</label>
          <input onChange={handlePass} style={{ width: "200px" }}></input>
        </div>
        <button className="bg-red-400 px-4 transform translate-y-8">
          submit
        </button>
      </form>
      <div className="border-t border-red-500 transform translate-y-2 py-2 flex gap-2">
        Première fois sur Groupomania?{" "}
        <Link
          to="/signup"
          className="font-bold underline uppercase text-red-400"
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default Login;
