import { DotsHorizontalIcon, XIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { SettingsProps } from "../react-app-env";

const BtnSettings = (props: SettingsProps) => {
  const { userCreated } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const isIntroScreens = pathname === "/login" || pathname === "/signup";

  return (
    <button
      className={`h-10 w-10 absolute top-5 right-6 md:right-14 flex items-center justify-center rounded-full tracking-widest font-bold text-2xl transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700`}
      onClick={props.toggleSettings}
    >
      <DotsHorizontalIcon
        className={`h-7 absolute m-auto z-10 text-gray-900 dark:text-gray-100  ${
          userCreated ? "md:text-gray-900 md:dark:text-gray-100" : isIntroScreens ? "md:text-white md:dark:text-white" : ""
        } transition-color duration-500 ${props.settingsOpen ? "animate-iconOff" : "animate-iconOn"}`}
      />
      {/* userCreated ? "md:text-gray-900 md:dark:text-gray-100" : */}
      <XIcon
        className={`h-7 absolute m-auto z-10 text-gray-900  dark:text-gray-100 ${
          userCreated ? "md:text-gray-900 md:dark:text-gray-100" : isIntroScreens ? "md:text-white md:dark:text-white" : ""
        } transition-color duration-500 ${props.settingsOpen ? "animate-iconOn" : "animate-iconOff"}`}
      />
      {/* userCreated ? "md:text-gray-900 md:dark:text-gray-100" : */}
    </button>
  );
};

export default BtnSettings;
