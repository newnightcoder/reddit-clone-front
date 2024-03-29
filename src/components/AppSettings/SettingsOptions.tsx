import { CheckIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setLanguageAction } from "../../store/actions/user.action";
import { breakpoint } from "../../utils/breakpoints";
import { useLanguage, useWindowSize } from "../../utils/hooks";
import useDarkMode from "../../utils/hooks/useDarkMode";
import { SettingsOptionsProps } from "../react-app-env";

const SettingsOptions = ({
  setIsSettingsOpen,
  isSettingsOpen,
  isActive,
  langOptions,
  langLabel,
  appearanceLabel,
  modeOptions,
}: SettingsOptionsProps) => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.user);
  const { isDarkMode, toggleMode } = useDarkMode();
  const userLanguage = useLanguage();
  const { lang, appearance, subtitleLang, subtitleMode } = userLanguage.options;
  const { width } = useWindowSize();
  const { pathname } = useLocation();
  const introPages = pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname === "/fin";

  return (
    <div
      className={`${isSettingsOpen ? "flex" : "hidden"} ${
        introPages ? "top-0" : width < breakpoint.md ? "bottom-0" : "top-0"
      } z-40 w-52 px-2 pb-2 absolute left-0 flex-col items-start justify-start bg-white dark:bg-gray-700 rounded-lg shadow-xl `}
    >
      <button
        className="w-full pt-4 pb-3 flex items-center justify-start space-x-2 border-b border-gray-100"
        onClick={() => setIsSettingsOpen(false)}
      >
        <ChevronLeftIcon className="h-6" />
        <span className="capitalize">
          {langLabel.includes(isActive!) ? lang : appearanceLabel.includes(isActive!) ? appearance : "fail"}
        </span>
      </button>

      <div className={`${langLabel.includes(isActive!) ? "block" : "hidden"}`}>
        <p className="w-full text-sm px-1 py-3 italic whitespace-normal">{subtitleLang}</p>
        <div className="h-min pt-4 pb-6 w-full flex flex-col items-start justify-start space-y-2">
          {langOptions.map((langOpt, i) => (
            <button
              key={i + 1}
              id={langOpt}
              onClick={() => dispatch(setLanguageAction(langOpt.slice(0, 2)))}
              className="w-full rounded flex items-center justify-between py-2 px-2 space-x-1 capitalize outline-none rounded transition duration-300 hover:bg-gray-100 dark:hover:text-black"
              style={
                language === langOpt.slice(0, 2)
                  ? { color: "white", fontWeight: "bold", backgroundColor: "rgb(96 165 250)" }
                  : undefined
              }
            >
              <>{langOpt}</>
              <CheckIcon
                className="hidden text-white h-6"
                style={language === langOpt.slice(0, 2) ? { display: "block" } : undefined}
              />
            </button>
          ))}
        </div>
      </div>
      <div className={`${appearanceLabel.includes(isActive!) ? "inline-block" : "hidden"}`}>
        <p className="text-sm px-1 py-3 italic whitespace-normal">{subtitleMode}</p>
        <div className="h-min pt-4 pb-6 w-full flex flex-col items-start justify-start space-y-2">
          {modeOptions.map((mode, i) => (
            <button
              key={i + 1}
              id={mode}
              onClick={toggleMode}
              className="w-full flex items-center justify-between py-2 px-2 space-x-1 outline-none rounded capitalize transition duration-300 hover:bg-gray-200 dark:hover:text-black outline-none"
              style={
                (!isDarkMode && mode === userLanguage.appearance.light) || (isDarkMode && mode === userLanguage.appearance.dark)
                  ? { color: "white", fontWeight: "bold", backgroundColor: "rgb(96 165 250)" }
                  : undefined
              }
            >
              <>{mode}</>
              <CheckIcon
                className="hidden text-white h-6"
                style={
                  (isDarkMode && mode === userLanguage.appearance.dark) || (!isDarkMode && mode === userLanguage.appearance.light)
                    ? { display: "block" }
                    : undefined
                }
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsOptions;
