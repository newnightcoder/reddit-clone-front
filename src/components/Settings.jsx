import { ChevronRightIcon, TranslateIcon } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { LifePreserver, ToggleOn } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import language from "../languages";
import { breakpoint } from "../utils/breakpoints";
import { useLanguage, useWindowSize } from "../utils/hooks";
import SettingsOptions from "./SettingsOptions";

const Settings = ({ settingsOpen, isMenuOpen }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [optionTitle, setOptionTitle] = useState("");
  const [langOptions, setLangOptions] = useState([]);
  const { height, width } = useWindowSize();
  const { pathname } = useLocation();
  const userLanguage = useLanguage();
  const { lang, appearance, help } = userLanguage.options;
  const options = [lang, appearance, help];
  const { dark, light } = userLanguage.appearance;
  const modeOptions = [dark, light];
  const landingPage = pathname === "/";
  const profilePage = pathname === "/profile";

  const getLangOptions = useCallback(() => {
    const options = [];
    for (const lang of Object.entries(language)) {
      options.push(lang[0]);
    }
    setLangOptions(options);
  }, []);

  useEffect(() => {
    getLangOptions();
  }, []);

  const toggleOption = (option) => {
    setIsSettingsOpen((prevState) => !prevState);
    setIsActive(option);
    option !== null && setOptionTitle(option);
  };

  return (
    <div
      className={`${settingsOpen ? "inline-block" : "hidden"} ${
        landingPage
          ? "top-16"
          : isMenuOpen
          ? "top-full"
          : width < breakpoint.md
          ? "-top-36"
          : width < breakpoint.xl
          ? "top-[16.5rem]"
          : width >= breakpoint.xl
          ? "top-[13.5rem]"
          : ""
      } ${
        landingPage
          ? "left-auto"
          : isMenuOpen
          ? "left-0"
          : width < breakpoint.md
          ? "left-1/2"
          : width < breakpoint.xl
          ? "left-16"
          : width >= breakpoint.xl
          ? "left-[14.5rem]"
          : ""
      } ${landingPage ? "right-4" : ""} w-52 h-max ${
        isMenuOpen ? "relative" : "absolute"
      } transition duration-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 py-3 rounded-lg shadow-xl z-[1300]`}
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
