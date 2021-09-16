import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "./index";

const Signup = () => {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPass, setNewUserPass] = useState("");

  const handleNewEmail = (e) => {
    setNewUserEmail(e.currentTarget.value);
  };
  const handleNewPass = (e) => {
    setNewUserPass(e.currentTarget.value);
  };

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        newUserEmail,
        newUserPass,
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
        Rejoignez la communauté Groupomomania!
      </h2>
      <form
        className="flex flex-col items-center justify-evenly"
        onSubmit={handleNewUserSubmit}
      >
        <div className="flex flex-col items-start">
          <label htmlFor="input">Entrez votre email</label>
          <input onChange={handleNewEmail} style={{ width: "200px" }}></input>
          <label htmlFor="input">Créez un mot de passe</label>
          <input onChange={handleNewPass} style={{ width: "200px" }}></input>
        </div>
        <button className="bg-red-400 px-4 transform translate-y-8">
          submit
        </button>
      </form>
      <div className="border-t border-red-500 transform translate-y-2 py-2 flex gap-2">
        J'ai déjà un compte!{" "}
        <Link
          to="/login"
          className="font-bold underline uppercase text-red-400"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
};

export default Signup;
