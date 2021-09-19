import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { API } from "./index";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  /* eslint no-control-regex: 0 */
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const isEmail = emailRegex.test(userEmail);

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
      const response = await fetch(`${API}/login`, request);
      const data = await response.json();
      if (response.status !== 200) {
        setError(data.errorMsg);
        return;
      }
      console.log(data.message);
      history.push({ pathname: "/feed" });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-red-100">
      <h2 className="text-center uppercase">
        Content de vous revoir sur Groupomania!
      </h2>
      <span
        style={
          error === "" ? { visibility: "hidden" } : { visibility: "visible" }
        }
        className="w-1/2 h-max p-2 text-left border border-red-400 whitespace-normal"
      >
        {error !== "" && error}
      </span>
      <form
        method="post"
        className="h-1/2 flex flex-col items-center justify-center gap-4"
        onSubmit={handleUserSubmit}
      >
        <div className="flex flex-col items-start">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={handleEmail}
            style={{ width: "200px" }}
          ></input>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            onChange={handlePass}
            style={{ width: "200px" }}
          ></input>
        </div>
        <button
          className="bg-red-400 px-4 transform translate-y-2 disabled:opacity-50"
          disabled={!isEmail || userPass.length < 8 ? true : false}
        >
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
