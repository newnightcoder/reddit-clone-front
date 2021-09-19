import { CheckIcon, XIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import { StepUsername } from ".";

const SignupForm = ({
  error,
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
      return <CheckIcon className="h-3 w-3 text-black" />;
    } else return <XIcon className="h-3 w-3 text-black" />;
  };

  const toNextStep = isCreated
    ? { transform: "translateX(-100%)" }
    : { transform: "translateX(0%)" };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-red-100 transition-transform duration-500 delay-700 relative"
      style={toNextStep}
    >
      <h2 className="text-center uppercase">
        Rejoignez la communauté Groupomomania!
      </h2>
      <span
        style={
          error === "" ? { visibility: "hidden" } : { visibility: "visible" }
        }
        className="w-1/2 h-max whitespace-normal p-2 text-left border border-red-400"
      >
        {error !== "" && error}
      </span>
      <form
        method="post"
        className="h-1/2 flex flex-col items-center justify-center gap-4"
        onSubmit={handleNewUserSubmit}
      >
        <div className="flex flex-col items-start">
          <label htmlFor="email">Entrez votre email</label>
          <input
            type="email"
            id="email"
            onChange={handleNewEmail}
            style={{ width: "200px" }}
          ></input>
          {/* {emailWarning()} */}
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="password">Créez un mot de passe</label>
          <input
            type="password"
            name="password"
            onChange={handleNewPass}
            style={{ width: "200px" }}
          ></input>
          <div>
            <div className="flex items-center gap-1">
              <span>{displayCheck(isUppercase)}</span>
              <span className="text-xs">contient au moins une majuscule</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{displayCheck(isLowercase)}</span>
              <span className="text-xs">contient au moins une minuscule</span>
            </div>
            <div className="flex items-center gap-1">
              <span> {displayCheck(isNumber)}</span>
              <span className="text-xs">contient au moins un chiffre</span>
            </div>
            <div className="flex items-center gap-1">
              <span> {displayCheck(isLong)}</span>
              <span className="text-xs">contient au moins 8 caractères</span>
            </div>
          </div>
        </div>
        <button
          className="w-48 bg-red-400 px-4 transform translate-y-2 disabled:opacity-50"
          disabled={
            !isEmail || !isUppercase || !isLowercase || !isNumber || !isLong
              ? true
              : false
          }
        >
          submit
        </button>
      </form>
      <div className="border-t border-red-500 transform translate-y-2 py-2 flex gap-2">
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
