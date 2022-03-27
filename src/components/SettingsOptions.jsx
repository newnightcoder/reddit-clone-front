import { CheckIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import React from "react";
import language from "../languages";
import useDarkMode from "../utils/hooks/useDarkMode";

const SettingsOptions = ({
  isOpen,
  isActive,
  setIsActive,
  userLangData,
  setLanguage,
  langOptions,
  setMode,
  toggleOption,
  modeOptions,
  allModeOptions,
}) => {
  const { lang, appearance, subtitleLang, subtitleMode } = userLangData.options;
  const savedLanguage = localStorage.getItem("Lang");
  const savedMode = localStorage.getItem("Mode");

  // const [activeBtn, setActiveBtn] = useState(null);
  // const activateBtn = (e, id) => {
  //   if (e.target.id === id) {
  //     setActiveBtn(id);
  //   }
  // };

  const [theme, toggleMode] = useDarkMode();

  const saveModeInCurrentLang = (lang) => {
    if (savedMode) {
      switch (lang) {
        case "français":
          if (savedMode === "dark") return setMode(language.français.appearance.dark);
          if (savedMode === "DunkelModus") return setMode(language.français.appearance.dark);
          if (savedMode === "light") return setMode(language.français.appearance.light);
          if (savedMode === "HellModus") return setMode(language.français.appearance.light);
        case "english":
          if (savedMode === "sombre") return setMode(language.english.appearance.dark);
          if (savedMode === "clair") return setMode(language.english.appearance.light);
          if (savedMode === "DunkelModus") return setMode(language.english.appearance.dark);
          if (savedMode === "HellModus") return setMode(language.english.appearance.light);
        case "deutsch":
          if (savedMode === "sombre") return setMode(language.deutsch.appearance.dark);
          if (savedMode === "clair") return setMode(language.deutsch.appearance.light);
          if (savedMode === "light") return setMode(language.deutsch.appearance.light);
          if (savedMode === "dark") return setMode(language.deutsch.appearance.dark);
      }
    }
  };

  return (
    <div
      className="z-40 w-52 px-2 pb-2 absolute top-0 left-0 flex-col items-start justify-start bg-white rounded-lg shadow-xl dark:bg-gray-500"
      style={isOpen ? { display: "flex" } : { display: "none" }}
    >
      <button
        className="w-full pt-4 pb-3 flex items-center justify-start space-x-2 border-b border-gray-100"
        onClick={() => toggleOption()}
      >
        <ChevronLeftIcon className="h-6" />
        <span className="capitalize">
          {isActive === "langue" || isActive === "language" || isActive === "sprache"
            ? lang
            : (isActive === "appearance" || isActive === "apparence" || isActive === "erscheinungsbild") && appearance}
        </span>
      </button>

      <div
        style={
          isActive === "langue" || isActive === "language" || isActive === "sprache" ? { display: "block" } : { display: "none" }
        }
      >
        <p className="w-full text-sm px-1 py-3 italic whitespace-normal">{subtitleLang}</p>
        <div className="h-min pt-4 pb-6 w-full flex flex-col items-start justify-start space-y-2">
          {langOptions.map((langOpt, i) => (
            <button
              key={i + 1}
              id={langOpt}
              onClick={() => {
                setLanguage(langOpt);
                saveModeInCurrentLang(langOpt);
              }}
              className="w-full rounded flex items-center justify-between py-2 px-2 space-x-1 capitalize transition duration-300 hover:bg-gray-100"
              style={
                savedLanguage === langOpt ? { color: "white", fontWeight: "bold", backgroundColor: "rgb(96 165 250)" } : null
              }
            >
              <>{langOpt}</>
              <CheckIcon className="hidden text-white h-6" style={savedLanguage === langOpt ? { display: "block" } : null} />
            </button>
          ))}
        </div>
      </div>
      <div
        style={
          isActive === "appearance" || isActive === "apparence" || isActive === "erscheinungsbild"
            ? { display: "inline-block" }
            : { display: "none" }
        }
      >
        <p className="text-sm px-1 py-3 italic whitespace-normal">{subtitleMode}</p>
        <div className="h-min pt-4 pb-6 w-full flex flex-col items-start justify-start space-y-2">
          {modeOptions.map((mode, i) => (
            <button
              key={i + 1}
              id={mode}
              onClick={(e) => {
                savedMode !== mode && toggleMode();
              }}
              className="w-full flex items-center justify-between py-2 px-2 space-x-1 capitalize transition duration-300 hover:bg-gray-100 outline-none"
              style={savedMode === mode ? { color: "white", fontWeight: "bold", backgroundColor: "rgb(96 165 250)" } : null}
            >
              <>{mode}</>
              <CheckIcon className="hidden text-white h-6" style={savedMode === mode ? { display: "block" } : null} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsOptions;
