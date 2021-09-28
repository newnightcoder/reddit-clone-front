import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/logo2.svg";
import { API_AUTH } from "./API";

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
      const response = await fetch(`${API_AUTH}/login`, request);
      const data = await response.json();
      if (response.status !== 200) {
        setError(data.errorMsg);
        return;
      }
      console.log(data.message);
      console.log(data.user.id);
      history.push({
        pathname: "/feed",
        state: {
          userId: data.user.id,
          userName: data.user.username,
          userPic: data.user.picUrl,
          userDate: data.user.creationDate,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-deep-orange-300"
      style={{ background: `url(${logo}) no-repeat center/250%` }}
    >
      <h2 className="text-center uppercase flex flex-col md:flex-row md:gap-1">
        <span>Content de vous revoir </span>
        <span>sur Groupomania!</span>
      </h2>
      <div
        className="w-full flex items-center justify-center"
        style={{ height: "15vh" }}
      >
        <span
          className="w-max h-max whitespace-pre py-2 px-3 text-center border border-red-700 rounded"
          style={
            error === "" ? { visibility: "hidden" } : { visibility: "visible" }
          }
        >
          {error !== "" && error}
        </span>
      </div>
      <form
        method="post"
        className="h-max flex flex-col items-center justify-center gap-4"
        onSubmit={handleUserSubmit}
      >
        <div className="flex flex-col items-start">
          <label htmlFor="email">Email</label>
          <input
            className="w-64 rounded p-1 border border-red-300 outline-none"
            type="email"
            id="email"
            onChange={handleEmail}
          ></input>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="password">Mot de passe</label>
          <input
            className="w-64 rounded p-1 border border-red-300 outline-none"
            type="password"
            id="password"
            onChange={handlePass}
          ></input>
        </div>
        <button
          className="w-48 text-white p-2 rounded transform translate-y-2 disabled:opacity-50 shadow-xl"
          style={{ backgroundColor: "#ef5350" }}
          disabled={!isEmail || userPass.length < 8 ? true : false}
        >
          valider
        </button>
      </form>
      <div className="w-4/5 md:w-96 text-center border-t border-black transform translate-y-12 md:translate-y-16 py-2 flex flex-col items-center justify-center gap-1 md:flex-row md:gap-2">
        Première fois sur Groupomania?{" "}
        <Link
          to="/signup"
          className="font-bold underline uppercase text-red-600"
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default Login;
