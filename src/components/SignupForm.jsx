import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "@heroicons/react/solid";
import React, { useCallback, useState } from "react";
import { useLanguage } from "../utils/hooks";

const SignupForm = ({
  handleNewEmail,
  handleNewPass,
  handleNewUserSubmit,
  isEmail,
  isLong,
  isLowercase,
  isUppercase,
  isNumber,
}) => {
  const [passwordType, setPasswordType] = useState("password");
  const userLanguage = useLanguage();

  const displayCheck = useCallback((bool) => {
    if (bool) {
      return <CheckIcon className="h-3 w-3 text-green-900 transform translate-y-0.5" />;
    } else return <XIcon className="h-3 w-3 text-gray-800 transform translate-y-0.5" />;
  }, []);

  return (
    <form method="post" className="h-min w-72 flex flex-col items-center justify-center space-y-2" onSubmit={handleNewUserSubmit}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-64 flex flex-col items-start">
          <label htmlFor="email">{userLanguage.signup.email}</label>
          <input
            className="w-full rounded p-1 border border-blue-400 outline-none text-black dark:text-white"
            type="email"
            id="email"
            onChange={handleNewEmail}
          ></input>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-start">
            <label htmlFor="password" className="transform translate-x-4">
              {userLanguage.signup.pass}
            </label>
            <div className="w-72 h-max flex items-center justify-start">
              <input
                className="w-full rounded py-1 pl-2 pr-10 border border-blue-400 outline-none text-black dark:text-white transform translate-x-4"
                type={passwordType}
                name="password"
                onChange={handleNewPass}
              ></input>
              {passwordType === "password" ? (
                <EyeOffIcon
                  onClick={() => setPasswordType("text")}
                  className="h-4 w-8 text-black dark:text-white cursor-pointer transform -translate-x-3/4"
                />
              ) : (
                <EyeIcon
                  onClick={() => setPasswordType("password")}
                  className="h-4 w-8 text-black dark:text-white cursor-pointer transform -translate-x-3/4"
                />
              )}
            </div>
          </div>
          <div className="w-64 flex flex-col items-center gap-1">
            <div
              className="w-60 rounded-xl p-1 flex items-start gap-1 text-gray-400"
              style={
                isUppercase
                  ? {
                      border: "1px solid #1b5e20",
                      backgroundColor: "#a5d6a7",
                      color: "#1b5e20",
                      fontWeight: "bold",
                    }
                  : {
                      border: "1px solid #bdbdbd",
                      backgroundColor: "#e0e0e0",
                      color: "#424242",
                    }
              }
            >
              <span>{displayCheck(isUppercase)}</span>
              <span className="text-xs">{userLanguage.signup.checkUpper}</span>
            </div>
            <div
              className="w-60 rounded-xl p-1 flex items-start gap-1 text-gray-400"
              style={
                isLowercase
                  ? {
                      border: "1px solid #1b5e20",
                      backgroundColor: "#a5d6a7",
                      color: "#1b5e20",
                      fontWeight: "bold",
                    }
                  : {
                      border: "1px solid #bdbdbd",
                      backgroundColor: "#e0e0e0",
                      color: "#424242",
                    }
              }
            >
              <span>{displayCheck(isLowercase)}</span>
              <span className="text-xs">{userLanguage.signup.checkLower}</span>
            </div>
            <div
              className="w-60 rounded-xl p-1 flex items-start gap-1 text-gray-400"
              style={
                isNumber
                  ? {
                      border: "1px solid #1b5e20",
                      backgroundColor: "#a5d6a7",
                      color: "#1b5e20",
                      fontWeight: "bold",
                    }
                  : {
                      border: "1px solid #bdbdbd",
                      backgroundColor: "#e0e0e0",
                      color: "#424242",
                    }
              }
            >
              <span> {displayCheck(isNumber)}</span>
              <span className="text-xs">{userLanguage.signup.checkDigit}</span>
            </div>
            <div
              className="w-60 rounded-xl p-1 flex items-start gap-1 text-gray-400"
              style={
                isLong
                  ? {
                      border: "1px solid #1b5e20",
                      backgroundColor: "#a5d6a7",
                      color: "#1b5e20",
                      fontWeight: "bold",
                    }
                  : {
                      border: "1px solid #bdbdbd",
                      backgroundColor: "#e0e0e0",
                      color: "#424242",
                    }
              }
            >
              <span> {displayCheck(isLong)}</span>
              <span className="text-xs">{userLanguage.signup.check8}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        className="w-48 text-white p-2 rounded-full transform translate-y-2 disabled:opacity-50 shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
        disabled={!isEmail || !isUppercase || !isLowercase || !isNumber || !isLong ? true : false}
      >
        {userLanguage.signup.submit}
      </button>
    </form>
  );
};

export default SignupForm;
