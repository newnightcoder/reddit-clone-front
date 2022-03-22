import { ChevronLeftIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";

const SettingsOptions = ({
  optionTitle,
  setOptionTitle,
  isOpen,
  isActive,
  setIsActive,
  userLangData,
  setLanguage,
  langOptions,
  setMode,
  toggleOption,
  modeOptions,
}) => {
  const { lang, appearance, subtitleLang, subtitleMode } = userLangData.options;
  const [activeBtn, setActiveBtn] = useState(null);
  const savedLanguage = localStorage.getItem("Lang");
  const savedMode = localStorage.getItem("Mode");

  const activateBtn = (e, id) => {
    if (e.target.id === id) {
      setActiveBtn(id);
    }
  };

  useEffect(() => {
    console.log("ACTIVE 2 in settingsOptions:", isActive);
    console.log("modeoptions in settingsOptions:", modeOptions);
  }, [isActive, setIsActive]);

  return (
    <div
      className="z-40 w-52 px-2 absolute top-0 right-0 flex flex-col items-start justify-start bg-white rounded-lg shadow"
      style={isOpen ? { display: "flex" } : { display: "none" }}
    >
      <button
        className="w-full pt-4 pb-3 flex items-center justify-start space-x-2 border-b border-gray-100"
        onClick={() => toggleOption()}
      >
        <ChevronLeftIcon className="h-6" />{" "}
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
        <p className="text-sm px-1 py-3 italic">{subtitleLang}</p>
        <div className="h-min pt-4 pb-6 w-full flex flex-col items-start justify-start space-y-2">
          {langOptions.map((langOpt, i) => (
            <button
              key={i + 1}
              id={langOpt}
              onClick={(e) => {
                setLanguage(langOpt);
                activateBtn(e, langOpt);
              }}
              className="w-full flex items-center justify-between py-2 px-2 space-x-1 capitalize transition duration-300 hover:bg-gray-100 active:bg-blue-500"
              style={{ color: savedLanguage === langOpt && "red" }}
            >
              {langOpt}
            </button>
          ))}
        </div>
      </div>
      <div
        style={
          isActive === "appearance" || isActive === "apparence" || isActive === "erscheinungsbild"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <p className="text-sm px-1 py-3 italic">{subtitleMode}</p>
        <div className="h-min pt-4 pb-6 w-full flex flex-col items-start justify-start space-y-2">
          {modeOptions.map((mode, i) => (
            <button
              key={i + 1}
              id={mode}
              onClick={(e) => {
                setMode(mode);
                activateBtn(e, mode);
              }}
              className="w-full flex items-center justify-between py-2 px-2 space-x-1 capitalize transition duration-300 hover:bg-gray-100"
              style={{ color: savedMode === mode && "red" }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsOptions;
