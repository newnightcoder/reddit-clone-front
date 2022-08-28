import { ChevronRightIcon, TranslateIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import { LifePreserver, ToggleOn } from "react-bootstrap-icons";
import language from "../../languages";
import { useLanguage } from "../../utils/hooks";
import { SettingsProps } from "../react-app-env";
import SettingsContainer from "./SettingsContainer";
import SettingsOptions from "./SettingsOptions";

const Settings = (props: SettingsProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [langLabel, setLangLabel] = useState<string[]>([]);
  const [appearanceLabel, setAppearanceLabel] = useState<string[]>([]);
  const [langOptions, setLangOptions] = useState<string[]>([]);
  const userLanguage = useLanguage();
  const { lang, appearance, help } = userLanguage.options;
  const { dark, light } = userLanguage.appearance;
  const options = [lang, appearance, help];
  const modeOptions = [dark, light];

  const getLangLabel = useCallback(() => {
    const options = [];
    for (const lang of Object.entries(language)) {
      options.push(lang[1].options.lang);
    }
    setLangLabel(options);
  }, [setLangLabel]);

  const getLangOptions = useCallback(() => {
    const options = [];
    for (const lang of Object.entries(language)) {
      options.push(lang[0]);
    }
    setLangOptions(options);
  }, [setLangOptions]);

  const getAppearanceLabel = useCallback(() => {
    const options = [];
    for (const lang of Object.entries(language)) {
      options.push(lang[1].options.appearance);
    }
    setAppearanceLabel(options);
  }, [setAppearanceLabel]);

  useEffect(() => {
    getLangOptions();
    getLangLabel();
    getAppearanceLabel();
  }, [getLangOptions, getLangLabel, getAppearanceLabel]);

  const toggleOption = useCallback(
    (option: string) => {
      setIsSettingsOpen((prevState) => !prevState);
      setIsActive(option);
    },
    [setIsSettingsOpen, setIsActive]
  );

  return (
    <SettingsContainer {...props}>
      <>
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
          isMenuOpen={props.isMenuOpen}
          langLabel={langLabel}
          appearanceLabel={appearanceLabel}
          langOptions={langOptions}
          modeOptions={modeOptions}
          isActive={isActive}
          setIsActive={setIsActive}
          setIsSettingsOpen={setIsSettingsOpen}
        />
      </>
    </SettingsContainer>
  );
};

export default Settings;
