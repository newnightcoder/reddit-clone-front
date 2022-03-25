import { HomeIcon, PencilIcon, UserIcon } from "@heroicons/react/solid";
import React from "react";
import { GearFill, Power } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLanguage, useLinkToProfile } from "../utils/hooks";
import Settings from "./Settings";

const NavBarDesktop = ({ toggleSettings, settingsOpen }) => {
  const { id, username } = useSelector((state) => state.user);
  const linkToProfile = useLinkToProfile(id, username);
  // const [settingsOpen, setSettingsOpen] = useState(false);
  const [userLangData, setLanguage] = useLanguage();

  // const toggleOptionsMenu = () => {
  //   return setSettingsOpen((prevState) => !prevState);
  // };

  return (
    <div className="h-min w-min hidden z-30 mt-24 sticky top-20 md:flex flex-col items-center justify-center space-y-4  px-4 lg:pt-6 pb-4 whitespace-nowrap rounded-lg lg:bg-white lg:shadow-sm dark:bg-gray-500">
      <Link
        to={"/feed"}
        className="h-16 w-16 lg:w-10 lg:h-10 lg:w-full space-x-1 font-bold flex items-center justify-center lg:justify-start p-2 rounded-full transition duration-300 bg-white lg:bg-transparent hover:bg-blue-200"
        // style={{ backgroundColor: "#ef5350" }}
        disabled={false}
      >
        <HomeIcon className="h-8 w-8 lg:h-6 transform -translate-y-px" />
        <span className="capitalize hidden lg:inline-block">forum</span>
      </Link>

      <Link
        to="/create"
        className="flex items-center justify-center lg:justify-start lg:pl-1 lg:pr-4 rounded-full transition duration-300 bg-white lg:bg-transparent hover:bg-blue-200"
      >
        <div className="w-16 h-16 lg:w-10 lg:h-10 rounded-full relative flex items-center justify-center">
          <span className="inline-block absolute top-0 left-0 transform translate-x-4 translate-y-2 lg:translate-x-2 lg:translate-y-0">
            +
          </span>
          <PencilIcon className="h-9 lg:h-7 w-8 transform translate-x-px" />
        </div>
        <span className="hidden lg:inline-block font-bold">Publier un Post</span>
      </Link>
      <button
        className="lg:w-full outline-none ring-none flex items-center justify-center rounded-full lg:justify-start space-x-1 lg:pl-2 lg:pr-4 rounded-full transition duration-300 hover:bg-blue-200 "
        onClick={linkToProfile}
      >
        <div className="w-10 h-10 lg:w-max bg-white lg:bg-transparent lg:border-0 rounded-full relative flex items-center justify-center">
          <UserIcon className="h-6 w-8" />
        </div>
        <span className="hidden lg:inline-block font-bold">Mon profil</span>
      </button>
      <button
        className="lg:w-full outline-none ring-none flex items-center justify-center rounded-full lg:justify-start space-x-2 lg:pl-2 lg:pr-4 rounded-full transition duration-300 hover:bg-blue-200"
        onClick={toggleSettings}
      >
        <div className="w-10 h-10 lg:w-max bg-white lg:bg-transparent lg:border-0 rounded-full relative flex items-center justify-center">
          <GearFill size={22} className="w-8" />
        </div>
        <span className="hidden lg:inline-block font-bold">Paramètres</span>
      </button>
      <Link
        className="lg:w-full flex items-center justify-center rounded-full lg:justify-start space-x-1 lg:pl-2 lg:pr-4 rounded-full transition duration-300 hover:bg-blue-200"
        to="/"
      >
        <div className="w-10 h-10 lg:w-max bg-white lg:bg-transparent lg:border-0 rounded-full relative flex items-center justify-center">
          <Power size={25} className="w-8" />
        </div>
        <span className="hidden lg:inline-block font-bold">Déconnexion</span>
      </Link>
      <Settings settingsOpen={settingsOpen} userLangData={userLangData} setLanguage={setLanguage} />
    </div>
  );
};

export default NavBarDesktop;
