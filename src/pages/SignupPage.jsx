import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignupForm from "../components/SignupForm";
import { createUser } from "../store/actions/user.action";

const Signup = () => {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [newUserPass, setNewUserPass] = useState("");
  const [isUppercase, setIsUppercase] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const dispatch = useDispatch();
  const userCreated = useSelector((state) => state.user.userCreated);

  /* eslint no-control-regex: 0 */
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const handleNewEmail = (e) => {
    setNewUserEmail(e.currentTarget.value);
    if (emailRegex.test(e.currentTarget.value)) {
      setIsEmail(true);
    } else setIsEmail(false);
  };

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
    dispatch(createUser(newUserEmail, newUserPass));
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <SignupForm
        isEmail={isEmail}
        isUppercase={isUppercase}
        isLowercase={isLowercase}
        isNumber={isNumber}
        isLong={isLong}
        handleNewEmail={handleNewEmail}
        handleNewPass={handleNewPass}
        handleNewUserSubmit={handleNewUserSubmit}
        isCreated={isCreated}
      />
    </div>
  );
};

export default Signup;
