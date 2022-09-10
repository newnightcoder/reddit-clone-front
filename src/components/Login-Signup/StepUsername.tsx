import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BtnSettings, Error, LoginHeader, Settings } from "../../components";
import { clearErrorUserAction, saveUserNameAction } from "../../store/actions/user.action";
import { useError, useLanguage, useToggleSettings } from "../../utils/hooks";

const StepUsername = () => {
  const [userName, setUserName] = useState("");
  const [isLong, setIsLong] = useState(false);
  const { id: userId, userCreated, usernameAdded } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const error = useError();
  const { settingsOpen, toggleSettings } = useToggleSettings();

  // const toNextStep = userCreated ? { transform: "translateX(-100%)" } : { transform: "translateX(0%)" };

  // useEffect(() => {
  //   dispatch({ type: actionTypes.USERNAME_FAIL });
  // }, [dispatch]);

  const handleInput = useCallback(
    (e) => {
      if (error) dispatch(clearErrorUserAction());
      setUserName(e.currentTarget.value);
      const name = e.currentTarget.value.split("");
      if (name.length >= 2) {
        setIsLong(true);
      } else setIsLong(false);
    },
    [setUserName, setIsLong, error]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(saveUserNameAction(userId!, userName));
    },
    [dispatch, userId, userName]
  );

  return (
    <div
      className={`${
        userCreated ? "visible" : usernameAdded ? "invisible" : "invisible"
      } w-screen h-full min-h-screen overflow-hidden border-2 border-green-500 bg-gray-200 dark:bg-black grid grid-rows-[1fr,1fr] grid-cols-1 transition-transform duration-300 relative`}
      // style={toNextStep}
    >
      <Error />
      <BtnSettings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
      <Settings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
      <LoginHeader />
      <div className="h-full border border-red-500">
        {/* <p className="font-bold text-center">{userLanguage.signup.stepUsername.choose}</p> */}
        <form className="flex flex-col items-center justify-center space-y-1" method="post" onSubmit={handleSubmit}>
          <label htmlFor="username"></label>
          <input
            className="w-48 rounded p-1 border border-blue-300 text-gray-900 transition-color duration-300 hover:border-blue-400 outline-none"
            type="text"
            id="username"
            onChange={handleInput}
          />
          <button
            className="w-48 p-2 rounded-full transform translate-y-2 disabled:opacity-50 shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none uppercase"
            disabled={!isLong ? true : false}
          >
            {userLanguage.signup.stepUsername.ok}
          </button>
        </form>
      </div>
      {/* {usernameAdded && <StepImage />} */}
    </div>
  );
};

export default StepUsername;
