import { ChevronLeftIcon } from "@heroicons/react/solid";
import React from "react";

const SettingsOptions = ({
  optionTitle,
  isOpen,
  options,
  userLangData,
  setLanguage,
  langOptions,
  saveMode,
  toggleOption,
  modeOptions,
}) => {
  return (
    <div
      className="z-50 w-52 px-2 absolute top-0 flex-col items-start justify-start bg-white rounded-lg shadow"
      style={isOpen ? { display: "flex" } : { display: "none" }}
    >
      <button
        className="w-full pt-4 pb-3 flex items-center justify-start space-x-2 border-b border-gray-100"
        onClick={() => toggleOption()}
      >
        <ChevronLeftIcon className="h-6" /> <span className="capitalize">{optionTitle}</span>
      </button>

      {optionTitle === options[0] ? (
        <>
          <p className="text-sm px-1 py-3">Vous pourrez voir FORUM et ses membres dans la langue de votre choix.</p>
          <div className="h-min pt-4 pb-6 w-full flex flex-col items-start justify-start space-y-2">
            {langOptions.map((lang, i) => (
              <button
                key={i + 1}
                onClick={() => setLanguage(lang)}
                className="w-full flex items-center justify-between py-2 px-2 space-x-1 capitalize transition duration-300 hover:bg-gray-100"
              >
                {lang}
              </button>
            ))}
          </div>
        </>
      ) : (
        optionTitle === options[1] && (
          <>
            <p className="text-sm px-1 py-3">Ajustez l'interface de Forum à vos préférences: thème sombre ou thème clair</p>
            <div className="h-min pt-4 pb-6 w-full flex flex-col items-start justify-start space-y-2">
              {modeOptions.map((mode, i) => (
                <button
                  key={i + 1}
                  onClick={() => saveMode()}
                  className="w-full flex items-center justify-between py-2 px-2 space-x-1 capitalize transition duration-300 hover:bg-gray-100"
                >
                  {mode}
                </button>
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default SettingsOptions;
