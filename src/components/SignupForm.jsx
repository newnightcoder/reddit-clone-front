import { CheckIcon, XIcon } from "@heroicons/react/solid";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StepUsername } from ".";
import logo from "../assets/logo2.svg";

const SignupForm = ({
  errorServer,
  errorDuplicate,
  handleNewEmail,
  handleNewPass,
  handleNewUserSubmit,
  isCreated,
  isEmail,
  isLong,
  isLowercase,
  isUppercase,
  isNumber,
  userId,
}) => {
  const error = useSelector((state) => state.user.error);

  const displayCheck = (bool) => {
    if (bool) {
      return <CheckIcon className="h-3 w-3 text-green-900 transform translate-y-0.5" />;
    } else return <XIcon className="h-3 w-3 text-gray-800 transform translate-y-0.5" />;
  };

  const toNextStep =
    isCreated && error.length === 0
      ? {
          transform: "translateX(-100%)",
          background: `url(${logo}) no-repeat center/250%`,
        }
      : {
          transform: "translateX(0%)",
          background: `url(${logo}) no-repeat center/250%`,
        };

  const errorStyleServer = {
    visibility: "visible",
    whiteSpace: "pre",
    textAlign: "center",
  };

  const errorStyleDuplicate = {
    visibility: "visible",
    whiteSpace: "normal",
    textAlign: "left",
  };

  return (
    <div
      className="h-screen w-screen bg-red-100 flex flex-col items-center justify-center gap-1 transition-transform duration-500 delay-300 relative"
      style={toNextStep}
    >
      <h2 className="text-center uppercase">Rejoignez la communauté Groupomomania!</h2>
      <div className="error h-1/6 w-full flex items-center justify-center">
        <span
          className="block w-max h-max py-2 px-3 border border-red-700 rounded"
          style={{ visibility: error.length !== 0 ? "visible" : "hidden" }}
        >
          {error}
        </span>
      </div>
      <form
        method="post"
        className="h-max w-64 flex flex-col items-center justify-center gap-4"
        onSubmit={handleNewUserSubmit}
      >
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col items-start">
            <label htmlFor="email">Entrez votre email</label>
            <input
              className="w-64 rounded p-1 border border-red-300 outline-none"
              type="email"
              id="email"
              onChange={handleNewEmail}
            ></input>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div>
              <label htmlFor="password">Créez un mot de passe</label>
              <input
                className="w-64 rounded p-1 border border-red-300 outline-none"
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
                <span className="text-xs">contient au moins une majuscule</span>
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
                <span className="text-xs">contient au moins une minuscule</span>
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
                <span className="text-xs">contient au moins un chiffre</span>
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
                <span className="text-xs">contient au moins 8 caractères</span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-48 text-white p-2 rounded transform translate-y-2 disabled:opacity-50 shadow-xl"
          style={{ backgroundColor: "#ef5350" }}
          disabled={
            !isEmail || !isUppercase || !isLowercase || !isNumber || !isLong
              ? true
              : false
          }
        >
          valider
        </button>
      </form>
      <div className="w-4/5 md:w-96 border-t border-black transform translate-y-12 md:translate-y-16 py-2 flex items-center justify-center gap-2">
        J'ai déjà un compte!{" "}
        <Link to="/login" className="font-bold underline uppercase text-red-600">
          Se connecter
        </Link>
      </div>
      <StepUsername userId={userId}></StepUsername>
    </div>
  );
};

export default SignupForm;
