import { CheckIcon, XIcon } from "@heroicons/react/solid";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StepUsername } from ".";
import { logo } from "../assets";
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
  userId,
}) => {
  const { error, userCreated } = useSelector((state) => state.user);
  const userLanguage = useLanguage();

  const displayCheck = useCallback((bool) => {
    if (bool) {
      return <CheckIcon className="h-3 w-3 text-green-900 transform translate-y-0.5" />;
    } else return <XIcon className="h-3 w-3 text-gray-800 transform translate-y-0.5" />;
  }, []);

  const toNextStep = userCreated ? { transform: "translateX(-100%)" } : { transform: "translateX(0%)" };

  return (
    <div
      className="h-screen w-screen bg-gray-200 flex flex-col items-center justify-center transition-transform duration-500 delay-300 relative"
      style={toNextStep}
    >
      <header className="text-center uppercase text-black font-bold text-lg flex flex-col items-center justify-center">
        <span className="pl-4">{userLanguage.signup.join}</span>
        <img src={logo} alt="logo Forum" style={{ height: "150", width: "80%" }} />
      </header>
      <div
        style={{ display: error.length !== 0 ? "flex" : "none" }}
        className="error h-max w-full  items-center justify-center py-2"
      >
        <span className="block w-max h-max py-2 px-3 border-2 border-red-500 bg-black text-white rounded">{error}</span>
      </div>
      <form method="post" className="h-max w-64 flex flex-col items-center justify-center gap-4" onSubmit={handleNewUserSubmit}>
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col items-start">
            <label htmlFor="email">{userLanguage.signup.email}</label>
            <input
              className="w-64 rounded p-1 border border-blue-400 outline-none text-black"
              type="email"
              id="email"
              onChange={handleNewEmail}
            ></input>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div>
              <label htmlFor="password">{userLanguage.signup.pass}</label>
              <input
                className="w-64 rounded p-1 border border-blue-400 outline-none text-black"
                type="password"
                name="password"
                onChange={handleNewPass}
              ></input>
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
      <div className="w-4/5 md:w-96 border-t border-black text-black transform translate-y-6 md:translate-y-8 py-2 flex items-center justify-center gap-2">
        {userLanguage.signup.already}
        <Link
          to="/login"
          className="font-bold underline uppercase text-blue-500 transition-color duration-300 hover:text-blue-600"
        >
          {userLanguage.signup.alreadyBtn}
        </Link>
      </div>
      <StepUsername userId={userId}></StepUsername>
    </div>
  );
};

export default SignupForm;
