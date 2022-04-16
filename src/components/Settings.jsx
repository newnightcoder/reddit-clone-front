import { ChevronRightIcon, TranslateIcon } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { LifePreserver, ToggleOn } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import language from "../languages";
import { useLanguage, useWindowSize } from "../utils/hooks";
import SettingsOptions from "./SettingsOptions";

const Settings = ({ settingsOpen, isMenuOpen }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [optionTitle, setOptionTitle] = useState("");
  const [langOptions, setLangOptions] = useState([]);
  // const [allModeOptions, setAllModeOptions] = useState([]);
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

  // const getAllAppearanceOptions = () => {
  //   let array = [];
  //   for (const appearance of Object.entries(language)) {
  //     array.push(appearance[1].appearance.dark);
  //     array.push(appearance[1].appearance.light);
  //   }
  //   setAllModeOptions(array);
  // };

  useEffect(() => {
    getLangOptions();
    // getAllAppearanceOptions();
  }, []);

  const toggleOption = (option) => {
    setIsSettingsOpen((prevState) => !prevState);
    setIsActive(option);
    option !== null && setOptionTitle(option);
  };

  return (
    <div
      className="w-52 h-max absolute bg-white py-3 rounded-lg shadow-xl z-30 transform  dark:bg-gray-500"
      style={{
        display: settingsOpen ? "inline-block" : "none",
        transform:
          pathname === "/"
            ? "translateX(0)"
            : width > 1024
            ? "translateX(14rem)"
            : width < 768
            ? "translateX(0)"
            : settingsOpen
            ? "translateX(4.5rem)"
            : null,
        top:
          pathname === "/"
            ? "3.5rem"
            : width < 768 && isMenuOpen
            ? "45%"
            : width < 768
            ? "-265%"
            : width < 1024
            ? "10rem"
            : "8.75rem",
        left: pathname === "/" ? "auto" : width < 768 ? "45%" : "0.25rem",
        right: pathname === "/" ? "1rem" : null,
      }}
    >
      <div>
        <button
          className="w-full flex items-center justify-between py-2 px-2 space-x-1 transition duration-300 hover:bg-gray-100 dark:hover:text-black"
          onClick={() => toggleOption(lang)}
        >
          <div className="w-full flex items-center justify-start space-x-1">
            <TranslateIcon className="h-5" /> <span className="capitalize">{lang}</span>
          </div>
          <ChevronRightIcon className="h-6" />
        </button>
        <button
          className="w-full flex items-center justify-between py-2 px-2 space-x-1 transition duration-300 hover:bg-gray-100 dark:hover:text-black"
          onClick={() => toggleOption(options[1])}
        >
          <div className="w-full flex items-center justify-start space-x-2">
            <ToggleOn className="h-5" /> <span className="capitalize">{options[1]}</span>
          </div>
          <ChevronRightIcon className="h-6" />
        </button>
        <button className="w-full flex items-center justify-between py-2 px-2 space-x-1 transition duration-300 hover:bg-gray-100 dark:hover:text-black">
          <div className="w-full flex items-center justify-start space-x-2">
            <LifePreserver className="h-5" /> <span className="capitalize">{options[2]}</span>
          </div>
          <ChevronRightIcon className="h-6" />
        </button>
      </div>
      <SettingsOptions
        isSettingsOpen={isSettingsOpen}
        isMenuOpen={isMenuOpen}
        langOptions={langOptions}
        modeOptions={modeOptions}
        toggleOption={toggleOption}
        isActive={isActive}
      />
    </div>
  );
};

export default Settings;
