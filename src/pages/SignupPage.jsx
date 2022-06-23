import { useState } from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BtnSettings, Error, LoginHeader, Settings, SignupForm, StepUsername } from "../components";
import { createUser } from "../store/actions/user.action";
import { date } from "../utils/helpers/formatTime";
import { useError, useLanguage, useToggleSettings } from "../utils/hooks";

const Signup = () => {
  const { userCreated, darkMode, id: userId } = useSelector((state) => state.user);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [newUserPass, setNewUserPass] = useState("");
  const [isUppercase, setIsUppercase] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const { settingsOpen, toggleSettings } = useToggleSettings();
  const error = useError();
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
    dispatch(createUser(newUserEmail, newUserPass, date));
  };

  const toNextStep = userCreated ? { transform: "translateX(-100%)", transitionDelay: "300ms" } : { transform: "translateX(0%)" };

  return (
    <Div100vh
      className="w-full relative flex flex-col items-center justify-start pb-3 md:pb-0 pt-16 md:pt-0 transition-colors duration-500 text-gray-900 dark:text-gray-200"
      style={toNextStep}
    >
      <BtnSettings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
      <Error />
      <div className="page-container h-full w-full grid grid-rows-login justify-items-center md:grid-rows-none md:grid-cols-login">
        <div className="header-form self-center h-max w-full md:w-max justify-self-center grid grid-rows-main gap-6 lg:translate-x-20">
          <LoginHeader />
          <SignupForm
            isEmail={isEmail}
            isUppercase={isUppercase}
            isLowercase={isLowercase}
            isNumber={isNumber}
            isLong={isLong}
            handleNewEmail={handleNewEmail}
            handleNewPass={handleNewPass}
            handleNewUserSubmit={handleNewUserSubmit}
          />
        </div>
        <div className="bottom-section md:bg-featherLight md:dark:bg-featherDark bg-no-repeat bg-center bg-contain h-min md:h-max w-4/5 md:w-full md:bg-gray-100 md:dark:bg-gray-600 flex items-center justify-start self-end md:self-auto text-center transition duration-500 border-t md:border-none border-black dark:border-white py-2 md:py-20">
          <div className="md:h-full md:max-h-[500px] w-full flex flex-col items-center justify-center space-x-2 md:px-16">
            <span className="whitespace-nowrap text-gray-900 dark:text-gray-200 transition-colors duration-500 ">
              {userLanguage.signup.already}
            </span>
            <Link
              to="/login"
              className="font-bold underline uppercase text-blue-400 transition-colors duration-300 hover:text-blue-500"
            >
              {userLanguage.signup.alreadyBtn}
            </Link>
          </div>
        </div>
      </div>
      {userCreated && <StepUsername userId={userId}></StepUsername>}
      <Settings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
    </Div100vh>
  );
};

export default Signup;
