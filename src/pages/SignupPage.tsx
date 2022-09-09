import { useCallback, useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BtnSettings, Error, LoginHeader, Settings, SignupForm, StepUsername } from "../components";
import { clearErrorPostAction } from "../store/actions/posts.action";
import { clearErrorUserAction, createUserAction } from "../store/actions/user.action";
import { date } from "../utils/helpers/formatTime";
import { useLanguage, useToggleSettings } from "../utils/hooks";

const Signup = () => {
  const { userCreated } = useSelector((state) => state.user);
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

  useEffect(() => {
    dispatch(clearErrorUserAction());
    dispatch(clearErrorPostAction());
  }, [dispatch]);

  const handleNewEmail = useCallback(
    (e) => {
      const emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      setNewUserEmail(e.currentTarget.value);
      if (emailRegex.test(e.currentTarget.value)) {
        setIsEmail(true);
      } else setIsEmail(false);
    },
    [setNewUserEmail, setIsEmail]
  );

  const handleNewPass = useCallback(
    (e) => {
      setNewUserPass(e.currentTarget.value);
      const password = e.currentTarget.value;
      const passwordArray = password.split("");
      // contains number
      if (passwordArray.find((letter: string) => /[0-9]/.test(letter))) {
        setIsNumber(true);
      } else {
        setIsNumber(false);
      }
      // contains capital letter
      if (passwordArray.find((letter: string) => /[A-Z]/.test(letter))) {
        setIsUppercase(true);
      } else {
        setIsUppercase(false);
      }
      // contains lowercase letter
      if (passwordArray.find((letter: string) => /[a-z]/.test(letter))) {
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
    },
    [setNewUserPass, setIsNumber, setIsUppercase, setIsLowercase, setIsLong]
  );

  const handleNewUserSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(createUserAction(newUserEmail, newUserPass, date));
    },
    [dispatch, newUserEmail, newUserPass]
  );

  const toNextStep = userCreated ? { transform: "translateX(-100%)", transitionDelay: "300ms" } : { transform: "translateX(0%)" };

  return (
    <Div100vh
      className="w-full relative flex flex-col items-center justify-start pb-3 md:pb-0 pt-16 md:pt-0 transition duration-500 text-gray-900 dark:text-gray-200 bg-gray-200 dark:bg-black"
      style={toNextStep}
    >
      <BtnSettings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
      <Error />
      <div className="page-container h-full w-full grid grid-rows-login justify-items-center md:grid-rows-none md:grid-cols-login">
        <div className="header-form self-center h-max w-full md:w-max justify-self-center grid grid-rows-main gap-6 lg:translate-x-20 pb-3">
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
        <div className="bottom-section relative h-min w-4/5 md:h-full md:w-full md:bg-login bg-no-repeat bg-center bg-cover flex items-center md:items-start justify-center border-t md:border-none border-black dark:border-white py-2 md:py-20">
          <div className="h-full w-full md:h-[max-content] md:absolute md:top-[39%] flex flex-col items-center justify-center space-x-2 md:px-16">
            <span className="whitespace-nowrap text-gray-900 dark:text-white md:text-white transition-colors duration-500">
              {userLanguage.signup.already}
            </span>
            <Link to="/login" className="font-bold underline uppercase text-blue-500 transition duration-300 hover:text-blue-500">
              {userLanguage.signup.alreadyBtn}
            </Link>
          </div>
        </div>
      </div>
      {userCreated && <StepUsername />}
      <Settings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
    </Div100vh>
  );
};

export default Signup;
