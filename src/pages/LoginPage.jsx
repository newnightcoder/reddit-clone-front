import React, { useCallback, useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { logo } from "../assets";
// import bg from "../assets/logo2.svg";
import { clearUserError, logUserAction } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import { useLanguage } from "../utils/hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const history = useHistory();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userLanguage = useLanguage();

  /* eslint no-control-regex: 0 */
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const isEmail = emailRegex.test(email);

  useEffect(() => {
    if (error.length !== 0) {
      console.log("error dsplayed in UI");
      window.addEventListener("beforeunload", dispatch(clearUserError()));
    }
    return () => window.removeEventListener("beforeunload", dispatch(clearUserError()));
  }, []);

  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handlePass = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleUserSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsLoading(true);
      dispatch(logUserAction(email, password));
    },
    [email, password]
  );

  const toFeed = (() => {
    if (!isAuthenticated) return;
    setTimeout(() => {
      history.push({ pathname: "/feed", state: { isNewUser: false } });
    }, 1000);
  })();

  return (
    <Div100vh className="w-full flex flex-col items-center justify-center space-y-16 bg-gray-200 dark:bg-black text-gray-900 dark:text-gray-200">
      <header className="text-center uppercase flex flex-col items-center justify-center md:gap-1">
        <span className="font-bold text-lg">{userLanguage.login.greeting}</span>
        <img src={logo} style={{ height: "150", width: "80%" }} alt="logo Forum" />
      </header>
      <div
        style={!error || error.length === 0 ? { display: "none" } : { display: "flex" }}
        className="error h-max w-full  items-center justify-center py-2"
      >
        <span className="w-max h-max whitespace-wrap py-2 px-3 text-center text-white bg-black rounded">
          {error.length !== 0 && error}
        </span>
      </div>
      <form method="post" className="h-max flex flex-col items-center justify-center gap-4" onSubmit={handleUserSubmit}>
        <div className="flex flex-col items-start">
          <label htmlFor="email">Email</label>
          <input
            className="w-64 rounded p-1 border border-blue-400 bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-100 outline-none"
            type="email"
            id="email"
            onChange={handleEmail}
          ></input>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="password">{userLanguage.login.pass}</label>
          <input
            className="w-64 rounded p-1 border border-blue-400 dark:bg-gray-600 dark:text-gray-100 outline-none"
            type="password"
            id="password"
            onChange={handlePass}
          ></input>
        </div>
        <button
          className="w-48 text-white p-2 rounded transform translate-y-2 disabled:opacity-50 shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none uppercase"
          disabled={!isEmail || password.length < 8 ? true : false}
        >
          {!isLoading || error ? <span>{userLanguage.login.enter}</span> : <SyncLoader size={8} color={"#ffffff"} />}
        </button>
      </form>
      <div className="w-4/5 md:w-96 text-center border-t border-black transform translate-y-12 md:translate-y-16 py-2 flex flex-col items-center justify-center gap-1 md:flex-row md:gap-2">
        {userLanguage.login.first}?
        <Link
          to="/signup"
          className="font-bold underline uppercase text-blue-500 transition-color duration-300 hover:text-blue-600"
        >
          {userLanguage.login.registerBtn}
        </Link>
      </div>
    </Div100vh>
  );
};

export default Login;
