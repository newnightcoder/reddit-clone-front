import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "@heroicons/react/solid";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../../utils/hooks";
import { SignupProps } from "../react-app-env";

const SignupForm = ({
  handleNewEmail,
  handleNewPass,
  handleNewUserSubmit,
  isEmail,
  isLong,
  isLowercase,
  isUppercase,
  isNumber,
}: SignupProps) => {
  const [passwordType, setPasswordType] = useState("password");
  const userLanguage = useLanguage();
  const { darkMode } = useSelector((state) => state.user);

  const displayCheck = useCallback((bool) => {
    if (bool) {
      return <CheckIcon className={`h-3 w-3 transform translate-y-0.5`} />;
    } else return <XIcon className={`h-3 w-3 transform translate-y-0.5`} />;
  }, []);

  const checkStyle = {
    success: {
      border: "1px solid transparent",
      backgroundColor: darkMode ? "#bdbdbd" : "#808080",
      color: darkMode ? "black" : "white",
      fontWeight: "bold",
      transition: "all 500ms",
    },
    off: {
      border: `1px solid ${darkMode ? "#3F3F46" : "#bdbdbd"}`,
      backgroundColor: darkMode ? "#3F3F46" : "#f3f4f6",
      color: darkMode ? "#909090" : "#bdbdbd",
      transition: "all 500ms",
    },
  };

  return (
    <form
      method="post"
      className="h-full w-full flex flex-col items-center justify-center space-y-2"
      onSubmit={handleNewUserSubmit}
      // autoComplete="disabled"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-64 flex flex-col items-start">
          <label htmlFor="email">{userLanguage.signup.email}</label>
          <input
            className="w-full rounded p-1 border border-transparent bg-gray-100 dark:bg-gray-500 text-gray-900 dark:text-gray-100 outline-none focus:bg-white dark:focus:bg-gray-600"
            type="email"
            id="email"
            onChange={handleNewEmail}
            name="usrname"
            autoComplete="new-password"
          ></input>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="flex flex-col items-start">
            <label htmlFor="password">{userLanguage.login.pass}</label>
            <div className="w-64 h-max flex items-center justify-start relative">
              <input
                className="w-full rounded py-1 pl-1 pr-10 border border-transparent bg-gray-100 dark:bg-gray-500 text-gray-900 dark:text-gray-100 outline-none focus:bg-white dark:focus:bg-gray-600"
                type={passwordType}
                id="password"
                onChange={handleNewPass}
                name="pass"
                autoComplete="new-password"
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
          <div className="w-60 md:w-[20rem] md:translate-x-8 flex flex-col items-start md:flex-row md:flex-wrap md:items-center space-y-1 md:space-x-1">
            <div
              className="w-full md:w-max whitespace-nowrap flex items-start space-x-1 text-gray-400 pl-2 md:pl-1 pr-2 py-1 rounded-full"
              style={isUppercase ? checkStyle.success : checkStyle.off}
            >
              <span>{displayCheck(isUppercase)}</span>
              <span className="text-xs">{userLanguage.signup.checkUpper}</span>
            </div>
            <div
              className="w-full md:w-max whitespace-nowrap flex items-start space-x-1 text-gray-400 pl-2 md:pl-1 pr-2 py-1 rounded-full"
              style={isLowercase ? checkStyle.success : checkStyle.off}
            >
              <span>{displayCheck(isLowercase)}</span>
              <span className="text-xs">{userLanguage.signup.checkLower}</span>
            </div>
            <div
              className="w-full md:w-max whitespace-nowrap flex items-start space-x-1 text-gray-400 pl-2 md:pl-1 pr-2 py-1 rounded-full"
              style={isNumber ? checkStyle.success : checkStyle.off}
            >
              <span> {displayCheck(isNumber)}</span>
              <span className="text-xs">{userLanguage.signup.checkDigit}</span>
            </div>
            <div
              className="w-full md:w-max whitespace-nowrap flex items-start space-x-1 text-gray-400 pl-2 md:pl-1 pr-2 py-1 rounded-full"
              style={isLong ? checkStyle.success : checkStyle.off}
            >
              <span> {displayCheck(isLong)}</span>
              <span className="text-xs">{userLanguage.signup.check8}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        className="w-[15.5rem] text-white uppercase p-2 rounded-full transform translate-y-4 md:translate-y-4 disabled:opacity-50 shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
        disabled={!isEmail || !isUppercase || !isLowercase || !isNumber || !isLong ? true : false}
      >
        {userLanguage.signup.submit}
      </button>
    </form>
  );
};

export default SignupForm;
