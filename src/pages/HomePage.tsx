import { useEffect } from "react";
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
    <div className="min-h-screen w-full relative transition-colors duration-500 bg-gray-200 dark:bg-black text-gray-900 dark:text-gray-100">
      <BtnSettings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />
      <Settings settingsOpen={settingsOpen} />
      <div className="grid-container min-h-screen w-full grid grid-rows-[1fr,max-content] gap-10 pt-16 md:pt-0">
        <div className="main-section mx-auto h-full w-full md:min-h-[500px] max-w-[1300px] flex flex-col md:flex-row items-center justify-center md:justify-center md:px-12">
          <HeroImg />
          <div className="header-btns-section h-max md:h-full w-full md:w-[40%] flex flex-col items-center justify-start md:justify-center space-y-6 md:space-y-6 2xl:space-y-10">
            <Header />
            <HomeButtons />
          </div>
        </div>
        <div className="bottom-section w-full h-max flex flex-col items-center justify-center md:space-y-2 pb-4 md:pb-2">
          <DownloadAppSection />
          <HomeFooter />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
