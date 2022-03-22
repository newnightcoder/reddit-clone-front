import { ChevronRightIcon, TranslateIcon } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { LifePreserver, ToggleOn } from "react-bootstrap-icons";
import language from "../languages";
import SettingsOptions from "./SettingsOptions";

const Settings = ({ userLangData, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeArray = ["langue", "language", "sprache", "erscheinungsbild", "apparence", "appearance"];
  const [isActive, setIsActive] = useState("");
  const [optionTitle, setOptionTitle] = useState("");
  const { lang, appearance, help } = userLangData.options;
  const options = [lang, appearance, help];
  const { dark, light } = userLangData.appearance;
  const modeOptions = [dark, light];
  const [langOptions, setLangOptions] = useState([]);

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
    setIsOpen((prevState) => !prevState);
    setIsActive(option);
    option !== null && setOptionTitle(option);
  };

  const setMode = (mode) => {
    localStorage.setItem("Mode", mode);
  };

  return (
    <div className="w-52 absolute top-16 right-8 bg-white py-3 rounded-lg shadow">
      <div className="w-full">
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
        setLanguage={setLanguage}
        setMode={setMode}
        toggleOption={toggleOption}
        userLangData={userLangData}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </div>
  );
};

export default Settings;
