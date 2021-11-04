import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/full-logo-row-black.svg";
import bg from "../assets/logo2.svg";
import { logUserAction } from "../store/actions/user.action";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.user.error);
  const loginSuccess = useSelector((state) => state.user.loginSuccess);

  /* eslint no-control-regex: 0 */
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const isEmail = emailRegex.test(email);

  const handleEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const handlePass = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    dispatch(logUserAction(email, password));
  };

  const toFeed = (() => {
    if (!loginSuccess) return;
    setTimeout(() => {
      history.push({ pathname: "/feed", state: { isNewUser: false } });
    }, 1000);
  })();

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center gap-4 bg-deep-orange-300"
      style={{
        background: `linear-gradient(rgba(70,70,70,.45), rgba(70,70,70,.45)), url(${bg}) no-repeat center/cover`,
      }}
    >
      <h2 className="text-center uppercase flex flex-col md:gap-1">
        <span className="font-bold text-lg">Content de vous revoir sur</span>
        <img src={logo} style={{ height: "150", width: "80%" }} alt="logo Groupomania" />
      </h2>
      <div className="error h-1/6 w-full flex items-center justify-center">
        <span
          className="w-max h-max whitespace-wrap py-2 px-3 text-center text-white bg-black rounded"
          style={!error || error.length === 0 ? { visibility: "hidden" } : { visibility: "visible" }}
        >
          {error.length !== 0 && error}
        </span>
      </div>
      <form method="post" className="h-max flex flex-col items-center justify-center gap-4" onSubmit={handleUserSubmit}>
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
          disabled={!isEmail || password.length < 8 ? true : false}
        >
          valider
        </button>
      </form>
      <div className="w-4/5 md:w-96 text-center border-t border-black transform translate-y-12 md:translate-y-16 py-2 flex flex-col items-center justify-center gap-1 md:flex-row md:gap-2">
        Première fois sur Groupomania?{" "}
        <Link to="/signup" className="font-bold underline uppercase text-red-600">
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default Login;
