import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { BtnSettings, Error, LoginHeader, Settings } from "../components";
import { clearErrorPostAction } from "../store/actions/posts.action";
import { clearErrorUserAction, logUserAction } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import { useError, useLanguage, useToggleSettings } from "../utils/hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const { settingsOpen, toggleSettings } = useToggleSettings();
  const error = useError();

  /* eslint no-control-regex: 0 */
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const isEmail = emailRegex.test(email);

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
    [email, password, dispatch]
  );
  const pushToFeed = useCallback(() => {
    setTimeout(() => {
      history.push("/feed");
    }, 1000);
  }, []);

  useEffect(() => {
    if (isAuthenticated) return pushToFeed();
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(clearErrorUserAction());
    dispatch(clearErrorPostAction());
  }, [dispatch]);

  return (
    <Div100vh className="w-full relative flex flex-col items-center justify-start pt-16 md:pt-0 pb-3 md:pb-0 transition-colors duration-500 md:bg-gray-100 md:dark:bg-gray-600 text-gray-900 dark:text-gray-200">
      <BtnSettings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
      <Error />
      <div className="page-container h-full w-full grid grid-rows-login justify-items-center md:grid-rows-none md:grid-cols-login">
        <div className="header-form-container h-full w-full flex items-center justify-center bg-gray-200 dark:bg-black">
          <div className="header-form self-center h-max w-full md:w-max justify-self-center grid grid-rows-main lg:translate-x-20">
            <LoginHeader />
            <form
              method="post"
              className="h-full max-h-[350px] flex flex-col items-center justify-center space-y-4"
              onSubmit={handleUserSubmit}
            >
              <div className="w-64 h-max  flex flex-col items-start">
                <label htmlFor="email">Email</label>
                <input
                  className="w-full rounded p-1 border border-blue-400 bg-gray-100 dark:bg-gray-500 text-gray-900 dark:text-gray-100 outline-none focus:bg-white dark:focus:bg-gray-600"
                  type="email"
                  id="email"
                  onChange={handleEmail}
                ></input>
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password">{userLanguage.login.pass}</label>
                <div className="w-64 h-max flex items-center justify-start relative">
                  <input
                    className="w-full rounded py-1 pl-1 pr-10 border border-blue-400 bg-gray-100 dark:bg-gray-500 text-gray-900 dark:text-gray-100 outline-none focus:bg-white dark:focus:bg-gray-600"
                    type={passwordType}
                    id="password"
                    onChange={handlePass}
                  ></input>
                  <button type="button" className="h-max w-8 absolute right-0 pr-1 outline-none">
                    {passwordType === "password" ? (
                      <EyeOffIcon className="h-5" onClick={() => setPasswordType("text")} />
                    ) : (
                      <EyeIcon className="h-5" onClick={() => setPasswordType("password")} />
                    )}
                  </button>
                </div>
              </div>
              <button
                className="w-[15.5rem] text-white bg-blue-400 p-2 rounded-full transform translate-y-2 md:translate-y-8 disabled:opacity-50 shadow-xl transition-all duration-300 hover:bg-blue-500 hover:shadow-none uppercase"
                disabled={!isEmail || password.length < 8 ? true : false}
              >
                {!isLoading || error ? <span>{userLanguage.login.enter}</span> : <SyncLoader size={8} color={"#ffffff"} />}
              </button>
            </form>
          </div>
        </div>
        <div className="bottom-section relative h-min w-4/5 md:h-full md:w-full md:bg-login bg-no-repeat bg-center bg-cover flex items-center md:items-start justify-center border-t md:border-none border-black dark:border-white py-2 md:py-0">
          <div className="h-full w-full md:h-[max-content] md:absolute md:top-[39%] flex flex-col items-center justify-center space-x-2 md:px-16">
            <span className="whitespace-nowrap text-gray-900 dark:text-white md:text-white transition-colors duration-500 hover:text-blue-500">
              {userLanguage.login.first}?
            </span>
            <Link
              to="/signup"
              className="font-bold underline uppercase text-blue-500 transition duration-300 hover:text-blue-600"
            >
              {userLanguage.login.registerBtn}
            </Link>
          </div>
        </div>
      </div>
      <Settings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
    </Div100vh>
  );
};

export default Login;
