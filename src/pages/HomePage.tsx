import { useEffect } from "react";
import Div100vh from "react-div-100vh";
import { BtnSettings, DownloadAppSection, Header, HeroImg, HomeButtons, HomeFooter, Settings } from "../components";
import { persistor } from "../store/storeConfig";
import { useToggleSettings } from "../utils/hooks";

const Homepage = () => {
  const { settingsOpen, toggleSettings } = useToggleSettings();

  useEffect(() => {
    persistor.purge();
    localStorage.clear();
  }, []);

  return (
    <Div100vh className="h-full w-full relative transition-colors duration-500 bg-gray-200 dark:bg-black text-gray-900 dark:text-gray-100">
      <BtnSettings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
      <Settings settingsOpen={settingsOpen} />
      <div className="grid-container h-full w-full grid grid-rows-homepage gap-10 pt-10">
        <div className="main-section h-max md:h-full w-full md:min-h-[500px] max-w-[1300px] flex flex-col md:flex-row items-center justify-center md:justify-center md:px-12">
          <HeroImg />
          <div className="header-btns-section h-max md:h-full w-full md:w-[40%] flex flex-col items-center justify-start md:justify-center space-y-6 md:space-y-6 2xl:space-y-10">
            <Header />
            <HomeButtons />
          </div>
        </div>
        <div className="bottom-section w-full h-24 flex flex-col items-center justify-center md:space-y-2 pb-2">
          <DownloadAppSection />
          <HomeFooter />
        </div>
      </div>
    </Div100vh>
  );
};

export default Homepage;
