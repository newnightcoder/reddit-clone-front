import { CheckIcon, XIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "./index";

const Signup = () => {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [newUserPass, setNewUserPass] = useState("");
  const [isUppercase, setIsUppercase] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const displayCheck = (bool) => {
    if (bool) {
      return <CheckIcon className="h-3 w-3 text-black" />;
    } else return <XIcon className="h-3 w-3 text-black" />;
  };

  const handleNewEmail = (e) => {
    setNewUserEmail(e.currentTarget.value);
    if (emailRegex.test(newUserEmail)) {
      setIsEmail(true);
    } else setIsEmail(false);
  };

  // const emailWarning = () => {
  //   if (!isEmail) {
  //     return <div>Veuillez entrer une adresse email valide</div>;
  //   }
  // };

  const handleNewPass = (e) => {
    setNewUserPass(e.currentTarget.value);
    const password = e.currentTarget.value;
    const passwordArray = password.split("");
    // contains number
    if (passwordArray.find((letter) => /[0-9]/.test(parseInt(letter)))) {
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }
    // contains capital letter
    if (passwordArray.find((letter) => /[A-Z]/.test(letter))) {
      setIsUppercase(true);
    } else {
      setIsUppercase(false);
    }
    // contains lowercase letter
    if (passwordArray.find((letter) => /[a-z]/.test(letter))) {
      setIsLowercase(true);
    } else {
      setIsLowercase(false);
    }
    // minimum 8 char
    if (passwordArray.length >= 8) {
      setIsLong(true);
    } else {
      setIsLong(false);
    }
  };

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        newUserEmail,
        newUserPass,
      }),
    };
    try {
      const response = await fetch(API, request);
      const data = await response.json();
      console.log(response.status, data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-red-100">
      <h2 className="text-center uppercase">
        Rejoignez la communauté Groupomomania!
      </h2>
      <form
        className="h-1/2 flex flex-col items-center justify-center gap-4"
        onSubmit={handleNewUserSubmit}
      >
        <div className="flex flex-col items-start">
          <label htmlFor="input">Entrez votre email</label>
          <input onChange={handleNewEmail} style={{ width: "200px" }}></input>
          {/* {emailWarning()} */}
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="input">Créez un mot de passe</label>
          <input onChange={handleNewPass} style={{ width: "200px" }}></input>
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
          className="bg-red-400 px-4 transform translate-y-2 disabled:opacity-50"
          disabled={
            !isEmail || !isNumber || !isUppercase || !isLowercase || !isLong
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
    </div>
  );
};

export default Signup;
