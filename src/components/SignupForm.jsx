import { CheckIcon, XIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import { StepUsername } from ".";

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
  const displayCheck = (bool) => {
    if (bool) {
      return (
        <CheckIcon className="h-3 w-3 text-green-700-accent transform translate-y-0.5" />
      );
    } else
      return (
        <XIcon className="h-3 w-3 text-gray-400 transform translate-y-0.5" />
      );
  };

  const toNextStep = isCreated
    ? { transform: "translateX(-100%)" }
    : { transform: "translateX(0%)" };

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
      className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-red-100 transition-transform duration-500 delay-700 relative"
      style={toNextStep}
    >
      <h2 className="text-center uppercase">
        Rejoignez la communauté Groupomomania!
      </h2>
      <div
        className="w-full flex items-center justify-center border"
        style={{ height: "15vh" }}
      >
        <span
          className="block w-max h-max py-2 px-3 border border-red-400 rounded"
          style={
            errorServer !== ""
              ? { errorStyleServer }
              : errorDuplicate !== ""
              ? { errorStyleDuplicate }
              : { visibility: "hidden" }
          }
        >
          {errorServer || errorDuplicate}
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
              className="w-64 rounded p-1"
              type="email"
              id="email"
              onChange={handleNewEmail}
            ></input>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div>
              <label htmlFor="password">Créez un mot de passe</label>
              <input
                className="w-64 rounded p-1"
                type="password"
                name="password"
                onChange={handleNewPass}
              ></input>
            </div>
            <div className="w-64 border flex flex-col items-center gap-1">
              <div
                className="w-52 border rounded flex items-start gap-1"
                style={
                  isUppercase
                    ? { borderColor: "#00c853", color: "#00c853" }
                    : { borderColor: "#9e9e9e", color: "#9e9e9e" }
                }
              >
                <span>{displayCheck(isUppercase)}</span>
                <span className="text-xs">contient au moins une majuscule</span>
              </div>
              <div
                className="w-52 border border-gray-400 rounded flex items-start gap-1 text-gray-400"
                style={
                  isLowercase
                    ? { borderColor: "#00c853", color: "#00c853" }
                    : { borderColor: "#9e9e9e", color: "#9e9e9e" }
                }
              >
                <span>{displayCheck(isLowercase)}</span>
                <span className="text-xs">contient au moins une minuscule</span>
              </div>
              <div
                className="w-52 border border-gray-400 rounded flex items-start gap-1 text-gray-400"
                style={
                  isNumber
                    ? { borderColor: "#00c853", color: "#00c853" }
                    : { borderColor: "#9e9e9e", color: "#9e9e9e" }
                }
              >
                <span> {displayCheck(isNumber)}</span>
                <span className="text-xs">contient au moins un chiffre</span>
              </div>
              <div
                className="w-52 border border-gray-400 rounded flex items-start gap-1 text-gray-400"
                style={
                  isLong
                    ? { borderColor: "#00c853", color: "#00c853" }
                    : { borderColor: "#9e9e9e", color: "#9e9e9e" }
                }
              >
                <span> {displayCheck(isLong)}</span>
                <span className="text-xs">contient au moins 8 caractères</span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-48 bg-red-400 p-2 rounded transform translate-y-2 disabled:opacity-50"
          disabled={
            !isEmail || !isUppercase || !isLowercase || !isNumber || !isLong
              ? true
              : false
          }
        >
          valider
        </button>
      </form>
      <div className="w-4/5 border-t border-red-500 transform translate-y-12 md:translate-y-16 py-2 flex flex-col items-center justify-center gap-1 md:flex-row md:gap-2">
        J'ai déjà un compte!{" "}
        <Link
          to="/login"
          className="font-bold underline uppercase text-red-400"
        >
          Se connecter
        </Link>
      </div>
      <StepUsername userId={userId}></StepUsername>
    </div>
  );
};

export default SignupForm;
