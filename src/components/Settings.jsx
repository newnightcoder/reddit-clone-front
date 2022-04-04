import { ChevronRightIcon, TranslateIcon } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { LifePreserver, ToggleOn } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import language from "../languages";
import { useLanguage, useWindowSize } from "../utils/hooks";
import SettingsOptions from "./SettingsOptions";

const Settings = ({ settingsOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [optionTitle, setOptionTitle] = useState("");
  const [langOptions, setLangOptions] = useState([]);
  const [allModeOptions, setAllModeOptions] = useState([]);
  const { height, width } = useWindowSize();
  const { pathname } = useLocation();
  const userLanguage = useLanguage();
  const { lang, appearance, help } = userLanguage.options;
  const options = [lang, appearance, help];
  const { dark, light } = userLanguage.appearance;
  const modeOptions = [dark, light];

  const getLangOptions = useCallback(() => {
    const options = [];
    for (const lang of Object.entries(language)) {
      options.push(lang[0]);
    }
    setLangOptions(options);
  }, []);

  const getAllAppearanceOptions = () => {
    let array = [];
    for (const appearance of Object.entries(language)) {
      array.push(appearance[1].appearance.dark);
      array.push(appearance[1].appearance.light);
    }
    // console.log(array);
    setAllModeOptions(array);
  };

  useEffect(() => {
    getLangOptions();
    getAllAppearanceOptions();
  }, []);

  const toggleOption = (option) => {
    setIsOpen((prevState) => !prevState);
    setIsActive(option);
    option !== null && setOptionTitle(option);
  };

  const setMode = (mode) => {
    localStorage.setItem("Mode", mode);
  };

  return (
    <div
      className="w-52 h-max absolute bg-white py-3 rounded-lg shadow-xl z-30 transform  dark:bg-gray-500"
      style={
        // settingsOpen
        //   ? { display: "inline-block", transform: width > 1024 ? "translateX(14rem)" : "translateX(4.5rem)" }
        //   : { display: "none" }

        {
          display: settingsOpen ? "inline-block" : "none",
          transform:
            settingsOpen && pathname === "/"
              ? "translateX(0)"
              : settingsOpen && width > 1024
              ? "translateX(14rem)"
              : settingsOpen && width < 768
              ? "translateX(0)"
              : settingsOpen
              ? "translateX(4.5rem)"
              : null,
          top: pathname === "/" ? "3.5rem" : width < 768 ? "-265%" : width < 1024 ? "9rem" : "8rem",
          left: settingsOpen && pathname === "/" ? "auto" : settingsOpen && width < 768 ? "45%" : settingsOpen ? "0.25rem" : null,
          right: pathname === "/" ? "1rem" : null,
          // bottom: width < 768 ? "0" : null,
        }
      }
    >
      <div>
        <button
          className="w-full flex items-center justify-between py-2 px-2 space-x-1 transition duration-300 hover:bg-gray-100"
          onClick={() => toggleOption(lang)}
        >
          <div className="w-full flex items-center justify-start space-x-1">
            <TranslateIcon className="h-5" /> <span className="capitalize">{lang}</span>
          </div>
          <ChevronRightIcon className="h-6" />
        </button>
        <button
          className="w-full flex items-center justify-between py-2 px-2 space-x-1 transition duration-300 hover:bg-gray-100"
          onClick={() => toggleOption(options[1])}
        >
          <div className="w-full flex items-center justify-start space-x-2">
            <ToggleOn className="h-5" /> <span className="capitalize">{options[1]}</span>
          </div>
          <ChevronRightIcon className="h-6" />
        </button>
        <button className="w-full flex items-center justify-between py-2 px-2 space-x-1 transition duration-300 hover:bg-gray-100">
          <div className="w-full flex items-center justify-start space-x-2">
            <LifePreserver className="h-5" /> <span className="capitalize">{options[2]}</span>
          </div>
          <ChevronRightIcon className="h-6" />
        </button>
      </div>
      <SettingsOptions
        optionTitle={optionTitle}
        setOptionTitle={setOptionTitle}
        isOpen={isOpen}
        options={options}
        langOptions={langOptions}
        modeOptions={modeOptions}
        setMode={setMode}
        toggleOption={toggleOption}
        isActive={isActive}
        setIsActive={setIsActive}
        allModeOptions={allModeOptions}
      />
    </div>
  );
};

export default Settings;
