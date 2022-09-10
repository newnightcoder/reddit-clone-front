import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { picPlaceholder } from "../../assets";
import { BtnSettings, Error, ImgUploader, LoginHeader, Settings } from "../../components";
import { history } from "../../utils/helpers";
import { useError, useLanguage, useToggleSettings } from "../../utils/hooks";

const StepImage = () => {
  const { picUrl, usernameAdded } = useSelector((state) => state.user);
  const userLanguage = useLanguage();
  const error = useError();
  const { settingsOpen, toggleSettings } = useToggleSettings();

  // const toNextStep = usernameAdded ? { transform: "translateX(-100%)" } : { transform: "translateX(0%)" };

  return (
    <div
      className={`${
        usernameAdded ? "visible" : "invisible"
      } h-full w-screen bg-gray-200 dark:bg-black grid grid-rows-[max-content,1fr,max-content] grid-cols-1 relative transition-transform duration-300 px-4 pt-16 overflow-hidden`}
    >
      <Error />
      <BtnSettings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
      <Settings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
      <LoginHeader />
      <div className="h-full w-full flex flex-col items-center justify-center space-y-2 py-4">
        <div
          className="h-[10rem] w-[10rem] rounded-full border border-blue-400"
          style={{
            background: `url(${picUrl !== null ? picUrl : picPlaceholder}) no-repeat center/cover`,
          }}
        ></div>
        <ImgUploader profile={true} imgType={"pic"} />
      </div>
      <button
        className="underline font-bold text-black dark:text-white transition-colors duration-300 mx-auto py-4"
        onClick={() => history.push("/feed")}
      >
        <span className="flex items-center space-x-1">
          {userLanguage.signup.stepImage.later}
          <ChevronDoubleRightIcon className="h-4 w-4 " style={{ transform: "translateY(1px)" }} />
        </span>
      </button>
    </div>
  );
};

export default StepImage;
