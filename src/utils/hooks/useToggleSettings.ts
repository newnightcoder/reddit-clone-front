import { useState } from "react";

const useToggleSettings = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    return setSettingsOpen((prevState) => !prevState);
  };

  return { settingsOpen, toggleSettings };
};

export default useToggleSettings;
