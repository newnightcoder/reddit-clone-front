import { DotsHorizontalIcon, XIcon } from "@heroicons/react/solid";
import React from "react";

const BtnSettings = ({ settingsOpen, toggleSettings }) => {
  return (
    <button
      className="h-10 w-10 absolute top-5 right-6 md:right-14 flex items-center justify-center rounded-full tracking-widest font-bold text-2xl transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700"
      onClick={toggleSettings}
    >
      <DotsHorizontalIcon
        className={`h-7 absolute m-auto z-10 text-gray-900 dark:text-gray-100 transition-color duration-500 ${
          settingsOpen ? "animate-iconOff" : "animate-iconOn"
        }`}
      />
      <XIcon
        className={`h-7 absolute m-auto text-gray-900 dark:text-gray-100 transition-color duration-500 ${
          settingsOpen ? "animate-iconOn" : "animate-iconOff"
        }`}
      />
    </button>
  );
};

export default BtnSettings;
